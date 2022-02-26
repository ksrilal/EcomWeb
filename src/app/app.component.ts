import { Component } from '@angular/core';
import { DynamicScriptLoaderService } from 'src/Services/dynamic-script-loader-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private dynamicScriptLoader: DynamicScriptLoaderService) {
    this.loadScripts();
  }

  ngOnInit() {}

  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader
      .load(
        'jquery',
        'jquery',
        'jquery-migrate',
        'popper',
        'bootstrap',
        'easing',
        'waypoints',
        'stellar',
        'owl',
        'magnific',
        'animateNumber',
        'scrollax',
        'google-map',
        'main'
      )
      .then((data) => {
        // Script Loaded Successfully
      })
      .catch((error) => console.log(error));
  }
}
