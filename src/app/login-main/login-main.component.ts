import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Login } from '../Interfaces/login.dto';
import { Token } from '../Interfaces/token.dto';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';


@Component({
    selector: 'app-login-main',
    standalone: true,
    templateUrl: './login-main.component.html',
    styleUrl: './login-main.component.css',
    imports: [RouterLink, FooterComponent, ReactiveFormsModule, HttpClientModule]
})
export class LoginMainComponent {


    loginForm = this.fb.group({
        email: [''],
        password: ['']
      });
    
      constructor(private fb: FormBuilder, 
        private httpClient: HttpClient,
        private authService: AuthenticationService,
        private router: Router) {}
    
      save() {
        const login: Login = {
          email: this.loginForm.get('email')?.value ?? '',
          password: this.loginForm.get('password')?.value ?? '',
        }
        console.log(login);
    
        const url = 'http://localhost:8080/users/login';
        this.httpClient.post<Token>(url, login).subscribe(response => {
          console.log(response.token);
          this.authService.saveToken(response.token);
          this.router.navigate(['/menus']);
        });
    
    
      }
    }
    