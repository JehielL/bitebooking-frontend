import { DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbAccordionModule, NgbAlert, NgbAlertModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { Menu } from '../Interfaces/menu.model';
import { Dish } from '../Interfaces/dish.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Rating } from '../Interfaces/rating.model';
import { User } from '../Interfaces/user.model';
import { AuthenticationService } from '../services/authentication.service';
import { RestaurantType } from '../Interfaces/restaurantType.model';


@Component({
  selector: 'app-menu-detail',
  standalone: true,
  imports: [ RouterLink, DatePipe, NgbAccordionModule, NgbAlert, NgbRatingModule, ReactiveFormsModule],
  templateUrl: './menu-detail.component.html',
  styleUrl: './menu-detail.component.css'
})
export class MenuDetailComponent implements OnInit {
  restaurantType = RestaurantType;
  menu: Menu | undefined;
  user: User | undefined;
  isAdmin = false;
  isRestaurant = false;


  ratings: Rating[] = [];
  ratingForm = new FormGroup({
    score: new FormControl(0),
    comment: new FormControl(''),
  });

  showDeleteMenuMessage: boolean = false;
  dishes: Dish[] = [];
  users: User[] = [];

  constructor(
    private activedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private authService: AuthenticationService) {
      this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
      this.authService.isRestaurant.subscribe(isRestaurant => this.isAdmin = isRestaurant);
      }

  ngOnInit(): void {
    this.activedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) return;
      const menuUrl = 'http://localhost:8080/menus/' + id;
      const ratingsUrl = 'http://localhost:8080/menus/filter-by-menu/' + id;
      const userUrl = 'http://localhost:8080/user/' + id;
      
      

      this.httpClient.get<Menu>(menuUrl).subscribe(m => this.menu = m);
      this.httpClient.get<Rating[]>(ratingsUrl).subscribe(ratings => this.ratings = ratings);
      this.httpClient.get<User[]>(userUrl).subscribe(users => this.users = users);

      this.httpClient.get<Dish[]>('http://localhost:8080/dishes/filter-by-menu/' + id)
      .subscribe(dishes => this.dishes = dishes);
    });
  }

  delete(menu: Menu) {
    const url = 'http://localhost:8080/menus/' + menu.id;
    this.httpClient.delete(url).subscribe(response => {
      this.menu = undefined;
      this.showDeleteMenuMessage = true;
    });
  }

  hideDeletedMenuMessage() {
    this.showDeleteMenuMessage = false;
  }

  save() {
    const rating: Rating = {
      id: 0,
      score: this.ratingForm.get('score')?.value ?? 0,
      comment: this.ratingForm.get('comment')?.value ?? '',
      menu: this.menu,
    };

    this.httpClient.post<Rating>('http://localhost:8080/ratings', rating).subscribe(savedRating => {
      this.ratingForm.reset();
      this.ratings.push(savedRating);
    });
  }
  getRestaurantType(type?: RestaurantType): string {
    if (type === undefined) return 'No especificado';
    const typeAsString: string = RestaurantType[type as unknown as keyof typeof RestaurantType];
    return typeAsString;
  }
}
