import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Restaurant } from '../Interfaces/restaurant.model';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,FormsModule]
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];
  resultadosBusqueda: Restaurant[] = [];
  searchTerm: string = '';
  maxResultados: number = 5; 
  minResultados: number = 5;

  constructor(private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute) {}
  puedeMostrarMas: boolean = false;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const tipoCocina = params['tipoCocina'];
      if (tipoCocina) {
        this.filtrarRestaurantesPorTipoCocina(tipoCocina);
      } else {
        this.loadRestaurantsDirectly();
      }
    });
  }

  filtrarRestaurantesPorTipoCocina(tipoCocina: string): void {
    const url = `http://localhost:8080/restaurant-list/${tipoCocina}`;
    this.httpClient.get<Restaurant[]>(url).subscribe(restaurants => {
      this.restaurants = restaurants;
    }); 
  }

  loadRestaurantsDirectly() {
    const apiUrl = 'http://localhost:8080/restaurant';
    this.httpClient.get<Restaurant[]>(apiUrl).subscribe(restaurants => {
      this.restaurants = restaurants;

      this.restaurants.filter(restaurants =>
        restaurants.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    });
  }
  buscar(termino: string): void {
    this.searchTerm = termino;
    this.filtrarResultados();
  }

  filtrarResultados(): void {
    const resultadosFiltrados = this.searchTerm
      ? this.restaurants.filter(restaurant =>
          restaurant.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
      : [];
    this.puedeMostrarMas = resultadosFiltrados.length > this.maxResultados;
    this.resultadosBusqueda = resultadosFiltrados.slice(0, this.maxResultados);
  }

  mostrarMas(): void {
    this.maxResultados += 5;
    this.filtrarResultados();
  }
  mostrarMenos(): void {
    this.maxResultados = Math.max(this.minResultados, this.maxResultados - 5);
    this.filtrarResultados();
  }

  highlightSearchTerm(name: string, searchTerm: string): string {
    if (!searchTerm) return name;

    const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');
    return name.replace(regex, `$1`);
  }  
}
