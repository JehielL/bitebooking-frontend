import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Role, User } from '../Interfaces/user.model';

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule, HttpClientModule,RouterLink],
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.css'
})

export class DashboardUserComponent  implements OnInit {
[x: string]: any;
  user: any
  users: User[] = [];
  photoFile: File | undefined;
  photoPreview: string | undefined;
  roles = Role; // Esto hará que los valores de la enum estén disponibles en el HTML

  registerUserForm = new FormGroup({
    id: new FormControl (0),
    firtsName: new FormControl('',Validators.required),
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
  router: any;


  constructor(private httpClient : HttpClient,

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
          firtsName:backendUser.firstName,
          lastName:backendUser.lastName,
          birthdayDate:backendUser.birthdayDate,
          email: backendUser.email,
          password: backendUser.password,
          phone: backendUser.phone,
          role: backendUser.role,
        });
 

      });
    });
  }

  save(){
    const user: User = this.registerUserForm.value as unknown as User;
    console.log(user)

    
      const url = 'http://localhost:8080/user/'+ user.id;
      this.httpClient.put<User>(url,user).subscribe(backendUser =>{
        this.router.navigate(['/user',backendUser.id,'detail']);
      });
    
  }

  onFileChange(event: Event) {
    let target = event.target as HTMLInputElement; // este target es el input de tipo file donde se carga el archivo

    if(target.files === null || target.files.length == 0){
      return; // no se procesa ningún archivo
    }

    this.photoFile = target.files[0]; // guardar el archivo para enviarlo luego en el save()

    // OPCIONAL: PREVISUALIZAR LA IMAGEN POR PANTALLA
    let reader = new FileReader();
    reader.onload = event => this.photoPreview = reader.result as string;
    reader.readAsDataURL(this.photoFile);
  }


}
