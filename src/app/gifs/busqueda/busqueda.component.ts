import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent {
  //* Guardando en la referencia local del input el evento ElementRef que se genera al presionar Enter
  //* El '!:' significa que la referencia local no puede ser nula y HTMLInputElement significa que solo
  //* puede aceptar ese tipado la referencia local
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService){}

  buscar() {
    const valor = this.txtBuscar.nativeElement.value; //* guardando lo ingresado al input
    // console.log(this.txtBuscar);
    // console.log(valor);

    //* Si el valor a buscar no es ninguno se termina la ejecucion
    if (valor.trim().length === 0) return;

    this.gifsService.buscarGifs(valor); //* Agregando nueva palabra buscada en el historial

    this.txtBuscar.nativeElement.value = ""; //* Vaciando input
  }
}
