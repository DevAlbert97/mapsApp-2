import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'mapsApp-2';

  ngOnInit() {
    (mapboxgl as any).accessToken = environment.mapBoxToken;
  }
}
