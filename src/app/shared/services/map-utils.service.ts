import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapUtilsService {
  
  private readonly markerSvg = `
    <svg width="30" height="42" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 0C6.71573 0 0 6.71573 0 15C0 26.25 15 42 15 42C15 42 30 26.25 30 15C30 6.71573 23.2843 0 15 0ZM15 20.25C12.1005 20.25 9.75 17.8995 9.75 15C9.75 12.1005 12.1005 9.75 15 9.75C17.8995 9.75 20.25 12.1005 20.25 15C20.25 17.8995 17.8995 20.25 15 20.25Z" 
            fill="FILL_COLOR" stroke="white" stroke-width="2"/>
    </svg>`;

  createCustomIcon(color: string): L.DivIcon {
    return L.divIcon({
      html: this.markerSvg.replace('FILL_COLOR', color),
      className: 'custom-svg-icon',
      iconSize: [30, 42],
      iconAnchor: [15, 42],
    });
  }
}