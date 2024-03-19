import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserForm } from '../Interfaces/usuarioForm.model';
import { __param } from 'tslib';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{

  users: UserForm[] = [];
  searchTerm: string = '';
  router: any;
 
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    const url = 'http://localhost:8080/user';
    this.httpClient.get<UserForm[]>(url).subscribe(users => this.users = users);
  }

  searchUsers() {
    if (this.searchTerm.trim() === '') {
      // Si el término de búsqueda está vacío, cargar todos los usuarios
      this.loadUsers();
    } else {
      // Si hay un término de búsqueda, realizar la búsqueda
      const url = `http://localhost:8080/user/search/${this.searchTerm}`;
      this.httpClient.get<UserForm[]>(url).subscribe(
        users => {
          if (users.length === 0) {
            // Si no se encontraron usuarios, redirigir a la página 'not-found'
            this.router.navigate(['/not-found']);
          } else {
            // Si se encontraron usuarios, actualizar la lista de usuarios
            this.users = users;
          }
        },
        error => {
          // Si ocurre un error durante la solicitud HTTP, redirigir a la página 'not-found'
          this.router.navigate(['/not-found']);

        }
      );
    }
  }

  resetSearch() {
    // Restablecer la búsqueda y cargar todos los usuarios
    this.searchTerm = '';
    this.loadUsers();
  }

  delete(user: UserForm) {
    const url = 'http://localhost:8080/user/' + user.id;
    this.httpClient.delete(url).subscribe(response => {
      // Volver a cargar los usuarios después de eliminar uno
      this.loadUsers();
    })
  }



}

