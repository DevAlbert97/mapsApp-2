import { Injectable } from '@angular/core';
import { Feature, PlacesResponce } from '../interfaces/places';
import { PlacesApiClient } from '../apis/placesApiClient';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  userLocation?: [number, number];
  isLoadingPlaces: boolean = false;
  places: Feature[] = [];
  

  get isUserLocationReady() : boolean {
    return !!this.userLocation;
  }

  constructor(private placesApi: PlacesApiClient, private mapService: MapService) {
    this.getUserLocation();
   }

  async getUserLocation(): Promise<[number,number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          this.userLocation = [coords.longitude, coords.latitude]; 
          resolve(this.userLocation);
        },
        (err => {
          console.log(err);
          reject();
        })
      );
    });
  }

  getPlacesByQuery(query: string = "") {
    if (query.length === 0) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }
    if (!this.userLocation) throw Error('No hay userLocation');
    this.isLoadingPlaces = true;
    return this.placesApi
      .get<PlacesResponce>(`/${query}.json`, { 
        params: {
          proximity: this.userLocation.join(',')
        } 
      })
      .subscribe((resp) => {
        this.isLoadingPlaces = false;
        this.places = resp.features;
        this.mapService.createMarkersFromPlaces(this.places, this.userLocation);
      });
  }

  deletePlaces() {
    this.places = [];
  }
}
