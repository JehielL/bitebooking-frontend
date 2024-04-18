import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { Restaurant } from '../Interfaces/restaurant.model';
import { HttpClient } from '@angular/common/http';
import { RestaurantType } from '../Interfaces/restaurantType.model';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent implements OnInit{
  restaurantTop: Restaurant[] = [];
  restaurantType = RestaurantType;
  
  constructor(private httpClient: HttpClient) { }
  ngOnInit() {
    this.loadTopRestaurants();
  }
  loadTopRestaurants() {
    const apiUrl = 'http://localhost:8080/restaurant';
    this.httpClient.get<Restaurant[]>(apiUrl).subscribe(restaurants => {
      this.restaurantTop = restaurants;
      },
      error => {
        console.log(error);
      }
    );
  }
  getRestaurantType(type?: RestaurantType): string {
    if (type === undefined) return 'No especificado';
    const typeAsString: string = RestaurantType[type as unknown as keyof typeof RestaurantType];
    return typeAsString;
  }
}
