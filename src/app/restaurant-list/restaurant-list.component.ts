import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Restaurant } from '../Interfaces/restaurant.model';
import { BookingListComponent } from '../booking-list/booking-list.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrl: './restaurant-list.component.css', 
  standalone: true,
  imports: [HttpClientModule, RouterLink]
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.loadRestaurantsDirectly();
  }

  loadRestaurantsDirectly() {
    const apiUrl = 'http://localhost:8080/restaurant';
    this.httpClient.get<Restaurant[]>(apiUrl).subscribe(restaurants => 
      this.restaurants = restaurants
      );
  }
}