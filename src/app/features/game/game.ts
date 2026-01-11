import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../core/services/game.service';
import { NgOptimizedImage } from '@angular/common';
import { computed } from '@angular/core';
import { LocationService } from '../../core/services/game-location.service';
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [FormsModule, NgOptimizedImage],
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
  readonly currentImageUrl = computed(() => this.gameService.currentLocation().imageUrl);
  readonly lastResult = computed(() => this.gameService.results().at(-1));

 // SHOW HINT
  showHint(): void {
    this.hint.set(true);
  }

 // HANDLE GUESS SUBMISSION
  handleGuess(): void {
    this.gameService.submitGuess(this.userLat(), this.userLng());
    const result = this.lastResult();
    console.log(`Distance: ${result?.distance}km, Points: ${result?.points}`);
    this.gameService.nextRound();
    this.resetRound();
  }
  

  // RESET FOR NEXT ROUND
  resetRound() {
    this.userLat.set(0);
    this.userLng.set(0);
    this.hint.set(false);
  }

}