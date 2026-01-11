import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../core/services/game.service';
import { NgOptimizedImage } from '@angular/common';
import { computed } from '@angular/core';
import { LocationService } from '../../core/services/game-location.service';
import { MapViewComponent } from '../../shared/components/map-view/map-view';
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [FormsModule, NgOptimizedImage, MapViewComponent],
  templateUrl: './game.html',
  styleUrl: './game.scss'
})
export class GameComponent  {

  // INJECTIONS
  readonly gameService = inject(GameService);
  readonly locationService = inject(LocationService);

  // LOCAL STATE
  readonly userLat = signal(0);
  readonly userLng = signal(0);
  readonly hint = signal(false);
  readonly showResult = signal(false);

   // Deriving the image URL and the latest result
  readonly currentImageUrl = computed(() => this.gameService.currentLocation().imageUrl);
  readonly lastResult = computed(() => this.gameService.results().at(-1));
 

 
 // SHOW HINT
  showHint(): void {
    this.hint.set(true);
  }

 // HANDLE GUESS SUBMISSION
  handleGuess(): void {
    this.gameService.submitGuess(this.userLat(), this.userLng());
    this.showResult.set(true);
  }
  

  // RESET FOR NEXT ROUND
  resetRound() {
    this.showResult.set(false);
    this.userLat.set(0);
    this.userLng.set(0);
    this.hint.set(false);
     if (this.gameService.nextRound()) {;
      console.log('Game Over! Final Score:', this.gameService.totalScore());
    }
  }

}