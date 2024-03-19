import { Component } from '@angular/core';
import {Restaurant} from "../Interfaces/restaurant.model";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-restaurant-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './restaurant-detail.component.html',
  styleUrl: './restaurant-detail.component.css'
})
export class RestaurantDetailComponent {
  restaurant: Restaurant [] = [];
}
