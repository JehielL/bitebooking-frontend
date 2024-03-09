import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestauratForm } from '../Interfaces/restaurantForm.model';

@Component({
  selector: 'app-register-restaurant',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './register-restaurant.component.html',
  styleUrl: './register-restaurant.component.css'
})
export class RegisterRestaurantComponent {
  registerRestaurantForm = new FormGroup({
    
    firtsName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    birthdayDate: new FormControl(new Date()),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(8),Validators.maxLength(30)]),
    passwordConfirm: new FormControl('',[Validators.required, Validators.minLength(8),Validators.maxLength(30)]),
    phone: new FormControl('',[Validators.required, Validators.pattern('^[0-9]{9}$')]),
    title: new FormControl(''),
    address: new FormControl(""),
    city: new FormControl(""),
    CP: new FormControl("")

    
  },
  {validators: this.passwordConfirmValidator}
  );

  constructor(private httpClient : HttpClient){}
 

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
    const registerRestaurantForm: RestauratForm ={
      firtsName: this.registerRestaurantForm.get('firtsName')?.value ?? '',
      lastName: this.registerRestaurantForm.get('lastName')?.value ?? '',
      birthdayDate: this.registerRestaurantForm.get('birthdayDate')?.value ?? new Date(),
      email: this.registerRestaurantForm.get('email')?.value ?? '',
      password: this.registerRestaurantForm.get('password')?.value ?? '',
      phone: this.registerRestaurantForm.get('phone')?.value ?? '',
      title: this.registerRestaurantForm.get('title')?.value ?? '',
      address: this.registerRestaurantForm.get('address')?.value ?? '',
      cp: this.registerRestaurantForm.get('cp')?.value ?? 0,
      city: ''
    }
    console.log(registerRestaurantForm);

    this.registerRestaurantForm.reset();

  }
  ngOnInit(): void {
   // const url= 'http://localhost:8080/user';
   // this.httpClient.get<User[]>(url).subscribe(registerUserForm=> this.registerUserForm = registerUserForm);
  }
}
