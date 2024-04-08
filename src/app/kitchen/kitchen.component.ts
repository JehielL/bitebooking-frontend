import { Component } from '@angular/core';
import { RestaurantType } from '../Interfaces/restaurantType.model';
import { Router } from '@angular/router';
import { NgFor, KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css'],
  standalone: true,
  imports: [NgFor, KeyValuePipe]
})
export class KitchenComponent {
  private RESTAURANT_TYPE_MAPPING: { [key: string]: string } = {
    Japanese: 'JAPANESE_FOOD',
    Thai: 'THAI_FOOD',
    Spanish: 'SPAIN_FOOD',
    Chinese: 'CHINESE_FOOD',
    Brunch: 'BRUNCH',
    'Coffee Store': 'COFFEE_STORE',
    Bar: 'BAR',
    Vietnamese: 'VIETNAM_FOOD',
    Italian: 'ITALIAN_FOOD',
    French: 'FRENCH_FOOD',
    'Tex-Mex': 'TEX_MEX_FOOD',
    Korean: 'KOREAN_FOOD',
    Vegan: 'VEGAN_FOOD',
    American: 'AMERICAN_FOOD',
    German: 'GERMAN_FOOD',
    Portuguese: 'PORTUGUESE_FOOD',
    Fusion: 'FUSION_FOOD',
    Greek: 'GREEK_FOOD',
    Indian: 'INDIAN_FOOD',
    Peruvian: 'PERUVIAN_FOOD',
    Canadian: 'CANADIAN_FOOD',
    Dominican: 'DOMINICAN_FOOD',
    'Latin American': 'LATIN_AMERICAN_FOOD',
    Argentine: 'ARGENTINE_FOOD',
    Balkan: 'BALKAN_FOOD',
    Georgian: 'GEORGIAN_FOOD',
    Arabian: 'ARABIAN_FOOD',
    Marrakech: 'MARRAKECH_FOOD',
    Asian: 'ASIAN_FOOD',
    African: 'AFRICAN_FOOD',
    Maghreb: 'MAGHREB_FOOD',
    Caribbean: 'CARIBBEAN_FOOD'
  };

  cocinas = Object.values(RestaurantType).map(nombre => ({ letra: nombre[0], nombre }));

  cocinasPorLetra = this.cocinas.reduce((acc: { [key: string]: { letra: string; nombre: string }[] }, cocina) => {
    if (!acc[cocina.letra]) {
      acc[cocina.letra] = [];
    }
    acc[cocina.letra].push(cocina);
    return acc;
  }, {});

  constructor(private router: Router) {}

  convertirANombreEnum(nombreAmigable: string): string {
    return this.RESTAURANT_TYPE_MAPPING[nombreAmigable] || nombreAmigable;
  }

  navegarATipoCocina(tipoCocina: string) {
    const tipoCocinaBackend = this.convertirANombreEnum(tipoCocina);
    this.router.navigate(['/restaurant-list', tipoCocinaBackend]);
  }
}
