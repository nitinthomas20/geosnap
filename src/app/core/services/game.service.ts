import { Injectable, signal, computed, inject } from '@angular/core';
import { ResultModel } from '../models/result.model';
import { LocationService } from './game-location.service';

@Injectable({ providedIn: 'root' })
export class GameService {
  //INJECTIONS
  private readonly locationService = inject(LocationService);

  // DATA LOAD
  private readonly locations = this.locationService.locations;

  //  STATE
  readonly results = signal<ResultModel[]>([]);
  readonly currentRoundIndex = signal(0);
  readonly gameMode = signal<'basic' | 'advanced'>('advanced');

 

  // COMPUTED DERIVED STATE
  readonly currentLocation = computed(() => this.locations()[this.currentRoundIndex()]);
  readonly totalScore = computed(() => this.results().reduce((sum, r) => sum + r.points, 0));
  readonly isGameOver = computed(() => this.currentRoundIndex() >= this.locations().length - 1);

  // SUBMIT GUESS AND RECORD RESULT
  submitGuess(userLat: number, userLng: number): ResultModel {
    const actual = this.currentLocation();
    const distance = this.calculateDistance(userLat, userLng);
    const points = this.calculatePoints(distance);

    const result: ResultModel = {
      locationId: actual.id,
      userGuess: { lat: userLat, lng: userLng },
      distance: Math.ceil(distance),
      points: points
    };

    this.results.update(prev => [...prev, result]);
    return result;
  }

 
  // START NEW GAME
  startNewGame() {
    this.results.set([]);
    this.currentRoundIndex.set(0);
  }

 // MOVE TO NEXT ROUND
  nextRound(): boolean {
    if (!this.isGameOver()) {
      this.currentRoundIndex.update(val => val + 1);
      return false; // Game continues
    }
    return true; // Game is over
  }

 
 
  //   LOGIC FOR DISTANCE 
  calculateDistance(lat1: number, lon1: number): number {
    const R = 6371000; // Radius in METRES
    const lat2 = this.currentLocation().lat;
    const lon2 = this.currentLocation().lng;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  
  // LOGIC FOR POINTS BASED ON DISTANCE
   calculatePoints(distance: number): number {
    if (distance > 50) return 0;
    const k = 20; 
    const score = 15 * Math.exp(-distance / k);
    return Math.round(score);
  }
}