import { Component, OnInit } from '@angular/core';
import { Booking } from '../Interfaces/booking.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../Interfaces/user.model';
import { delay,isEmpty,switchMap, timer } from 'rxjs';
import { NotElementsComponent } from '../not-elements/not-elements.component';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [ RouterLink, NgbAlertModule, DatePipe, NotElementsComponent],
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
  showSpinner = true;
  isEmpty = false;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationService,
    private activedRoute: ActivatedRoute,
  ) {
    this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
    this.authService.userId.subscribe(userId => this.userId = userId);
    this.authService.isRestaurant.subscribe(isRestaurant => this.isRestaurant = isRestaurant);
    
  }

  ngOnInit(): void {
    this.activedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) return;
      setTimeout(() => {
        this.showSpinner = false;
      }, 1000);
      
      const userUrl = 'http://localhost:8080/user/' + id;
      this.httpClient.get<User[]>(userUrl).subscribe(users => this.users = users);

      const url = 'http://localhost:8080/bookings/filter-by-user/' + id;
      this.httpClient.get<Booking[]>(url).subscribe(bookings => this.bookings = bookings);
      !this.isEmpty == true;
      
      
    });
  }



  delete(booking: Booking) {

    const url = 'http://localhost:8080/bookings/' + booking.id;
    this.httpClient.delete(url).subscribe(() => {
      this.showDeleteBookingMessage = true;
    })
  }


  hideDeletedBookingMessage() {

    this.showDeleteBookingMessage = false;
  }



}

function comprobar() {
  throw new Error('Function not implemented.');
}
