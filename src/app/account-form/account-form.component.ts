import { Component, OnInit, TemplateRef } from '@angular/core';
import { User } from '../Interfaces/user.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AvatarFormComponent } from '../avatar-form/avatar-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, AvatarFormComponent],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.css'
})
export class AccountFormComponent implements OnInit {

  user: User | undefined;
  isAdmin = false;
  userForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    city: new FormControl(),
    aboutMe: new FormControl(),
    photo: new FormControl()
  });
  photoFile: File | undefined;
  photoPreview: string | undefined;

  constructor(private httpClient: HttpClient,
              private authService: AuthenticationService,
              private modalService: NgbModal,
              private router: Router) {
    this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
  }

  ngOnInit(): void {
    this.httpClient.get<User>('http://localhost:8080/users/account')
      .subscribe(user => {
        this.user = user;
        this.userForm.patchValue(user); // Utilizamos patchValue para establecer los valores del formulario
      });
  }

  save() {
    if (!this.user) {
      return;
    }

    this.user.firstName = this.userForm.get('firstName')?.value ?? '';
    this.user.lastName = this.userForm.get('lastName')?.value ?? '';
    this.user.email = this.userForm.get('email')?.value ?? '';
    this.user.phone = this.userForm.get('phone')?.value ?? '';
    this.user.city = this.userForm.get('city')?.value ?? '';
    this.user.aboutMe = this.userForm.get('aboutMe')?.value ?? '';

    // Si hay un archivo seleccionado, se guarda la nueva foto
    if (this.photoFile) {
      this.updateProfile();
    } else {
      this.httpClient.put<User>('http://localhost:8080/users/account', this.user)
        .subscribe(updatedUser => {
          this.user = updatedUser;
          this.router.navigateByUrl('/home');
        });
    }
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement; // este target es el input de tipo file donde se carga el archivo

    if (target.files === null || target.files.length === 0) {
      return; // no se procesa ningún archivo
    }

    this.photoFile = target.files[0]; // guardar el archivo para enviarlo luego en el save()

    // OPCIONAL: PREVISUALIZAR LA IMAGEN POR PANTALLA
    const reader = new FileReader();
    reader.onload = event => this.photoPreview = reader.result as string;
    reader.readAsDataURL(this.photoFile);
  }

  openModal(modal: TemplateRef<any>, user: User) {
    this.user = user; // Asignar el usuario recibido al usuario local

    this.modalService.open(modal, {
      centered: true
    }).result.then((result) => {
      if (result === 'Aceptar') {
        this.updateProfile();
      }
    }, (reason) => {
      console.log(`Modal cerrado: ${reason}`);
    });
  }

  updateProfile() {
    if (!this.photoFile) {
      return;
    }

    const formData = new FormData();
    formData.append('photo', this.photoFile);

    const url = 'http://localhost:8080/users/account/avatar';
    this.httpClient.post<User>(url, formData)
      .subscribe(updatedUser => {
        this.user = updatedUser;
        this.httpClient.put<User>('http://localhost:8080/users/account', this.user)
          .subscribe(() => {
            this.router.navigateByUrl('/home');
            if(this.user?.imgUser)
              this.authService.avatarUrl.next(this.user?.imgUser);
            // TODO actualiar el avatrar en el authentication service 
            // authenticationService.updateAvatar(this.user?.avatar);
          });
      });
  }
}
