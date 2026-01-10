import { Component, output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  constructor(private router: Router) {}

  onStartClick() {
    this.router.navigate(['/play']); // Navigate to the game path
  }
}
