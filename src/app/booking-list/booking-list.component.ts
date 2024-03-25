import { Component, OnInit } from '@angular/core';
import { Booking } from '../Interfaces/booking.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

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

  constructor(private httpClient: HttpClient) { }

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