import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '../Interfaces/restaurant.model';
import { RestaurantType } from '../Interfaces/restaurantType.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-zone',
  standalone: true,
  templateUrl: './zone.component.html',
  imports: [RouterLink],
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent implements OnInit {
  restaurants: Restaurant[] = [];
  restaurantsByPostalCode: { [postalCode: string]: Restaurant[] } = {};
  uniquePostalCodes: string[] = [];
  restaurantType = RestaurantType;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    const apiUrl = 'http://localhost:8080/restaurant';
    this.httpClient.get<Restaurant[]>(apiUrl).subscribe(restaurants => {
      this.restaurants = restaurants;
      this.groupRestaurantsByPostalCode();
    });
  }

  groupRestaurantsByPostalCode(): void {
    this.restaurantsByPostalCode = {};
    
    this.restaurants.forEach(restaurant => {
      if (!this.restaurantsByPostalCode[restaurant.postalCode]) {
        this.restaurantsByPostalCode[restaurant.postalCode] = [];
      }
      this.restaurantsByPostalCode[restaurant.postalCode].push(restaurant);
    });
    
    this.uniquePostalCodes = Object.keys(this.restaurantsByPostalCode);
  }
  getRestaurantType(type?: RestaurantType): string {
    if (type === undefined) return 'No especificado';
    const typeAsString: string = RestaurantType[type as unknown as keyof typeof RestaurantType];
    return typeAsString;
  }
}
