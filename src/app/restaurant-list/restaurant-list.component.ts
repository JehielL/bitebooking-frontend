import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Restaurant } from '../Interfaces/restaurant.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,HttpClientModule,FormsModule]
})
export class RestaurantListComponent implements OnInit {
  form: FormGroup;
  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  searchTerm: string = '';

  constructor(private httpClient: HttpClient) {
    this.form = new FormGroup({
      searchTerm: new FormControl('')
    });

    this.form.get('searchTerm')?.valueChanges.subscribe(val => {
      this.searchTerm = val;
      this.filterRestaurants();
    });
  }

  ngOnInit(): void {
    this.loadRestaurantsDirectly();
  }

  loadRestaurantsDirectly() {
    const apiUrl = 'http://localhost:8080/restaurant';
    this.httpClient.get<Restaurant[]>(apiUrl).subscribe(restaurants => {
      this.restaurants = restaurants;
      this.filteredRestaurants = restaurants;
    });
  }

  filterRestaurants() {
    if (!this.searchTerm) {
      this.filteredRestaurants = this.restaurants;
    } else {
      this.filteredRestaurants = this.restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }  
}
