import { Injectable } from '@angular/core';

interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  { name: 'jquery', src: '../assets/ecom-web-styles/js/jquery.min.js' },
  { name: 'jquery-migrate', src: '../assets/ecom-web-styles/js/jquery-migrate-3.0.1.min.js' },
  { name: 'popper', src: '../assets/ecom-web-styles/js/popper.min.js' },
  { name: 'bootstrap', src: '../assets/ecom-web-styles/js/bootstrap.min.js' },
  { name: 'easing', src: '../assets/ecom-web-styles/js/jquery.easing.1.3.js' },
  { name: 'waypoints', src: '../assets/ecom-web-styles/js/jquery.waypoints.min.js' },
  { name: 'stellar', src: '../assets/ecom-web-styles/js/jquery.stellar.min.js' },
  { name: 'owl', src: '../assets/ecom-web-styles/js/owl.carousel.min.js' },
  { name: 'magnific', src: '../assets/ecom-web-styles/js/jquery.magnific-popup.min.js' },
  { name: 'animateNumber', src: '../assets/ecom-web-styles/js/jquery.animateNumber.min.js' },
  { name: 'scrollax', src: '../assets/ecom-web-styles/js/scrollax.min.js' },
  { name: 'google-map', src: '../assets/ecom-web-styles/js/google-map.js' },
  { name: 'main', src: '../assets/ecom-web-styles/js/main.js' }
];

declare var document: any;

@Injectable()
export class DynamicScriptLoaderService {

  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (!this.scripts[name].loaded) {
        //load script
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        if (script.readyState) {  //IE
            script.onreadystatechange = () => {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    this.scripts[name].loaded = true;
                    resolve({script: name, loaded: true, status: 'Loaded'});
                }
            };
        } else {  //Others
            script.onload = () => {
                this.scripts[name].loaded = true;
                resolve({script: name, loaded: true, status: 'Loaded'});
            };
        }
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }

}