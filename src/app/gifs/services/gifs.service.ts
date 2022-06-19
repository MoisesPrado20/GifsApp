import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../../interfaces/gifs.interface';

@Injectable({
  //* Esto evita definir el servico en los providers de un módulo, ademas que se puede inyectar en cualquier
  //* modulo de la app debido al uso de  providedIn: 'root'
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'QYr5aSf8mWGCvC2xxZIQ1YuV4R03LDd8';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = []; //? Guarda el historial de busquedas

  public resultados: Gif[] = []; //? guarda los primeros 10 gifs de la busqueda

  get historial() {
    //* Creando copia del historial para evitar modificaciones en el objeto original
    return [...this._historial];
  }

  //? Este constructor se ejecuta antes de que se cargue el servicio y solo se ejecuta una vez porque
  //? trabaja como si fuera un Singleton
  constructor(private http: HttpClient) {
    //* Cargando historial de el localStorage para que sea persistente
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    //* Cargando gifs de la API de el localStorage para que sea persistente
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query: string = '') {
    query = query.toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      //* Si el historial no incluye la busqueda a agregar...
      //* Agrega al historial el valor buscado
      this._historial.unshift(query);
      //* Cortando arreglo para mostrar solo las primeras 10 busquedas del historial
      this._historial = this._historial.slice(0, 10);

      //* Guardando el historial en el localStorage
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    // console.log(this._historial);

    //* Definiendo los parámetros del endpoint, con set() se establece el key y su valor
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    //* Con toString() se formatean automaticamente para que se definan en el endpoint
    // console.log(params.toString());

    this.http
      .get<SearchGifsResponse>(`${this.servicioUrl}/search`,{ params })
      .subscribe((res) => {
        // console.log(res.data);
        this.resultados = res.data; //* guardando los 10 primeros gifs en 'resultados'

        //* Guardando los gifs de la API en el localStorage
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}
