import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { ImagePreloadService } from '../../shared/services/image-preload.service';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  private readonly router = inject(Router);
  private readonly preloadService = inject(ImagePreloadService);

  onStartClick() {
    this.router.navigate(['/play']); // Navigate to the game path
  }
}
