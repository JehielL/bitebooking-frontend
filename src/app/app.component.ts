import {Booking} from "./Interfaces/booking.model"
import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Menu } from "./Interfaces/menu.model";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { NotFoundComponent } from "./not-found/not-found.component";
<<<<<<< HEAD
import { BookingDetailComponent } from "./booking-detail/booking-detail.component";
import { BookingListComponent } from "./booking-list/booking-list.component";
=======
import { CarruselComponent } from './carrusel/carrusel.component';

>>>>>>> CarlosRama


@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, RouterOutlet, DatePipe, NavbarComponent, FooterComponent, BookingDetailComponent,NotFoundComponent, BookingListComponent],
=======
  imports: [CommonModule, RouterOutlet, DatePipe, NavbarComponent,
     FooterComponent,NotFoundComponent,CarruselComponent],
>>>>>>> CarlosRama
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {




}