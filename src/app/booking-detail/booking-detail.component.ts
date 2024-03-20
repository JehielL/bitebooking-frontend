import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Booking } from '../Interfaces/booking.model';
import { NgbAccordionModule, NgbAlertModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [RouterLink, NgbAccordionModule, NgbAlertModule, NgbCarouselModule, HttpClientModule],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.css',
})
export class BookingDetailComponent implements OnInit {

  booking: Booking | undefined;

  images: string[] = [
    "https://offloadmedia.feverup.com/madridsecreto.co/wp-content/uploads/2022/10/27170526/Smoked-Room-Madrid-Spain-Astet-Studio-2-1-1024x683.jpg",
    "https://cdn.sortiraparis.com/images/80/100789/834071-too-restaurant-too-hotel-paris-photos-menu-entrees.jpg",
    "https://media.traveler.es/photos/634ec2c26d82486fc0d1774a/16:9/w_2048,h_1152,c_limit/Asia-%201111%20ONES%20(Hong%20Kong,%20China),%20disen%CC%83ado%20por%20M.R.%20STUDIO%20.jpeg"
  ]

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) { }


  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];

      if (!id) return;

      const url = 'http://localhost:8080/bookings/' + id;

      this.httpClient.get<Booking>(url).subscribe(b => this.booking = b);


    });

  }

}
