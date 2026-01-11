import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { GameSession } from  "../models/game-session.model";

@Injectable({ providedIn: 'root' })
export class GameSavingService {
  private firestore = inject(Firestore);

  async saveGameSession(session: GameSession) {
    const sessionsRef = collection(this.firestore, 'game-history');
    return addDoc(sessionsRef, {
      ...session,
      playedAt: new Date()
    });
  }
}