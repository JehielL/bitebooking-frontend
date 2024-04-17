import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Restaurant } from '../Interfaces/restaurant.model'; 
import { Router, RouterLink } from '@angular/router';
import { CarruselComponent } from '../carrusel/carrusel.component';
import { User } from '../Interfaces/user.model';
import { AuthenticationService } from '../services/authentication.service';
import { HomeSinLogComponent } from '../home-sin-log/home-sin-log.component';
import { KitchenComponent } from '../kitchen/kitchen.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CarruselComponent, HomeSinLogComponent, KitchenComponent, RouterLink],
})
export class HomeComponent implements OnInit {
  restaurants: Restaurant[] = [];
  resultadosBusqueda: Restaurant[] = [];
  searchTerm: string = '';
  maxResultados: number = 5; 
  minResultados: number = 5;

  userId: string | null = null;
  isLoggedin = false;
  collapsed = true;
  userEmail = '';
  isAdmin = false;
  isRestaurant = false;
  user: User | undefined;
  authService: AuthenticationService | undefined;
  

  constructor(private httpClient: HttpClient, authService: AuthenticationService, router: Router) {
    this.authService = authService;
    if (this.authService) {
      this.authService.isLoggedin.subscribe(isLoggedin => this.isLoggedin = isLoggedin);
      this.authService.userEmail.subscribe(userEmail => this.userEmail = userEmail);
      this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
      this.authService.userId.subscribe(userId => this.userId = userId);
      this.authService.isRestaurant.subscribe(isRestaurant => this.isAdmin = isRestaurant);
    }
  }
  puedeMostrarMas: boolean = false;
  showCocinasDropdown: boolean = false;
  
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
    return name.replace(regex, '$1');
  }
  toggleCocinasDropdown() {
    this.showCocinasDropdown = !this.showCocinasDropdown;
  }
}
