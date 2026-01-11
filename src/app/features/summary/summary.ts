import { Component, inject, resource, computed } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../core/services/game.service';
import { LocationService } from '../../core/services/game-location.service';
import { GameSession } from '../../core/models/game-session.model';
import { GameSavingService } from '../../core/services/game-history.service';
@Component({
  selector: 'app-summary',
  standalone: true,
  templateUrl: './summary.html',
  styleUrls: ['./summary.scss']
})
export class SummaryComponent {
  private readonly router = inject(Router);
  readonly locationService = inject(LocationService);
  readonly game = inject(GameService);
  private readonly gameSaving = inject(GameSavingService);
  readonly hasData = computed(() => this.game.results().length > 0);

  constructor() {
    // Redirect logic: If a user refreshes the summary page and state is lost
    if (!this.hasData()) {
      this.router.navigate(['/']);
    }
  }
  // Prepare the game session data for saving
  readonly session: GameSession = {
        playedAt: new Date(),
        totalScore: this.game.totalScore(),
        results:this.game.results() 
      };
  
  // Define a resource to handle saving the game data
  readonly saveTask = resource({
  
    loader: async () => {
      // Return the result of the save operation
      return await this.gameSaving.saveGameSession(this.session);
    }
  });

  
  // Function to start a new game
  playAgain(): void {
    this.game.startNewGame();
    this.router.navigate(['/']);
  }
}