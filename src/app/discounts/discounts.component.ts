import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../Interfaces/restaurant.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-discounts',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './discounts.component.html',
  styleUrl: './discounts.component.css'
})
export class DiscountsComponent implements OnInit{
  restaurants: Restaurant[] = [];
  showSpinner = true;

  constructor(private httpClient: HttpClient) { 
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.showSpinner = false;
    }, 1000);
    this.loadRestaurants();

    window.scrollTo(0, 0); 
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
