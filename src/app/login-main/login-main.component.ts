import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Login } from '../Interfaces/login.dto';
import { Token } from '../Interfaces/token.dto';
import { AuthenticationService } from '../services/authentication.service';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';


@Component({
    selector: 'app-login-main',
    standalone: true,
    templateUrl: './login-main.component.html',
    styleUrl: './login-main.component.css',
    imports: [RouterLink, FooterComponent, ReactiveFormsModule]
})
export class LoginMainComponent {
  errorMessage: string = '';

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
          };
        
          this.httpClient.post<Token>('http://localhost:8080/users/login', login).subscribe({
            next: (response) => {
              console.log(response.token);
              this.authService.saveToken(response.token);
              this.router.navigate(['/home']);
            },
            error: (err) => {
              if (err.status === 403) {
                this.errorMessage = 'El usuario o la contraseña son incorrectos';
              }
            }
          });
        }
        
        
    }
    