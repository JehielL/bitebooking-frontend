import { Component, OnInit } from '@angular/core';
import { User } from '../Interfaces/user.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.css'
})
export class AccountFormComponent implements OnInit{

  user: User | undefined;
  userForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    
  });

  constructor(private httpClient: HttpClient){

  }

  ngOnInit(): void {
    
  
   
    this.httpClient.get<User>('http://localhost:8080/users/account')
    .subscribe(user => {
      this.user = user;
      this.userForm.reset(user);
    });

    
    

  }

  save(){

    if(!this.user) {
      return;
    }

    this.user.firstName = this.userForm.get('firstName')?.value ?? '';
    this.user.lastName = this.userForm.get('lastName')?.value ?? '';
    this.httpClient.put<User>('http://localhost:8080/users/account', this.user)
    .subscribe(user => this.user = user);
  }

}
