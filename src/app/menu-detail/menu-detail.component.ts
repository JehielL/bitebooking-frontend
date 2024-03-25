import { DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbAccordionModule, NgbAlert, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { Menu } from '../Interfaces/menu.model';

@Component({
  selector: 'app-menu-detail',
  standalone: true,
  imports: [HttpClientModule, RouterLink,DatePipe, NgbAccordionModule, NgbAlert],
  templateUrl: './menu-detail.component.html',
  styleUrl: './menu-detail.component.css'
})
export class MenuDetailComponent implements OnInit{

  menu: Menu | undefined;
  menus: Menu[] = []; 
  
  showDeleteMenuMessage: boolean = false;

  constructor(

    private activedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) { 

    
  }
  
  ngOnInit(): void {
    
    this.activedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) return;
      const url = 'http://localhost:8080/menus/' + id;
      this.httpClient.get<Menu>(url).subscribe(m => this.menu = m);
    });
    this.loadMenus();
  }

  delete(menu: Menu) {
    const url = 'http://localhost:8080/menus/' + menu.id;
    this.httpClient.delete(url).subscribe(response => {
      this.menu = undefined;
      this.showDeleteMenuMessage = true;
    });
  }

  private loadMenus() { 
    const url = 'http://localhost:8080/menus';
    this.httpClient.get<Menu[]>(url).subscribe(menus => this.menus = menus);
  }

  hideDeletedMenuMessage() {
    this.showDeleteMenuMessage = false;
  }

}
