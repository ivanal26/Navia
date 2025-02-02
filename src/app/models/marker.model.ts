export class Marker {
  nombre: string;
  descripcion: string;
  latitud: string;
  longitud: string;

  constructor(nombre: string, descripcion: string, latitud: string, longitud: string) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.latitud = latitud;
    this.longitud = longitud;
  }
}
