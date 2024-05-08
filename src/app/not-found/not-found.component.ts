import { Component, OnInit } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements OnInit{
  constructor(private router: Router) {}
  ngOnInit(): void {
    window.scrollTo(0, 0); 
  }
  
  goToHome() {
    this.router.navigate(['/home']);
  }
}