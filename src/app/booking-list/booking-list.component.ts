import { Component, OnInit } from '@angular/core';
import { Booking } from '../Interfaces/booking.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [HttpClientModule, RouterLink, NgbAlertModule, DatePipe],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent implements OnInit {

  bookings: Booking[] = [];
  showDeleteBookingMessage: boolean = false;
  isAdmin = false;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationService) {
    this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
    console.log(this.isAdmin);
    }

  ngOnInit(): void {

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

    const url = 'http://localhost:8080/bookings';
    this.httpClient.get<Booking[]>(url).subscribe(bookings => this.bookings = bookings);
  }

  hideDeletedBookingMessage() {

    this.showDeleteBookingMessage = false;
  }



}