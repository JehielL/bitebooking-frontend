import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute,  RouterLink } from '@angular/router';
import { User } from '../Interfaces/user.model';

import Aos from 'aos';

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.css'
})

export class DashboardUserComponent implements OnInit {
  users: User | undefined;
  images: string[] = []
  registerUserForm: any;
  photoFile: File | undefined;
  photoPreview: string | undefined;
  router: any;

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    Aos.init();
    this.httpClient.get<User>('http://localhost:8080/user').subscribe(userbacken => {
      console.log(userbacken);
    });

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) return;
      this.httpClient.get<User>('http://localhost:8080/user/' + id).subscribe(userbacken => {
        this.registerUserForm.reset({
          id: userbacken.id,
          firstname: userbacken.firtsName,
          lastname: userbacken.lastName,
          email: userbacken.email,
          phone: userbacken.phone,
          imgUser: userbacken.imgUser
        });

      });
    });
  }

  save() {
    const user: User = this.registerUserForm.value as unknown as User;
    console.log(user);

    const url = 'http://localhost:8080/user/' + user.id;
    this.httpClient.put<User>(url, user).subscribe(backendUser => {
      this.router.navigate(['/user', backendUser.id, 'detail']);
    });
  };

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
}

