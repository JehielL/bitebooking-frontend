import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '../Interfaces/user.model';
import Aos from 'aos';

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  templateUrl: './dashboard-user.component.html',
  imports: [HttpClientModule, RouterLink, ReactiveFormsModule],
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {
  photoFile: File | undefined;
  photoPreview: string | undefined;
  users: User | undefined;
  registerUserForm: FormGroup;

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.registerUserForm = this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [''],
      phone: [''],
      imgUser: ['']
    });
  }


  ngOnInit(): void {
    Aos.init();
    // Inicializa el formulario en el método ngOnInit
    this.registerUserForm = this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [''],
      phone: [''],
      imgUser: ['']
    });

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) return;
      this.httpClient.get<User>('http://localhost:8080/user/' + id).subscribe(userbacken => {
        this.registerUserForm.patchValue({
          id: userbacken.id,
          firstName: userbacken.firstName,
          lastName: userbacken.lastName,
          email: userbacken.email,
          phone: userbacken.phone,
          imgUser: userbacken.imgUser
        });
      });
    });
  }

  save(): void {
    const user: User = this.registerUserForm.value as User;
    console.log(user);

    const url = 'http://localhost:8080/user/' + user.id;
    this.httpClient.put<User>(url, user).subscribe(backendUser => {
      this.router.navigate(['/user', backendUser.id, 'detail']);
    });
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement; // este target es el input de tipo file donde se carga el archivo

    if (target.files === null || target.files.length == 0) {
      return; // no se procesa ningún archivo
    }

    this.photoFile = target.files[0]; // guardar el archivo para enviarlo luego en el save()

    // OPCIONAL: PREVISUALIZAR LA IMAGEN POR PANTALLA
    const reader = new FileReader();
    reader.onload = event => this.photoPreview = reader.result as string;
    reader.readAsDataURL(this.photoFile);
  }
}
