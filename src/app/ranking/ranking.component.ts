import { Component, OnInit } from '@angular/core';
import { Route, RouterLink } from '@angular/router';
import { Restaurant } from '../Interfaces/restaurant.model';
import { HttpClient } from '@angular/common/http';
import { RestaurantType } from '../Interfaces/restaurantType.model';
import { switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent implements OnInit{
  restaurantTop: Restaurant[] = [];
  restaurantType = RestaurantType;
  showSpinner = true;
  
  constructor(private httpClient: HttpClient) { }
  ngOnInit() {

    window.scrollTo(0, 0); 
    this.loadTopRestaurants();
  }
  loadTopRestaurants() {
    const apiUrl = 'http://localhost:8080/restaurant';
    timer(500).pipe(
      switchMap(() =>  this.httpClient.get<Restaurant[]>(apiUrl)),
    ).subscribe(restaurants => {
      this.restaurantTop = restaurants;
      this.showSpinner = false;
      }
    );
  }
  getRestaurantType(type?: RestaurantType): string {
    if (type === undefined) return 'No especificado';
    const typeAsString: string = RestaurantType[type as unknown as keyof typeof RestaurantType];
    return typeAsString;
  }
}
