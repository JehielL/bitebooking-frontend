import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [],
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css'] 
})
export class CarruselComponent {
constructor(private router: Router) {}

navigateToReservation() {
  this.router.navigate(['/booking']);
}

}

