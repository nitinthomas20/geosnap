import { Injectable, signal, inject, effect } from '@angular/core';
import { GameService } from '../../core/services/game.service';
import { LocationService } from '../../core/services/game-location.service';

@Injectable({ providedIn: 'root' })
export class ImagePreloadService {
  private readonly game = inject(GameService);
  private readonly locationService = inject(LocationService);

  readonly nextImageReady = signal(false);

  constructor() {
    /**
     * REACTIVE PRELOADER
     * Whenever the currentRoundIndex changes, this automatically 
     * looks ahead and preloads the NEXT image.
     */
    effect(() => {
      const currentIndex = this.game.currentRoundIndex();
      const nextIndex = this.game.currentRoundIndex() + 1;
      const locations = this.locationService.locations();
      if (locations.length === 0) return;
      
      if (currentIndex === 0) {
        this.preload(locations[0].imageUrl);
      }

      if (nextIndex < locations.length) {
        this.preload(locations[nextIndex].imageUrl);
      }
    });
  }

  private preload(url: string) {
    this.nextImageReady.set(false);
    const img = new Image();
    
    img.onload = () => {
      console.log(`Preloaded: ${url}`);
      this.nextImageReady.set(true);
      
    };

    img.onerror = () => {
      console.error(`Failed to preload: ${url}`);
      this.nextImageReady.set(true);
    };
    
    img.src = url;
  }
}