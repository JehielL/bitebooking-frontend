import { DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbAccordionModule, NgbAlert, NgbAlertModule, NgbModal, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
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
  authService: AuthenticationService | undefined;
  userId: string | null = null;
  isLoggedin = false;
  showSuccessDeletedRating = false;
  showDeleteMenuMessage = false;
  showErrorDeletedRating = false;
  canEdit = false;

  ratings: Rating[] = [];
  ratingForm = new FormGroup({
    score: new FormControl(0),
    comment: new FormControl(''),
  });

  dishes: Dish[] = [];
  users: User[] = [];
  showSpinner = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    authService: AuthenticationService,
    private modalService: NgbModal  ) {
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
      setTimeout(() => {
        this.showSpinner = false;
      }, 1000);

      const ratingsUrl = 'http://localhost:8080/menus/filter-by-menu/' + id;
      const userUrl = 'http://localhost:8080/user/' + id;
      
      

      const url = 'http://localhost:8080/menus/' + id;
      this.httpClient.get<Menu>(url).subscribe(m => {
        this.menu = m;
        this.loadRatings();
      });      this.httpClient.get<Rating[]>(ratingsUrl).subscribe(ratings => this.ratings = ratings);
      this.httpClient.get<User[]>(userUrl).subscribe(users => this.users = users);

      this.httpClient.get<Dish[]>('http://localhost:8080/dishes/filter-by-menu/' + id)
      .subscribe(dishes => this.dishes = dishes);

      this.checkCanEdit(id);
    });
    

    console.log(this.isAdmin);
  }

  checkCanEdit(id: number): void {
    this.httpClient.get<boolean>(`http://localhost:8080/menus/can-edit/${id}`)
    .subscribe(canEdit => {
        this.canEdit = canEdit;
    }, error => {
        this.canEdit = false;
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

    this.httpClient.post<Rating>('http://localhost:8080/ratings', rating).subscribe(rating => {
      this.ratingForm.reset();
      this.loadRatings();
    });

    this.httpClient.get<Rating[]>('http://localhost:8080/menus/filter-by-menu/' + this.menu?.id)
      .subscribe(ratings => this.ratings = ratings);
  }

  loadRatings() {
    if (!this.menu) return;

    this.httpClient.get<Rating[]>('http://localhost:8080/menus/filter-by-menu/' + this.menu.id)
      .subscribe(ratings => this.ratings = ratings);
  }

  deleteRating(rating: Rating) {
    this.httpClient.delete('http://localhost:8080/ratings/' + rating.id)
    .subscribe({
      next: response => {
        this.loadRatings();
        this.showSuccessDeletedRating = true;
      },
      error: error => {
        this.showErrorDeletedRating = true;
      }
    });
  }

  getRestaurantType(type?: RestaurantType): string {
    if (type === undefined) return 'No especificado';
    const typeAsString: string = RestaurantType[type as unknown as keyof typeof RestaurantType];
    return typeAsString;
  }

  openModal(modal: TemplateRef<any>, menu: Menu) {
    this.modalService.open(modal, {
      centered: true
    }).result.then(result => {
      if (result === 'Aceptar') {
        this.delete(menu);
      }
    });
  }

  

}
