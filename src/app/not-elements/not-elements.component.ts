import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-elements',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-elements.component.html',
  styleUrl: './not-elements.component.css'
})
export class NotElementsComponent {
  constructor(private router: Router) {}
  
  notResultados() {
    this.router.navigate(['/not']);
  }
}
