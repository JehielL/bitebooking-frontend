import { Component, OnInit } from '@angular/core';
import { User } from '../Interfaces/user.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-avatar-form',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './avatar-form.component.html',
  styleUrl: './avatar-form.component.css'
})
export class AvatarFormComponent implements OnInit {

  photoFile: File | undefined;
  photoPreview: string | undefined;
  user: User | undefined;
  isUpdate: boolean = false;


  constructor(private httpClient: HttpClient,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  userForm = new FormGroup({
    
    
    imgMenu: new FormControl<string>(''),
  
  });

  ngOnInit(): void {
    this.getUser();

    this.activatedRoute.params.subscribe(params => {

      const id = params['id'];
      if (!id) return;

      // EDICION

      this.httpClient.get<User>('http://localhost:8080/users/account' + id).subscribe(user => {
        this.userForm.reset({
          imgMenu: this.user?.imgUser,
        });  
        this.user = user;
        this.isUpdate = true;
     
      });

    });
  }

  getUser() {
    this.httpClient.get<User>('http://localhost:8080/users/account')
      .subscribe(user => this.user = user);
  }

  onFileChange(event: Event) {
    let target = event.target as HTMLInputElement; // este target es el input de tipo file donde se carga el archivo

    if (target.files === null || target.files.length == 0) {
      return; // no se procesa ningún archivo
    }

    this.photoFile = target.files[0]; // guardar el archivo para enviarlo luego en el save()

    // OPCIONAL: PREVISUALIZAR LA IMAGEN POR PANTALLA
    let reader = new FileReader();
    reader.onload = event => this.photoPreview = reader.result as string;
    reader.readAsDataURL(this.photoFile);
  }



  save() {
    if (!this.user) {
      return;
    }

    const user: User = this.userForm.value as User;

    let formData = new FormData();
    

    if (this.photoFile) {
      formData.append("photo", this.photoFile);
    }


    if (this.isUpdate) {
      this.httpClient.put<User>('http://localhost:8080/users/account/avatar/' + this.user?.id, formData)
        .subscribe(user => this.navigateToList());
    } else {
      this.httpClient.post<User>('http://localhost:8080/users/account/avatar/', formData)
        .subscribe(dish => this.navigateToList());
    }

    
   
}

private navigateToList() {
  this.router.navigate(['/users', this.user?.id, 'detail']);
}


}