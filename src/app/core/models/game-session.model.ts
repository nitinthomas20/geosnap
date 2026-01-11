export interface GameSession {
  playedAt: Date;
  totalScore: number;
  results: {
    locationId: number;
    userGuess: { lat: number; lng: number };
    distance: number;
    points: number;
  }[];
}
  
