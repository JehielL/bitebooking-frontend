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

  });
  update: any;


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
        this.userForm.reset(user);
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
    this.httpClient.put<User>('http://localhost:8080/users/account', this.user)
    .subscribe(user => {
      this.user = user;
      this.router.navigateByUrl('/home');
    });
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
    throw new Error('Method not implemented.');
  }

}
