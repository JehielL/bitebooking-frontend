import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../Interfaces/restaurant.model';

@Component({
  selector: 'app-descuentos',
  standalone: true,
  imports: [],
  templateUrl: './descuentos.component.html',
  styleUrl: './descuentos.component.css'
})
export class DescuentosComponent implements OnInit{
  restaurants: Restaurant[] = [];

  constructor(private httpClient: HttpClient) { 
  }

  ngOnInit(): void {
    this.loadRestaurants();
  }
  loadRestaurants(){
    const apiURL = 'http://localhost:8080/restaurant';
    this.httpClient.get<Restaurant[]>(apiURL).subscribe(restaurants => {
      this.restaurants = restaurants;
  });
  }
  getDiscounts(){
    return this.restaurants.filter(restaurant => restaurant.discount > 0);
  }
}
