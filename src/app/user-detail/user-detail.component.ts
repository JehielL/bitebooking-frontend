import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserForm } from '../Interfaces/usuarioForm.model';
import { NgbAlert, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [RouterLink, HttpClientModule, ReactiveFormsModule, NgbAlertModule  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {

  users: UserForm | undefined;

  images: string[] = [

  ]
  
  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute){}


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];

      if (!id) return;


    const url = 'http://localhost:8080/user/' + id;

    this.httpClient.get<UserForm>(url).subscribe(b => this.users = b);
    })
  }

  

}
