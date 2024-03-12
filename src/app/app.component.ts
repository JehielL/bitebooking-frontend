import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DatePipe, NavbarComponent, FooterComponent, BookingDetailComponent,NotFoundComponent, BookingListComponent,RestaurantListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {




}