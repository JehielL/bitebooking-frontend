import { DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '../Interfaces/user.model';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [RouterLink, HttpClientModule, DatePipe],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit{
  user: User | undefined;

  constructor( private activatedRoute: ActivatedRoute,
               private httpClient: HttpClient){}


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      const id = params['id'];
      if(!id) return;

      const url = 'http://localhost:8080/user-detail' + id; 
      this.httpClient.get<User>(url).subscribe(user =>this.user = user);
    });


  }
  

}
