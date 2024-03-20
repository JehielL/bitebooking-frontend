import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Restaurant} from "../Interfaces/restaurant.model";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Booking} from "../Interfaces/booking.model";

@Component({
  selector: 'app-restaurant-detail',
  standalone: true,
  imports: [RouterLink,HttpClientModule],
  templateUrl: './restaurant-detail.component.html',
  styleUrl: './restaurant-detail.component.css'
})
export class RestaurantDetailComponent implements OnInit{
  restaurant: Restaurant | undefined;
  constructor(
      private activatedRoute: ActivatedRoute,
      private httpClient: HttpClient
  ) {}
  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];

      if (!id) return;

      const url = 'http://localhost:8080/restaurant/' + id;

      this.httpClient.get<Restaurant>(url).subscribe(restaurant => this.restaurant = restaurant);

    });
}
}