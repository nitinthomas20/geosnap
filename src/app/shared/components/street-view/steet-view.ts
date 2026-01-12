import { Component, ElementRef, input, effect, viewChild, ViewEncapsulation, untracked } from '@angular/core';
import { importLibrary, setOptions } from '@googlemaps/js-api-loader';
import { environment } from '../../../../environments/environment';

// Best practice: Move configuration outside the component or to main.ts
setOptions({
  key: environment.googleMapsApiKey,
  v: 'weekly' // Specifying a version is recommended
});

@Component({
  selector: 'app-street-view',
  standalone: true,
  template: `<div #panoContainer class="pano-container"></div>`,
  styles: [`
    .pano-container {
      width: 100%;
      height: 100%;
      min-height: 400px; /* Ensure there is a height */
      border-radius: 12px;
      background: #222;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class StreetViewComponent {
  lat = input.required<number>();
  lng = input.required<number>();
  
  // Using viewChild (signal-based)
  panoContainer = viewChild<ElementRef<HTMLDivElement>>('panoContainer');

  private panorama: google.maps.StreetViewPanorama | null = null;

  constructor() {
    effect(async () => {
  const container = this.panoContainer()?.nativeElement;
  if (!container || container.offsetWidth === 0 || container.offsetHeight === 0) return;

  const pos = { lat: this.lat(), lng: this.lng() };

  if (!this.panorama) {
    const { StreetViewPanorama } = await importLibrary('streetView') as google.maps.StreetViewLibrary;

    this.panorama = new StreetViewPanorama(container, {
      position: pos,
      pov: { heading: 34, pitch: 10 },
      zoom: 1,
      disableDefaultUI: true, // hides controls for cleaner view
      linksControl: false,
      clickToGo: false,
      scrollwheel: true,
      addressControl: false,
      showRoadLabels: false,
      fullscreenControl: false,
      panControl: false,
      enableCloseButton: false
    });

    this.panorama.addListener('tilesloaded', () => {
      console.log('Street View fully loaded');
      // You could hide a loading spinner here
    });

    window.addEventListener('resize', () => {
      google.maps.event.trigger(this.panorama!, 'resize');
    });
  } else {
    this.panorama.setPosition(pos);
  }
});

  }
}