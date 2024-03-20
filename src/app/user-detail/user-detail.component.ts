import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../Interfaces/user.model';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [RouterLink, HttpClientModule, DatePipe],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
  user: User[] =[];
  

}
