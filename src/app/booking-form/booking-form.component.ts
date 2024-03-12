import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Booking } from '../Interfaces/booking.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent {

  bookingForm = this.fb.group({

    id: null,
    date: [""],
    title: [""],
    price: [0.0],
    numUsers: 0,
    observations: [""],
    status: [""],
    discount: 0,
    interior: false,
    numTable: 0,
    totalPrice: 0,
    imageUrl: ""

  });

  constructor(private fb: FormBuilder, 
    private httpClient: HttpClient, 
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  save() {

    console.log("Guardando booking");

    const id = this.bookingForm.get('id')?.value ?? 0;
    const dateValue = this.bookingForm.get('date')?.value ?? '01-01-2022';
    const date = new Date(dateValue);
    const title = this.bookingForm.get('title')?.value ?? 'titulo por defecto';
    const price = this.bookingForm.get('price')?.value ?? 0.0;
    const numUsers = this.bookingForm.get('numUsers')?.value ?? 5;
    const observations = this.bookingForm.get('observations')?.value ?? 'Observacion por defecto';
    const status = this.bookingForm.get('status')?.value ?? 'Categoria por defecto';
    const discount = this.bookingForm.get('discount')?.value ?? 0;
    const interior = this.bookingForm.get('interior')?.value ?? true;
    const numTable = this.bookingForm.get('numTable')?.value ?? 5;
    const totalPrice = this.bookingForm.get('totalPrice')?.value ?? 320.40;
    const imageUrl = this.bookingForm.get('imageUrl')?.value ?? '';
    //const topics = this.bookingForm.get('menu')?.value ?? [];





    // Crear un objeto utilizando los valores extraidos

    const bookingToSave: Booking = {

      id: id,
      date: date,
      title: title,
      price: price,
      numUsers: numUsers,
      observations: observations,
      status: status,
      discount: discount,
      interior: interior,
      numTable: numTable,
      totalPrice: totalPrice,
      imageUrl: imageUrl


    }

    console.log(bookingToSave)

    const url = 'http://localhost:8080/bookings';

    this.httpClient.post<Booking>(url, bookingToSave).subscribe({
      next: (bookingFromBackend) => this.router.navigate(['/booking', bookingFromBackend.id, 'detail']),
      error: (error) => window.alert("Datos incorrectos")

    });
  }


}



