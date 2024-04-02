import {HttpClient, HttpClientModule } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role, User } from '../Interfaces/user.model';
import { ActivatedRoute, Router, RouterLink} from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule,RouterLink],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})

export class UserFormComponent  implements OnInit {
  isUpdate: boolean = false; // por defecto estamos en CREAR no en ACTUALIZAR 
  users: User[] = [];
  roles = Role; // Esto hará que los valores de la enum estén disponibles en el HTML

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
  backendUser: any;

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

  ngOnInit(): void { 
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(!id) return;

      this.httpClient.get<User>('http://localhost:8080/user/' + id).subscribe(backendUser => {
        
        this.registerUserForm.reset({
          id: backendUser.id,
          firstName:backendUser.firstName,
          lastName:backendUser.lastName,
          birthdayDate:backendUser.birthdayDate,
          email: backendUser.email,
          password: backendUser.password,
          phone: backendUser.phone,
          role: backendUser.role,
        });
           // marcar boolean true isUpdate para utilizar en  mismo form
        this.isUpdate = true; 

      });
    });
  }
  
  save(){
    const user: User = this.registerUserForm.value as User;
    console.log(user)

    if(this.isUpdate){
      const url = 'http://localhost:8080/user/'+ user.id;
      this.httpClient.put<User>(url,user).subscribe(backendUser =>{
        this.router.navigate(['/user',backendUser.id,'detail']);
      });
    }else{
      const url = 'http://localhost:8080/user';
      this.httpClient.post<User>(url,user).subscribe(backendUser =>{
        this.router.navigate(['/user',backendUser.id,'detail']); 
      });
    }
  }
  compareObjects(o1: any, o2: any): boolean {
    // console.log("Comparando objetos: ", o1, o2);

    if(o1 && o2) {
      return o1.id === o2.id;
    }
    return o1 === o2;
  }
}
