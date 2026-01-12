import { Injectable, inject, signal } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { LocationModel } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private firestore = inject(Firestore);
  
  // 1. Create a writable signal with an initial empty array
  private _locations = signal<LocationModel[]>([]);
  readonly locations = this._locations.asReadonly();

  constructor() {
    // Load the data immediately when the service starts
    this.loadLocations();
  }

  async loadLocations() {
    try {
      const locationsCol = collection(this.firestore, 'locations');
      const snapshot = await getDocs(locationsCol);
      
      // Map the data and include the ID
      const data = snapshot.docs.map(doc => doc.data()) as LocationModel[];

      // Update the signal value
      this._locations.set(data);
    } catch (error) {
      console.error("Error loading locations:", error);
    }
  }
}