import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Restaurant } from '../Interfaces/restaurant.model';
import { DatePipe } from '@angular/common';
import { BookingListComponent } from '../booking-list/booking-list.component';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrl: './restaurant-list.component.css', 
  standalone: true,
  imports: [HttpClientModule, BookingListComponent]
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.loadRestaurantsDirectly();
  }

  loadRestaurantsDirectly() {
    const apiUrl = 'http://localhost:8080/restaurant';
    this.httpClient.get<Restaurant[]>(apiUrl).subscribe(restaurants => {
      this.restaurants = restaurants.map(restaurant => ({
        ...restaurant
      }));
    });
  }
  trackByFunction(index: number, item: Restaurant): number {
    return item.id; // Asume que cada `restaurant` tiene un `id` único.
  }
}
