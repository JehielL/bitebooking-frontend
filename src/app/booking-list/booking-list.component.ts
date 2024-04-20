import { Component, OnInit } from '@angular/core';
import { Booking } from '../Interfaces/booking.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../Interfaces/user.model';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [ RouterLink, NgbAlertModule, DatePipe],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent implements OnInit {

  bookings: Booking[] = [];
  showDeleteBookingMessage: boolean = false;
  isAdmin = false;
  isRestaurant = false;
  users: User[] = [];
  booking: Booking | undefined;
  userId: string | null = null;
  user: User | undefined;


  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationService,
    private activedRoute: ActivatedRoute,
  ) {
    this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
    this.authService.userId.subscribe(userId => this.userId = userId);
    this.authService.isRestaurant.subscribe(isRestaurant => this.isRestaurant = isRestaurant);

    console.log(this.isAdmin);
    console.log(this.userId);
  }

  ngOnInit(): void {

    this.activedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) return;
      const userUrl = 'http://localhost:8080/user/' + id;
      console.log(id);

      this.httpClient.get<User[]>(userUrl).subscribe(users => this.users = users);

      const url = 'http://localhost:8080/bookings/filter-by-user/' + id;
      this.httpClient.get<Booking[]>(url).subscribe(bookings => this.bookings = bookings);


    });

    this.loadBookings();
  }

  delete(booking: Booking) {

    const url = 'http://localhost:8080/bookings/' + booking.id;
    this.httpClient.delete(url).subscribe(response => {

      this.loadBookings();
      this.showDeleteBookingMessage = true;
    })
  }

  private loadBookings() {


  }

  hideDeletedBookingMessage() {

    this.showDeleteBookingMessage = false;
  }



}