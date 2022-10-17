import { Component, AfterViewInit } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';

import { PlacesService } from '../../services/places.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent implements AfterViewInit {

  constructor(private placesService: PlacesService, 
    private mapService: MapService) {}

  ngAfterViewInit(): void {
    if (!this.placesService.userLocation) throw Error('No hay placesService.userLocation');
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.placesService.userLocation,
      zoom: 14,
      projection: {name: 'globe'},
    });

    map.on('style.load', () => {
      map.setFog({});
    });

    const popup = new mapboxgl.Popup().setHTML(`
      <h6>Aqui estoy</h6>
      <span>Estoy en este lugar del mundo</span>
    `);

    new mapboxgl.Marker({color: 'red'})
      .setLngLat(this.placesService.userLocation)
      .setPopup(popup)
      .addTo(map);

    this.mapService.setMap(map);
  }
}
