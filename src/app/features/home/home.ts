import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { ImagePreloadService } from '../../shared/services/image-preload.service';
import { GameService } from '../../core/services/game.service';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  private readonly router = inject(Router);
  private readonly preloadService = inject(ImagePreloadService);
  readonly game = inject(GameService);
  readonly showRules = signal(false);
  onStartClick() {
    this.game.gameMode.set('basic');
    this.router.navigate(['/play']); // Navigate to the game path
  }
  handleAdvancedClick() {
    this.game.gameMode.set('advanced');
    this.router.navigate(['/play']);
  }
}
