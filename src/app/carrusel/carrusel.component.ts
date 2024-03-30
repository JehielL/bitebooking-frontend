import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Restaurant } from '../Interfaces/restaurant.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [HttpClientModule,RouterLink, NgbCarouselModule],
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css'] 
})
export class CarruselComponent implements OnInit {
  restaurants: Restaurant[] = [];
  carruselIntervalo = 2000;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.loadRestaurantsDirectly1();
  }
  loadRestaurantsDirectly1() {
    const Url = 'http://localhost:8080/restaurant';
    this.httpClient.get<Restaurant[]>(Url).subscribe(restaurants => 
      this.restaurants = restaurants);
  }
}