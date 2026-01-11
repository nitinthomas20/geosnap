import { Component, AfterViewInit, OnDestroy, output, input, inject, effect, ElementRef, viewChild } from '@angular/core';
import * as L from 'leaflet';
import { MapUtilsService } from '../../services/map-utils.service';

@Component({
  selector: 'app-map-view',
  standalone: true,
  templateUrl: './map-view.html',
  styleUrls: ['./map-view.scss']
})
export class MapViewComponent implements OnDestroy {
 
  userCoords = input.required<{ lat: number; lng: number }>();
  actualCoords = input.required<{ lat: number; lng: number }>();
  distance = input<number>(0);
  points = input<number>(0);
  next = output<void>();

  private readonly mapUtils = inject(MapUtilsService);
  private map?: L.Map;

  constructor() {
    /**
     * Effect runs whenever userCoords or actualCoords change.
     * This ensures the map updates automatically between rounds.
     */
    effect(() => {
      const user = this.userCoords();
      const actual = this.actualCoords();
      
      if (user && actual) {
        this.updateMap(user, actual);
      }
    });
  }

  private updateMap(user: { lat: number; lng: number }, actual: { lat: number; lng: number }) {
    // Initialize map if it doesn't exist
    if (!this.map) {
      this.map = L.map('map').setView([actual.lat, actual.lng], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
      }).addTo(this.map);
    }

    // Clear existing layers for new round
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        this.map?.removeLayer(layer);
      }
    });

    const userIcon = this.mapUtils.createCustomIcon('#ef4444'); 
    const targetIcon = this.mapUtils.createCustomIcon('#10b981');

    const userMarker = L.marker([user.lat, user.lng], { icon: userIcon }).addTo(this.map).bindPopup("Your Guess");
    const targetMarker = L.marker([actual.lat, actual.lng], { icon: targetIcon }).addTo(this.map).bindPopup("The Truth");
    
    L.polyline([[user.lat, user.lng], [actual.lat, actual.lng]], { color: '#ef4444', dashArray: '5, 10' }).addTo(this.map);

    const group = L.featureGroup([userMarker, targetMarker]);
    this.map.fitBounds(group.getBounds().pad(0.5));
  }

  ngOnDestroy() {
    // CLEANUP (Prevent memory leaks)
    if (this.map) {
      this.map.remove();
    }
  }
}