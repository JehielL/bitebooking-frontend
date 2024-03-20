import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Booking } from '../Interfaces/booking.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [RouterLink, HttpClientModule],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent implements OnInit {

  booking: Booking | undefined;

  constructor(private activatedRoute : ActivatedRoute){}
  

  ngOnInit(): void {
      console.log("booking details");

      this.activatedRoute.params.subscribe(params => {
      console.log(params)
      console.log(params['id']);

      this.booking = 
    {
    id: 1,
    date: new Date(),
    title: "Reserva Jehiel",
    numUsers: 5,
    price: 300.0,
    observations: "Reserva prueba",
    status: "confirmada",
    discount: 300,
    interior: true,
    numTable: 4,
    totalPrice: 300,
    imageUrl: "",
    //Many to one
    //restaurant: Restaurant;
    //Many to one
    

    }
    

      
  });

}
}


