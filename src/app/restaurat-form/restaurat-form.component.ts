import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-restaurat-form',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule],
  templateUrl: './restaurat-form.component.html',
  styleUrl: './restaurat-form.component.css'
})
export class RestauratFormComponent {
restFrom = this.fb.group({
  id: [0],
  name: [''],
  phone: [''],
  openingTime: [new Date()],
  closingTime: [new Date()],
  averageRating: [0],
  status: [false],
  address: [''],
  city: [''],
  cp: [''],
});


}
