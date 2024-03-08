import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {
  registerUserForm = new FormGroup({
    id: new FormControl(0),
    firtsName: new FormControl(''),
    lastName: new FormControl(''),
    birthdayDate: new FormControl(new Date()),
    email: new FormControl(''),
    password: new FormControl('')
    

  });

  constructor(private httpClient: HttpClient){}

  save(){

  }
}
