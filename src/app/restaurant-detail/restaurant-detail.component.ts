import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Restaurant } from "../Interfaces/restaurant.model";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { DatePipe } from '@angular/common';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {}

getRestaurantType(type?: RestaurantType): string {
  if (type === undefined) return 'No especificado';
  const typeAsString: string = RestaurantType[type as unknown as keyof typeof RestaurantType];
  return typeAsString;
}
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
    });
  });
}
  
}
