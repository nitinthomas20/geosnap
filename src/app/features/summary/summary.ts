import { Component, inject, computed } from '@angular/core';
import { Router} from '@angular/router';
import { GameService } from '../../core/services/game.service';
import { LocationService } from '../../core/services/game-location.service';
@Component({
  selector: 'app-summary',
  standalone: true,
  templateUrl: './summary.html',
  styleUrls: ['./summary.scss']
})
export class SummaryComponent {
  private readonly router = inject(Router);
  readonly game = inject(GameService);
  readonly locationService = inject(LocationService);

  // DECLARATIVE STATE
  // If no results, we derive a 'shouldRedirect' signal
  readonly hasData = computed(() => this.game.results().length > 0);
  
  

  constructor() {
    // Redirect logic: If a user refreshes the summary page and state is lost
    if (!this.hasData()) {
      this.router.navigate(['/']);
    }
  }

  playAgain(): void {
    this.game.startNewGame();
    this.router.navigate(['/']);
  }
}