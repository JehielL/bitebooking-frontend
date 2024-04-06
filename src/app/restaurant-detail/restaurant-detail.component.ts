import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { DatePipe } from '@angular/common';
import { Restaurant } from "../Interfaces/restaurant.model";
import { RestaurantType } from '../Interfaces/restaurantType.model';
import { Menu } from '../Interfaces/menu.model';

@Component({
  selector: 'app-restaurant-detail',
  standalone: true,
  imports: [RouterLink, HttpClientModule, DatePipe],
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {
  Menus: Menu[] = [];
  restaurant: Restaurant | undefined;
  openingTime: Date | undefined;
  restaurantType = RestaurantType;
  restaurants: Restaurant[] = [];
  recommendedRestaurants: Restaurant[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) return;

      const restaurantUrl = `http://localhost:8080/restaurant/${id}`;
      this.httpClient.get<Restaurant>(restaurantUrl).subscribe(restaurant => {
        this.restaurant = restaurant;

        const menusUrl = `http://localhost:8080/menus/byRestaurant/${id}`;
        this.httpClient.get<Menu[]>(menusUrl)
          .subscribe(Menus => this.Menus = Menus);

        const apiUrl = 'http://localhost:8080/restaurant';
        this.httpClient.get<Restaurant[]>(apiUrl).subscribe(restaurants => {
          this.restaurants = restaurants;
          
          this.recommendedRestaurants = this.shuffleAndSelectRestaurants(this.restaurants, 3);
        });
      });
    });
  }
  private shuffleAndSelectRestaurants(restaurants: Restaurant[], count: number): Restaurant[] {
    let shuffledRestaurants = [...restaurants];
    for (let i = shuffledRestaurants.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledRestaurants[i], shuffledRestaurants[j]] = [shuffledRestaurants[j], shuffledRestaurants[i]];
    }
    return shuffledRestaurants.slice(0, count);
  }

  getRestaurantType(type?: RestaurantType): string {
    if (type === undefined) return 'No especificado';
    const typeAsString: string = RestaurantType[type as unknown as keyof typeof RestaurantType];
    return typeAsString;
  }
}

