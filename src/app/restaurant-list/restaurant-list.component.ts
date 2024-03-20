import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Restaurant } from '../Interfaces/restaurant.model';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [RouterLink, HttpClientModule],
  templateUrl: './restaurant-list.component.html',
  styleUrl: './restaurant-list.component.css'
})
export class RestaurantListComponent {

}
