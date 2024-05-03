import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Restaurant } from '../Interfaces/restaurant.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RestaurantType } from '../Interfaces/restaurantType.model';
import { combineLatest, switchMap, timer } from 'rxjs';

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
  restaurantType = RestaurantType;
  searchTerm: string = '';
  maxResultados: number = 5; 
  minResultados: number = 5;
  showSpinner = true;
  


  constructor(private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router) {}
  puedeMostrarMas: boolean = false;
  noResultados: boolean = false ;
  
  ngOnInit(): void {
    combineLatest([
      this.activatedRoute.params,
      this.activatedRoute.queryParams
    ]).subscribe(([params, queryParams]) => {
      const tipoCocina = params['tipoCocina'];
      const view = queryParams['view'];
  
      if(view === 'mine') {
        this.loadMyRestaurants();
      } else if (tipoCocina) {
        this.filtrarRestaurantesPorTipoCocina(tipoCocina);
      } else {
        this.loadRestaurantsDirectly();
      }

    
    });
  }

  loadMyRestaurants(): void {
    const myRestaurantsUrl = 'http://localhost:8080/my-restaurants';
    timer(500).pipe(
      switchMap(() => this.httpClient.get<Restaurant[]>(myRestaurantsUrl)),
    ).subscribe(restaurants => {
     this.restaurants = restaurants;
     this.showSpinner = false;
     if (this.restaurants.length === 0) {
      this.noResultados = true;
        } else {
        this.noResultados = false;}; 
    });
  }

  filtrarRestaurantesPorTipoCocina(tipoCocina: string): void {
    const url = `http://localhost:8080/restaurant-list/${tipoCocina}`;
    timer(500).pipe(
      switchMap( () => this.httpClient.get<Restaurant[]>(url))
    ).subscribe(restaurants => {
      this.restaurants = restaurants;
      this.showSpinner = false;
      
    }); 
  }

  loadRestaurantsDirectly() {
    const apiUrl = 'http://localhost:8080/restaurant';

    timer(600).pipe(
      switchMap(() => this.httpClient.get<Restaurant[]>(apiUrl))
    ).subscribe(restaurants => {
      this.restaurants = restaurants;
      this.showSpinner = false;
      
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
  getRestaurantType(type?: RestaurantType): string {
    if (type === undefined) return 'No especificado';
    const typeAsString: string = RestaurantType[type as unknown as keyof typeof RestaurantType];
    return typeAsString;
  }
}
