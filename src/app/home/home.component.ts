import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Restaurant } from '../Interfaces/restaurant.model'; 
import { Router, RouterLink } from '@angular/router';
import { CarruselComponent } from '../carrusel/carrusel.component';
import { User } from '../Interfaces/user.model';
import { AuthenticationService } from '../authentication/authentication.service';
import { HomeSinLogComponent } from '../home-sin-log/home-sin-log.component';
import { KitchenComponent } from '../kitchen/kitchen.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [RouterLink,CarruselComponent,HomeSinLogComponent, KitchenComponent, CommonModule],
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
  user: User | undefined;
  authService: AuthenticationService | undefined;
  

  constructor(private httpClient: HttpClient, authService: AuthenticationService, router: Router) {
    this.authService = authService;
    if (this.authService) {
      this.authService.isLoggedin.subscribe(isLoggedin => this.isLoggedin = isLoggedin);
      this.authService.userEmail.subscribe(userEmail => this.userEmail = userEmail);
      this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
      this.authService.userId.subscribe(userId => this.userId = userId);
    }
  }
  puedeMostrarMas: boolean = false;
  showCocinasDropdown: boolean = false;
  
  currentBackgroundIndex = 0;
  upcomingBackgroundIndex: number = 1;

  backgroundImages = [
    'https://i.ibb.co/h7pR39B/restaurante-madrid.jpg',
    'https://i.ibb.co/ZxDKXcg/PTM2MDoq.jpg',
    'https://i.ibb.co/wz8hFnr/Ml-BKU0p-KTTQuan-Bn.jpg',
    'https://i.ibb.co/F8cg23f/a-Xpl-PTY0-MDoq.jpg',
    'https://i.ibb.co/9q4N7q7/restaurante-5.jpg',
  ];
  
  ngOnInit(): void {
    this.loadRestaurants();
    this.startBackgroundSequence();
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
  startBackgroundSequence() {
    setInterval(() => {
      this.upcomingBackgroundIndex = (this.currentBackgroundIndex + 1) % this.backgroundImages.length;
      this.fadeTransition();
    }, 10000); // Cambia cada 10 segundos
  }
  fadeTransition() {
    const currentImgElement = document.querySelector('.img-welcome .background-image:not(.upcoming)') as HTMLElement;
    const upcomingImgElement = document.querySelector('.img-welcome .background-image.upcoming') as HTMLElement;

    upcomingImgElement.style.opacity = '1'; // Hace visible la nueva imagen
    setTimeout(() => {
      this.currentBackgroundIndex = this.upcomingBackgroundIndex;
      currentImgElement.style.backgroundImage = `url('${this.getCurrentImage()}')`;
      upcomingImgElement.style.opacity = '0'; // Restablece la opacidad para la próxima imagen
    }, 2000); // Debe coincidir con la duración de la transición de opacidad
  }
  getCurrentImage(): string {
    return this.backgroundImages[this.currentBackgroundIndex];
  }
  getUpcomingImage() {
    return this.backgroundImages[this.upcomingBackgroundIndex];
  }
}