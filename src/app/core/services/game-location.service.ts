import { Injectable, signal } from '@angular/core';
import { LocationModel } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  
  private _locations = signal<LocationModel[]>([
    { id: 1, imageUrl: 'assets/1.jpg', lat: 43.0763447, lng: 25.6332728, description: 'Veliko Tarnovo, Bulgaria' },
    { id: 2, imageUrl: 'assets/2.jpg', lat: 33.8455544, lng: 151.1570215, description: 'Drummoyne Wharf, Sydney, Australia' },
    { id: 3, imageUrl: 'assets/3.png', lat:  46.4966753, lng: 7.7134176, description: 'Oeschinensee, Switzerland' },
    
  ]);

  
  readonly locations = this._locations.asReadonly();

}