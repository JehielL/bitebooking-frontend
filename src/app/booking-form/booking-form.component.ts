import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Booking } from '../Interfaces/booking.model';
<<<<<<< Updated upstream
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
=======
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
>>>>>>> Stashed changes

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterLink, CommonModule],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent implements OnInit {

  showSuccessMessage: boolean = false;

  bookingForm = this.fb.group({

    id: [0],
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
    private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {

      this.activatedRoute.params.subscribe(params => {
        
        const id = params['id'];
        if(!id) return;
        
        this.httpClient.get<Booking>('http://localhost:8080' + id)
        .subscribe(bookingFromBackend => {
          this.bookingForm.reset({
            id: bookingFromBackend.id,
            title: bookingFromBackend.title,

          });

        });
      });
    }
    

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
      next: (booking) => {
        console.log(booking);
        this.showSuccessMessage = true;
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      },
      error: (error) => {
        console.error('Error al enviar el formulario:', error);
      }
    });
    
    


    });
  }


}



