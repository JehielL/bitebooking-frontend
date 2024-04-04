import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Restaurant } from '../Interfaces/restaurant.model'; 
import { RouterLink } from '@angular/router';
import { CarruselComponent } from '../carrusel/carrusel.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [HttpClientModule,RouterLink,CarruselComponent],
})
export class HomeComponent implements OnInit {
  restaurants: Restaurant[] = [];
  resultadosBusqueda: Restaurant[] = [];
  searchTerm: string = '';
  maxResultados: number = 5; 
  minResultados: number = 5;

  constructor(private httpClient: HttpClient) {}
  puedeMostrarMas: boolean = false;

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants() {
    const apiUrl = 'http://localhost:8080/restaurant';
    this.httpClient.get<Restaurant[]>(apiUrl).subscribe(restaurants => {
      this.restaurants = restaurants;
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
    return name.replace(regex, `<mark>$1</mark>`);
  }
}
