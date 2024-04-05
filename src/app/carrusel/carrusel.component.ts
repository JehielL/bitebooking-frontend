import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Restaurant } from '../Interfaces/restaurant.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantType } from '../Interfaces/restaurantType.model';

@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [HttpClientModule,RouterLink, NgbCarouselModule],
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css'] 
})
export class CarruselComponent implements OnInit {
  restaurants: Restaurant[] = [];
  restaurantType = RestaurantType;
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
  getRestaurantType(type?: RestaurantType): string {
    if (type === undefined) return 'No especificado';
    const typeAsString: string = RestaurantType[type as unknown as keyof typeof RestaurantType];
    return typeAsString;
  }
}