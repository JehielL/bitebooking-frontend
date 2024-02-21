import {Booking} from "./Interfaces/booking.model"
import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Menu } from "./Interfaces/menu.model";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'biteBooking'
  bookings: Booking[] = [
  {
    id: 1,
    publishDate: new Date(),
    title: 'Reserva Jehiel linarez',
    numUsers: 14,
    observations: 'VIP',
    status: 'confirmado',
    discount: 20,
    interior: false,
    numTable: 4,
    totalPrice: 300,
    menu: {
      id:1,
      title: 'Menu Japones',
      description: 'Omakase nivel II',
      isAvailable: true,
      allergic: false,
      isVegan: true
    } 
  },
  {
    id: 2,
    publishDate: new Date(),
    title: 'Reserva Alan sastre',
    numUsers: 14,
    observations: 'VIP',
    status: 'confirmado',
    discount: 20,
    interior: false,
    numTable: 4,
    totalPrice: 300,
    menu: {
      id:2,
      title: 'Menu Japones',
      description: 'Omakase nivel II',
      isAvailable: false,
      allergic: true,
      isVegan: false
    } 
  }
  
  ];

  menus: Menu[] = [];
}