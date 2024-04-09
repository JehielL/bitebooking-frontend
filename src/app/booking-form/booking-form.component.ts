import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Booking } from '../Interfaces/booking.model';
import { ActivatedRoute, Router } from '@angular/router';

import { Menu } from '../Interfaces/menu.model';
import { Restaurant } from '../Interfaces/restaurant.model';
import { CurrencyPipe, DatePipe } from '@angular/common';


@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe,DatePipe],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent implements OnInit {

  booking: Booking | undefined;
  restaurant: Restaurant | undefined;
   vipRoom = 0; // precio salon vip.
  isUpdate: boolean = false; // por defecto estamos en CREAR no en ACTUALIZAR
  menus: Menu[] = []; // array de autores para asociar un autor al libro
  totalPrice: any;
  extraPrice: any;
  extraService: any;
  

  bookingForm = new FormGroup({
    id: new FormControl<number>(0),
    createDate: new FormControl<Date>(new Date()),
    title: new FormControl<string>(''),
    numUsers: new FormControl<number>(0),
    observations: new FormControl<string>(''),
    status: new FormControl<boolean>(true),
    discount: new FormControl<number>(0),
    interior: new FormControl<boolean>(true),
    numTable: new FormControl<number>(0),
    menu: new FormControl(),
    restaurant: new FormControl(),
    isPremium: new FormControl<boolean>(false),
    extraService: new FormControl<string>(''),
  });

  
 
  
  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  showFinishMessage = false;

  ngOnInit(): void {

  
   
    

    this.activatedRoute.params.subscribe(params => {
      
      const id = params['id'];
      if (!id) return;

      
this.httpClient.get<Restaurant>('http://localhost:8080/restaurant/' + id)
      .subscribe(restaurants => this.restaurant = restaurants);


      this.httpClient.get<Booking>('http://localhost:8080/bookings/' + id).subscribe(bookingFromBackend => {
        // cargar el libro obtenido en el formulario bookForm
        this.bookingForm.reset({
          id: bookingFromBackend.id,
          createDate: bookingFromBackend.createDate,
          title: bookingFromBackend.title,
          numUsers: bookingFromBackend.numUsers,
          observations: bookingFromBackend.observations,
          status: bookingFromBackend.status,
          discount: bookingFromBackend.discount,
          interior: bookingFromBackend.interior,
          numTable: bookingFromBackend.numTable,
          menu: bookingFromBackend.menu,
          restaurant: bookingFromBackend.restaurant,
          isPremium: bookingFromBackend.isPremium,
          extraService: bookingFromBackend.extraService,
         
      
        });

        // marcar boolean true isUpdate
        this.isUpdate = true;

      });
    });
    
  }

  compareObjects(o1: any, o2: any): boolean{

    if (o1 && o2){
      return o1.id == o2.id;
    }

    return o1 == o2;
  }
 

  save() {
   
    const booking: Booking = this.bookingForm.value as Booking;


    if (this.isUpdate) {
      const url = 'http://localhost:8080/bookings/' + booking.id;
      this.httpClient.put<Booking>(url, booking).subscribe(bookingFromBackend => {
        this.router.navigate(['/bookings', bookingFromBackend.id, 'detail']);
      });

    } else {
      const url = 'http://localhost:8080/bookings';
      this.httpClient.post<Booking>(url, booking).subscribe(bookingFromBackend => {
        this.router.navigate(['/bookings', bookingFromBackend.id, 'detail']);
      });
    }

    
      
  }; 
}
