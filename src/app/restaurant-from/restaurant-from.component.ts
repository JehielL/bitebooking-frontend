import { Component } from '@angular/core';
import { Restaurant, RestaurantType } from '../Interfaces/restaurant.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-restaurant-from',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './restaurant-from.component.html',
  styleUrl: './restaurant-from.component.css'
})
export class RestaurantFromComponent implements OnInit {
  restaurants: Restaurant[] = [];
  restaurantTypes = Object.values(RestaurantType);

  restaurantFrom = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    //location: 
    phone: new FormControl('',[Validators.required,Validators.pattern(('^[0-9]{9}$'))]),
    restaurantType: new FormControl<RestaurantType>(RestaurantType.SPAIN_FOOD),
    openingTime: new FormControl(new Date()),
    closingTime: new FormControl(new Date()),
    averageRating: new FormControl(0),
    //bookings: Booking
    //tables: Tables
    status:new FormControl(false),

  });

  isUpdate: boolean = false;

  constructor( private httpClient: HttpClient){}


  save(){
    const  restaurantFrom: Restaurant ={
      id: this.restaurantFrom.get('id')?.value ?? 0,  
      name: this.restaurantFrom.get('name')?.value ?? '',
      //location: RestaurantLocation;
      phone: this.restaurantFrom.get('phone')?.value ?? '',
      restaurantType:this.restaurantFrom.get('restaurantType')?.value ?? RestaurantType.AFRICAN_FOOD,
      openingTime: this.restaurantFrom.get('openingTime')?.value ?? new Date(),
      closingTime: this.restaurantFrom.get('closingTime')?.value ?? new Date (),
      averageRating: this.restaurantFrom.get('averageRating')?.value ?? 0,
      //bookings: Booking[];
      //tables: Tables[];
      status: this.restaurantFrom.get('status')?.value ?? false,

    }
    console.log(restaurantFrom);

    const url= 'http://localhost:8080/restaurants';
    this.httpClient.post(url,restaurantFrom).subscribe(result => console.log(result));

    //this.restaurantFrom.reset();

  }


}
