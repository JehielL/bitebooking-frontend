import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {  RouterLink } from '@angular/router';
import { User} from '../Interfaces/user.model';
import AOS from 'aos';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{

  users: User[] = [];
  collapsed =true;
  resultadosBusqueda: User[] = [];
  authService: AuthenticationService | undefined;
  searchTerm: string = '';
  maxResultados: number = 5; 
  minResultados: number = 5;
  isAdmin = false;
  isRestaurant = false;

  constructor(private httpClient: HttpClient){}
  puedeMostrarMas: boolean = false;
  
  ngOnInit(): void {

    this.loadUsers();
    AOS.init();
  }
  loadUsers(): void {
    const apiUrl = 'http://localhost:8080/user';
    this.httpClient.get<User[]>(apiUrl)
    .subscribe(users => this.users = users);
      this.users.filter(users =>
      users.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }
  buscar(termino: string): void {
    this.searchTerm = termino;
    this.filtrarResultados();
  }

  filtrarResultados(): void {
    const resultadosFiltrados = this.searchTerm
      ? this.users.filter(users =>
          users.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()))
      : [];
    this.puedeMostrarMas = resultadosFiltrados.length > this.maxResultados;
    this.resultadosBusqueda = resultadosFiltrados.slice(0, this.maxResultados);
  }

  mostrarMas(): void {
    this.maxResultados += 5;
    this.filtrarResultados();
  }
  mostrarMenos(): void {
    this.maxResultados = Math.max(this.minResultados, this.maxResultados - 5);
    this.filtrarResultados();
  }

  highlightSearchTerm(name: string, searchTerm: string): string {
    if (!searchTerm) return name;

    const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');
    return name.replace(regex, `$1`);
  } 
}

