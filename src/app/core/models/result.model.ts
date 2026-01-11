export interface ResultModel {
  locationId: number;
  userGuess: { lat: number; lng: number };
  distance: number;
  points: number;
}
