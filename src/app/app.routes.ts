import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Mapa } from './pages/mapa/mapa.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/mapa',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'mapa',
    component: Mapa,
  }
];
