import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-mapa',
  imports: [DialogModule, CommonModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css',
})
export class Mapa implements AfterViewInit {
  private map!: L.Map;
  isVisibleModal: boolean = false;
  modalData: { lat: number; lng: number } | null = null; // Datos del marcador

  markers: L.Marker[] = [
    L.marker([40.423382, -3.712165]),
    L.marker([37.984047, -1.128575]),
  ];

  ngAfterViewInit() {
    this.inicializarMapa();
    this.agregarMarcadores();
    this.centrarMapa();
    this.agregarEventoDobleClick();
  }

  private inicializarMapa() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
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
     // Ajustar la vista del mapa para que se ajuste a los límites
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
