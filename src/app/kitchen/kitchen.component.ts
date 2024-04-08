import { Component } from '@angular/core';
import { RestaurantType } from '../Interfaces/restaurantType.model';
import { KeyValuePipe, NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kitchen',
  standalone: true,
  imports: [NgFor, KeyValuePipe],
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent {
  constructor(private router: Router) {}

  cocinas = Object.values(RestaurantType).map(nombre => ({ letra: nombre[0], nombre }));

  cocinasPorLetra = this.cocinas.reduce((acc: { [key: string]: { letra: string; nombre: string }[] }, cocina) => {
    if (!acc[cocina.letra]) {
      acc[cocina.letra] = [];
    }
    acc[cocina.letra].push(cocina);
    return acc;
  }, {});

  navegarATipoCocina(tipoCocina: string) {
  this.router.navigate(['/restaurant-list', tipoCocina]);
}

}
