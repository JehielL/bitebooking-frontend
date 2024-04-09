import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../Interfaces/restaurant.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RestaurantType } from '../Interfaces/restaurantType.model';
import { RestaurantLocation } from '../Interfaces/restaurantLocation.model';
import { __values } from 'tslib';


@Component({
  selector: 'app-restaurant-from',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './restaurant-from.component.html',
  styleUrl: './restaurant-from.component.css'
})
export class RestaurantFromComponent implements OnInit {
  restaurants: Restaurant[] = [];
  restaurantTypes = Object.values(RestaurantType);

  restaurantFrom = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    restaurantTypes:new FormControl(RestaurantType.BAR),
    imageUrl: new FormControl(),
    //location: new FormControl(),
    location:this.fb.group({
      id:[0],
      address:[''],
      city: [''],
      postalCode:[''],
      number:[0]
    }),
    phone: new FormControl(''), 
    openingTime: new FormControl(new Date),
    closingTime: new FormControl(new Date),  
    status: new FormControl(false)
  });

  isUpdate: boolean = false;
   
  constructor( private httpClient: HttpClient,
               private fb: FormBuilder,
               private router: Router,
               private activatedRoute: ActivatedRoute){

              }

  ngOnInit(): void {
   
    this.httpClient.get<Restaurant[]>('http://localhost:8080/restaurant').
    subscribe(restaurantBacken => {
      console.log(restaurantBacken);
      
     });

    this.activatedRoute.params.subscribe(params=>{
      const id = params['id'];
      if(!id) return;
      this.httpClient.get<Restaurant>('http://localhost:8080/restaurant/' + id).subscribe(restaurantBacken =>{
        this.restaurantFrom.reset({
          id: restaurantBacken.id,
          name:restaurantBacken.name, 
          restaurantTypes:restaurantBacken.restaurantType,
          location: restaurantBacken.location,  
          imageUrl: restaurantBacken.imageUrl,  
          phone: restaurantBacken.phone,
          openingTime: restaurantBacken.openingTime ,
          closingTime: restaurantBacken.closingTime,
          status: restaurantBacken.status,
        });
        this.isUpdate = true;
      });
    });
  }


  save () {
    const restaurantBacken: Restaurant= this.restaurantFrom.value as Restaurant;
    //const restaurantBacken: Restaurant = {this.restaurantFrom.value,restaurantTypes: RestaurantType[this.restaurantFrom.value.restaurantTypes]};
    console.log(this.restaurantFrom.value);
    
    if (this.isUpdate) {
    const url = 'http://localhost:8080/restaurant/' + restaurantBacken.id;
    this.httpClient.put<Restaurant>(url, restaurantBacken).subscribe(restaurantBacken => {
    this.router.navigate(['/restaurant/', restaurantBacken.id, 'detail']);
    });
    
    } else {
    const url = 'http://localhost:8080/restaurant';
    this.httpClient.post<Restaurant>(url, restaurantBacken).subscribe(restaurantBacken => {
    this.router.navigate(['/restaurant/', restaurantBacken.id, 'detail']);
    });
    }
  }


}
