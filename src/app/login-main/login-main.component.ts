import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { login } from '../Interfaces/login.model';
import { log } from 'console';
import { response } from 'express';



@Component({
    selector: 'app-login-main',
    standalone: true,
    templateUrl: './login-main.component.html',
    styleUrl: './login-main.component.css',
    imports: [RouterLink, FooterComponent, ReactiveFormsModule,HttpClientModule]
})
export class LoginMainComponent {


 loginform = this.fb.group({    
 
    username: ['', [Validators.required]],
    password: ['']

 });

 constructor(private fb: FormBuilder, private httpClient: HttpClient) {}

 save() {

    const login: login = {
        username: this.loginform.get('username')?.value ?? '',        
        password: this.loginform.get('password')?.value ?? '',
    }
    
console.log(login);
const url = 'http://localhost:8080/auth/login';
this.httpClient.post<any>(url, login).subscribe(response => console.log(response));
}
}
