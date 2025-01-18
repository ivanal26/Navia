import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import * as L from 'leaflet'; // Importa Leaflet

// Configura la ruta para los íconos predeterminados de Leaflet
L.Icon.Default.imagePath = 'assets/leaflet/';
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
