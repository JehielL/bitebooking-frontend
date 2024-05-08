import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Booking } from '../Interfaces/booking.model';
import { ActivatedRoute, Router } from '@angular/router';

import { Menu } from '../Interfaces/menu.model';
import { Restaurant } from '../Interfaces/restaurant.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../Interfaces/user.model';


@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe, DatePipe],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent implements OnInit {

  booking: Booking | undefined;
  restaurant: Restaurant | undefined;
  isUpdate: boolean = false; // por defecto estamos en CREAR no en ACTUALIZAR
  isAdmin = false;
  isRestaurant = false;
  authService: AuthenticationService | undefined;
  userId: string | null = null;
  isLoggedin = false;
  user: User | undefined;
  showSpinner = true;


  bookingForm = new FormGroup({
    id: new FormControl<number>(0),
    createDate: new FormControl<Date>(new Date()),
    numUsers: new FormControl<number>(0),
    observations: new FormControl<string>(''),
    status: new FormControl<boolean>(true),
    interior: new FormControl<boolean>(true),
    numTable: new FormControl<number>(0),
    restaurant: new FormControl(),
    isPremium: new FormControl<boolean>(false),
    extraService: new FormControl<string>(''),
  });


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private httpClient: HttpClient,
    authService: AuthenticationService) {
    this.authService = authService;
    if (this.authService) {
      this.authService.isLoggedin.subscribe(isLoggedin => this.isLoggedin = isLoggedin);
      this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
      this.authService.isRestaurant.subscribe(isRestaurant => this.isRestaurant = isRestaurant);
      this.authService.userId.subscribe(userId => this.userId = userId);
    }
  }




  showFinishMessage = false;

  ngOnInit(): void {

    window.scrollTo(0, 0); 


    setTimeout(() => {
      this.showSpinner = false;
    }, 1000);

    this.httpClient.get<User>('http://localhost:8080/users/account')
      .subscribe(user => {
        this.user = user;

      });

    this.activatedRoute.params.subscribe(params => {

      const id = params['id'];
      if (!id) return;


      this.httpClient.get<Restaurant>('http://localhost:8080/restaurant/' + id)
        .subscribe(restaurants => this.restaurant = restaurants);


      this.httpClient.get<Booking>('http://localhost:8080/bookings/' + id).subscribe(bookingFromBackend => {
        // cargar el libro obtenido en el formulario bookForm
        this.bookingForm.reset({
          id: bookingFromBackend.id,
          createDate: bookingFromBackend.createDate,
          numUsers: bookingFromBackend.numUsers,
          observations: bookingFromBackend.observations,
          status: bookingFromBackend.status,
          interior: bookingFromBackend.interior,
          numTable: bookingFromBackend.numTable,
          restaurant: bookingFromBackend.restaurant,
          isPremium: bookingFromBackend.isPremium,
          extraService: bookingFromBackend.extraService,


        });

        // marcar boolean true isUpdate
        this.isUpdate = true;

      });
    });

  }

  compareObjects(o1: any, o2: any): boolean {

    if (o1 && o2) {
      return o1.id == o2.id;
    }

    return o1 == o2;
  }


  save() {
    if (!this.restaurant)
      return;
    const booking: Booking = this.bookingForm.value as Booking;
    booking.restaurant = this.restaurant;

    if (this.isUpdate) {
      const url = 'http://localhost:8080/bookings/' + booking.id;
      this.httpClient.put<Booking>(url, booking).subscribe(bookingFromBackend => {
        this.router.navigate(['/bookings', bookingFromBackend.id, 'detail']);
      });

    } else {
      const url = 'http://localhost:8080/bookings';
      this.httpClient.post<Booking>(url, booking).subscribe(bookingFromBackend => {
        this.router.navigate(['/bookings', bookingFromBackend.id, 'detail']);
      });
    }



  };
}
