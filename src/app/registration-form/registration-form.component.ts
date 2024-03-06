import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { User } from '../Interfaces/user.model';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent {

  registerForm = this.fb.group({

    id: [0],
    firtsName: [""],
    lastName: [""],
    birthdayDate: [new Date()],
    email: [""],
    password: [""],
    phone: [0]
    //role:[[]]

  });

  constructor( private fb:FormBuilder){};

  save(){

    console.log("Guardado register");

    const id = this.registerForm.get("id")?.value ?? 0;
    const firtsName = this.registerForm.get("firtsName")?.value ?? "";
    const lastName = this.registerForm.get("lastName")?.value ??  "";
    const birthdayDate = this.registerForm.get("birthday")?.value ?? new Date();
    const email = this.registerForm.get("email")?.value ?? "";
    const password = this.registerForm.get("pasword")?.value ?? ("");
    const phone = this.registerForm.get("phone")?.value ?? 0;
    //const role = this.registerForm.get("firtsName")?.value ?? [];

    //crear un objeto con los valores obtenidos
    const registerToSave : User={
      id: id,
      firtsName: firtsName,
      lastName: lastName,
      birthdayDate: birthdayDate,
      email: email,
      password: password,
      phone: phone
      //role: role
    };
    console.log(registerToSave);

    //const.httpClient.post<User>('http://localhost:8080/books',registerToSave).subscribe(registerToSave => console.log(registerToSave));
  }
}
