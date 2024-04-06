import {  HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Menu } from '../Interfaces/menu.model';
import { RouterLink } from '@angular/router';
import { RestaurantType } from '../Interfaces/restaurantType.model';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [RouterLink, HttpClientModule],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css'
})
export class MenuListComponent {
  menus: Menu[] = [];
  restaurantType = RestaurantType;
  resultadosBusqueda: Menu[] = [];
  searchTerm: string = '';
  maxResultados: number = 5; 
  minResultados: number = 5;

  constructor(private httpClient: HttpClient){}
  puedeMostrarMas: boolean = false;
  
  ngOnInit(): void {
    
    this.httpClient.get<Menu[]>('http://localhost:8080/menus')
    .subscribe(menus => this.menus = menus);
    this.menus.filter(menu =>
      menu.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }
  buscar(termino: string): void {
    this.searchTerm = termino;
    this.filtrarResultados();
  }

  filtrarResultados(): void {
    const resultadosFiltrados = this.searchTerm
      ? this.menus.filter(menu =>
          menu.title.toLowerCase().includes(this.searchTerm.toLowerCase()))
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
    return name.replace(regex, `<mark>$1</mark>`);
  }
  
  getRestaurantType(type?: RestaurantType): string {
    if (type === undefined) return 'No especificado';
    const typeAsString: string = RestaurantType[type as unknown as keyof typeof RestaurantType];
    return typeAsString;
  }
}
