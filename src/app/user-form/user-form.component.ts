import {HttpClient, HttpClientModule } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../Interfaces/user.model';
import { ActivatedRoute, Router, RouterLink} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Role } from '../Interfaces/role.model';
import { combineLatest, delay, switchMap, timer } from 'rxjs';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})

export class UserFormComponent{
  
  users: User[] = [];
  roles = Role; // Esto hará que los valores de la enum estén disponibles en el HTML
  showSpinner = true;

  registerUserForm = new FormGroup({
    id: new FormControl (0),
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    birthdayDate: new FormControl(new Date()),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(8),Validators.maxLength(30)]),
    passwordConfirm: new FormControl('',[Validators.required, Validators.minLength(8),Validators.maxLength(30)]),
    phone: new FormControl(0,[Validators.required, Validators.pattern('^[0-9]{9}$')]),
    role: new FormControl<Role>(Role.USER)
  },
  {validators: this.passwordConfirmValidator}
  );

  constructor(private httpClient : HttpClient,
              private router: Router,  // esto es para navegar
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder
  ){}
 
  passwordConfirmValidator(control: AbstractControl){

    if(control.get('password')?.value === control.get('passwordConfirm')?.value){
      return null;

    }else{
        return{
          'confirmError': true
        }
    }
  } 

  
  save(){
    const user: User = this.registerUserForm.value as unknown as User;
    console.log(user)
      const url = 'http://localhost:8080/users/register';
      timer(500).pipe(
        switchMap(() => this.httpClient.post<User>(url,user))
      ).subscribe(backendUser =>{
        this.router.navigate(['/home']); 
        this.showSpinner = false;
      });    
  } 
}
