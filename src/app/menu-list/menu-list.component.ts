import {  HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Menu } from '../Interfaces/menu.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [RouterLink, HttpClientModule],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css'
})
export class MenuListComponent {

  menus: Menu[] = []; 

  constructor(private httpClient: HttpClient){}
  
  
  ngOnInit(): void {
    
    this.httpClient.get<Menu[]>('http://localhost:8080/menus')
    .subscribe(menus => this.menus = menus);
  }

}
