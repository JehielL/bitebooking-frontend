import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Restaurant } from '../Interfaces/restaurant.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantType } from '../Interfaces/restaurantType.model';
import { User } from '../Interfaces/user.model';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [RouterLink, NgbCarouselModule],
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css'] 
})
export class CarruselComponent implements OnInit {
  restaurants: Restaurant[] = [];
  restaurantType = RestaurantType;
  carruselIntervalo = 2000;

  userId: string | null = null;
  isLoggedin = false;
  collapsed = true;
  userEmail = '';
  isAdmin = false;
  user: User | undefined;
  authService: AuthenticationService | undefined;

  constructor(private httpClient: HttpClient, authService: AuthenticationService) {
    this.authService = authService;
    if (this.authService) {
      this.authService.isLoggedin.subscribe(isLoggedin => this.isLoggedin = isLoggedin);
      this.authService.userEmail.subscribe(userEmail => this.userEmail = userEmail);
      this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
      this.authService.userId.subscribe(userId => this.userId = userId);
    }
  }

  ngOnInit(): void {
    this.loadRestaurantsDirectly1();
  }
  loadRestaurantsDirectly1() {
    const Url = 'http://localhost:8080/restaurant';
    this.httpClient.get<Restaurant[]>(Url).subscribe(restaurants => 
      this.restaurants = restaurants);
  }
  getRestaurantType(type?: RestaurantType): string {
    if (type === undefined) return 'No especificado';
    const typeAsString: string = RestaurantType[type as unknown as keyof typeof RestaurantType];
    return typeAsString;
  }
}