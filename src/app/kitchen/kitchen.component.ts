import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantType } from '../Interfaces/restaurantType.model';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css'],
  standalone: true,
  imports: []
})
export class KitchenComponent {
  todasLasCocinas: string[] = [];

  constructor(private router: Router) {
    this.prepararTodasLasCocinas();
  }

  prepararTodasLasCocinas() {
    this.todasLasCocinas = Object.values(RestaurantType);
  }

  navegarATipoCocina(nombreCocina: string) {
    const tipoCocinaBackend = Object.keys(RestaurantType).find(key => RestaurantType[key as keyof typeof RestaurantType] === nombreCocina);
    if (tipoCocinaBackend) {
      this.router.navigate(['/restaurant-list', tipoCocinaBackend]);
    }
  }
}
