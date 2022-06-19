import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) { }

  get historial() {
    return this.gifsService.historial;
  }

  buscar(termino: string) {
    // console.log(termino)
    //* Cargando gifs de la opcion del sidebar que se clickee
    this.gifsService.buscarGifs(termino);
    ;
  }



}
