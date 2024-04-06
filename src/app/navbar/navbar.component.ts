import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgbDropdownModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  title = 'frontend'
  isLoggedin = false;
  collapsed = true;
  userEmail = '';
  isAdmin = false;

  constructor(private authService: AuthenticationService,
    private router: Router){

    this.authService.isLoggedin.subscribe(isLoggedin => this.isLoggedin = isLoggedin);
    this.authService.userEmail.subscribe(userEmail => this.userEmail = userEmail);
    this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
  }

  logout() {

    this.authService.removeToken();
    this.router.navigate(['user/login']);
  }
}
