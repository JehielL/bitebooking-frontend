import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { Location } from '@angular/common';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DatePipe, NavbarComponent, FooterComponent, BookingDetailComponent,NotFoundComponent, BookingListComponent,RestaurantListComponent, ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  mostrarBotonRetroceso: boolean = false;
  mostrarMenuDesplegable: boolean = false;

  constructor(private location: Location, private router: Router) {
    this.router.events.subscribe(() =>{
      this.mostrarBotonRetroceso = this.router.url !== '/home';
    });
  }

  retroceder(): void {
    this.location.back();
  }

  toggleMenuDesplegable(): void {
    this.mostrarMenuDesplegable = !this.mostrarMenuDesplegable;
  }

  onMouseLeave(): void {
    this.mostrarMenuDesplegable = false;
  }

  title = 'Bite booking app';   
}