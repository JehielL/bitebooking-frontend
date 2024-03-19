import { Component } from '@angular/core';

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
