import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { GameComponent } from './features/game/game';
import { SummaryComponent } from './features/summary/summary';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'play', component: GameComponent },
  {path: 'summary', component: SummaryComponent}
];