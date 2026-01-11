import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../core/services/game.service';
import { NgOptimizedImage } from '@angular/common';
import { computed } from '@angular/core';
import { LocationService } from '../../core/services/game-location.service';
import { MapViewComponent } from '../../shared/components/map-view/map-view';
import { Router } from '@angular/router';
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [FormsModule, NgOptimizedImage, MapViewComponent],
  templateUrl: './game.html',
  styleUrl: './game.scss'
})
export class GameComponent  {

  // INJECTIONS
  private readonly router = inject(Router);
  readonly gameService = inject(GameService);
  readonly locationService = inject(LocationService);

  // LOCAL STATE
  readonly userLat = signal(0);
  readonly userLng = signal(0);
  readonly hint = signal(false);
  readonly showResult = signal(false);

  // DRAG AND ZOOM STATE
  isCollapsed = signal(false);
  readonly zoomLevel = signal(1);
  readonly panX = signal(0);
  readonly panY = signal(0);
  readonly isDragging = signal(false);
  private dragStartX = 0;
  private dragStartY = 0;

   // Deriving the image URL and the latest result
  readonly currentImageUrl = computed(() => this.gameService.currentLocation().imageUrl);
  readonly lastResult = computed(() => this.gameService.results().at(-1));
  readonly imageTransform = computed(() => `translate(${this.panX()}px, ${this.panY()}px) scale(${this.zoomLevel()})`);
 

 
 // SHOW HINT
  showHint(): void {
    this.hint.set(true);
  }

  zoomIn() {
    if (this.zoomLevel() < 4) { 
      this.zoomLevel.update(z => z + 0.3);
    }
  }

  zoomOut() {
    if (this.zoomLevel() > 0.5) {
      this.zoomLevel.update(z => z - 0.3);
    }
    // Reset pan when zooming out to 1x or less
    if (this.zoomLevel() <= 1) {
      this.panX.set(0);
      this.panY.set(0);
    }
  }

  resetZoom() {
    this.zoomLevel.set(1);
    this.panX.set(0);
    this.panY.set(0);
  }

  startDrag(event: MouseEvent) {
    if (this.zoomLevel() > 1) {
      this.isDragging.set(true);
      this.dragStartX = event.clientX - this.panX();
      this.dragStartY = event.clientY - this.panY();
    }
  }

  onDrag(event: MouseEvent) {
    if (this.isDragging() && this.zoomLevel() > 1) {
      this.panX.set(event.clientX - this.dragStartX);
      this.panY.set(event.clientY - this.dragStartY);
    }
  }

  endDrag() {
    this.isDragging.set(false);
  }

 // HANDLE GUESS SUBMISSION
  handleGuess(): void {
    this.gameService.submitGuess(this.userLat(), this.userLng());
    this.showResult.set(true);
     this.resetZoom();
  }
  

  // RESET FOR NEXT ROUND
  resetRound() {
    this.showResult.set(false);
    this.userLat.set(0);
    this.userLng.set(0);
    this.hint.set(false);
     if (this.gameService.nextRound()) {;
      this.router.navigate(['/summary']);
    }
  }

}