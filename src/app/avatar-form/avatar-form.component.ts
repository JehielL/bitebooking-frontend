import { Component, OnInit } from '@angular/core';
import { User } from '../Interfaces/user.model';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-avatar-form',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './avatar-form.component.html',
  styleUrl: './avatar-form.component.css'
})
export class AvatarFormComponent implements OnInit{

  photoFile: File | undefined;
  photoPreview: string | undefined;
  user: User | undefined;

  constructor(private httpClient: HttpClient){

  }

  ngOnInit(): void {

    this.httpClient.get<User>('http://localhost:8080/users/account')
    .subscribe(user => this.user = user);

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

  save(){

    if(!this.photoFile) {
      return;
    }

    let formData = new FormData();
    formData.append('photo', this.photoFile);

    const url = 'http://localhost:8080/users/account/avatar';
    this.httpClient.post<User>(url, formData)
    .subscribe(user => this.user = user)
  }



}