import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { DatePipe } from '@angular/common';
import { Restaurant } from "../Interfaces/restaurant.model";
import { RestaurantType } from '../Interfaces/restaurantType.model';
import { Menu } from '../Interfaces/menu.model';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../Interfaces/user.model';
import { Booking } from '../Interfaces/booking.model';

@Component({
  selector: 'app-restaurant-detail',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {
  menus: Menu[] = [];
  bookings: Booking[] = [];
  menu: Menu | undefined;
  restaurant: Restaurant | undefined;
  openingTime: Date | undefined;
  restaurantType = RestaurantType;
  restaurants: Restaurant[] = [];
  recommendedRestaurants: Restaurant[] = [];

  userId: string | null = null;
  isLoggedin = false;
  collapsed = true;
  userEmail = '';
  isAdmin = false;
  isRestaurant = false;
  user: User | undefined;
  authService: AuthenticationService | undefined;
  canEdit = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,authService: AuthenticationService  ) {
      this.authService = authService;
      if (this.authService) {
        this.authService.isLoggedin.subscribe(isLoggedin => this.isLoggedin = isLoggedin);
        this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
        this.authService.isRestaurant.subscribe(isRestaurant => this.isRestaurant = isRestaurant);
        this.authService.userId.subscribe(userId => this.userId = userId);
      }
    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) return;

      const restaurantUrl = `http://localhost:8080/restaurant/${id}`;
      this.httpClient.get<Restaurant>(restaurantUrl).subscribe(restaurant => {
        this.restaurant = restaurant;

        this.httpClient.get<boolean>('http://localhost:8080/restaurants/can-edit/' + id)
        .subscribe(canEdit => {
          this.canEdit = canEdit;
        });

        const menusUrl = `http://localhost:8080/menus/byRestaurant/${id}`;
        this.httpClient.get<Menu[]>(menusUrl)
          .subscribe(Menus => this.menus = Menus);

        const apiUrl = 'http://localhost:8080/restaurant';
        this.httpClient.get<Restaurant[]>(apiUrl).subscribe(restaurants => {
          this.restaurants = restaurants;
          
          this.recommendedRestaurants = this.shuffleAndSelectRestaurants(this.restaurants, 3);
        });

        
      });
      this.httpClient.get<Booking[]>('http://localhost:8080/bookings/filter-by-restaurant/' + id)
    .subscribe(bookings => this.bookings = bookings);
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
  formatTime(time: string | undefined): string {
    return time ? time.substring(0, 5) : '';
  }
  
}

