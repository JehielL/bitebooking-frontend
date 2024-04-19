import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../Interfaces/user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgbDropdownModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  title = 'frontend'
  userId: string | null = null;
  isLoggedin = false;
  collapsed = true;
  userEmail = '';
  isAdmin = false;
  isRestaurant = false;
  user: User | undefined;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private httpClient: HttpClient,
    ){

    this.authService.isLoggedin.subscribe(isLoggedin => this.isLoggedin = isLoggedin);
    this.authService.userEmail.subscribe(userEmail => this.userEmail = userEmail);
    this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
    this.authService.isRestaurant.subscribe(isRestaurant => this.isRestaurant = isRestaurant);
    this.authService.userId.subscribe(userId => this.userId = userId);
  }
  ngOnInit(): void {

    this.httpClient.get<User>('http://localhost:8080/users/account')
    .subscribe(user => {
      this.user = user;
    
    });
    
  }

  logout() {

    this.authService.removeToken();
    this.router.navigate(['/home']);
  }
}

// http://localhost:8080/bookings/current;