import { Component } from '@angular/core';

@Component({
  selector: 'app-tipos-de-cocinas',
  standalone: true,
  imports: [], 
  templateUrl: './tipos-de-cocinas.component.html',
  styleUrls: ['./tipos-de-cocinas.component.css']
})
export class TiposDeCocinaComponent {
  tiposDeCocina = [
    { nombre: 'Italiana', imagen: 'https://i.ibb.co/sPBj8t6/los-platos-criollos-que-debes-probar-si-vienes-a-peru.jpg' },
    { nombre: 'Mexicana', imagen: 'https://i.ibb.co/sPBj8t6/los-platos-criollos-que-debes-probar-si-vienes-a-peru.jpg' },

  ];
}