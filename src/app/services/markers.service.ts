import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../routes/api-routes';
import { Marker } from '../models/marker.model';

@Injectable({
  providedIn: 'root',
})
export class MarkersService {
  constructor(private http: HttpClient) {}

  getMarkers(): Observable<Marker[]> {
    return this.http.get<Marker[]>(`${API_ROUTES.apiUrlBase}${API_ROUTES.Markers.url}`);
  }
}
