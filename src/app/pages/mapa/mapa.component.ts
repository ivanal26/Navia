import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { DialogModule } from 'primeng/dialog';
import { Marker } from '../../models/marker.model';
import { MarkersService } from '../../services/markers.service';

@Component({
  selector: 'app-mapa',
  imports: [DialogModule, CommonModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css',
})
export class Mapa implements AfterViewInit {
  private map!: L.Map;
  isVisibleModal: boolean = false;
  modalData: { lat: number; lng: number } | null = null;
  markers: L.Marker[] = [];

  constructor(private markersService: MarkersService) {}

  ngAfterViewInit() {
    this.inicializarMapa();
    this.cargarMarcadores();
    this.agregarEventoDobleClick();
  }

  private cargarMarcadores() {
    this.markersService.getMarkers().subscribe((markers) => {
      markers.forEach((m: Marker) => {
        this.markers.push(L.marker([Number(m.latitud), Number(m.longitud)]));
      });

      this.agregarMarcadores();
      this.centrarMapa();
    });
  }

  private inicializarMapa() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    this.map = L.map('map');
    L.tileLayer(baseMapURl).addTo(this.map);
    this.map.doubleClickZoom.disable();
  }

  private agregarMarcadores() {
    this.markers.forEach((marker) => {
      marker.addTo(this.map);
      marker.on('click', () => this.abrirModal(marker.getLatLng()));
    });
  }

  private centrarMapa() {
    // Crear un objeto LatLngBounds que abarque todas las ubicaciones de los marcadores
    const bounds = L.latLngBounds(
      this.markers.map((marker) => marker.getLatLng())
    );
    this.map.fitBounds(bounds);
  }

  private agregarEventoDobleClick() {
    this.map.on('dblclick', (event: L.LeafletMouseEvent) => {
      const { lat, lng } = event.latlng;
      const newMarker = L.marker([lat, lng]);
      newMarker.addTo(this.map);
      newMarker.on('click', () => this.abrirModal(newMarker.getLatLng()));

      //TODO - Enviar el marcador a bbdd
    });
  }

  abrirModal(latLng: L.LatLng) {
    this.modalData = { lat: latLng.lat, lng: latLng.lng }; // Establecer datos para el diálogo
    this.isVisibleModal = true; // Mostrar el diálogo
  }
}
