import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { RestaurantType } from '../Interfaces/restaurantType.model';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css'],
  standalone: true,
  imports: [NgFor]
})
export class KitchenComponent {
  cocinasPorLetra: { [letra: string]: string[] } = {};
  objectKeys = Object.keys;

  constructor(private router: Router) {
    this.prepararCocinasPorLetra();
  }

  prepararCocinasPorLetra() {
    
    const tiposCocina = Object.values(RestaurantType);
    
    tiposCocina.forEach((nombreCocina) => {
      const letra = nombreCocina[0].toUpperCase();
      if (!this.cocinasPorLetra[letra]) {
        this.cocinasPorLetra[letra] = [];
      }
      this.cocinasPorLetra[letra].push(nombreCocina);
    });

    for (const letra in this.cocinasPorLetra) {
      this.cocinasPorLetra[letra].sort();
    }
  }

  navegarATipoCocina(nombreCocina: string) {
    const tipoCocinaBackend = Object.keys(RestaurantType).find(key => RestaurantType[key as keyof typeof RestaurantType] === nombreCocina);
    if (tipoCocinaBackend) {
      this.router.navigate(['/restaurant-list', tipoCocinaBackend]);
    }
  }
}
