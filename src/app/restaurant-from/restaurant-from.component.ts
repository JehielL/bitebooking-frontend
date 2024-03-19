import { Component, OnInit } from '@angular/core';
import { Restaurant, RestaurantType } from '../Interfaces/restaurant.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


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

  restaurantFrom = this.fb.group({
    id: [0],
    name:[''], 
    location: this.fb.group({
      id:[0],
      address:[''],
      city: [''],}),
    phone:[0,[Validators.required,Validators.pattern(('^[0-9]{9}$'))]],
    restaurantType:[RestaurantType.BAR],
    openingTime: [new Date()],
    closingTime:[new Date()],
    averageRating: [0],
    imageUrl: [''],

    //tables: Tables
    status:[false],

  });

  isUpdate: boolean = false;
   
  constructor( private httpClient: HttpClient,
               private fb: FormBuilder,
               private router: Router,
               private activatedRoute: ActivatedRoute){

              }

  ngOnInit(): void {
   
    this.httpClient.get<Restaurant[]>('http://localhost:8080/restaurants').
    subscribe(restaurantBacken => {
      console.log(restaurantBacken);
      
     });

    this.activatedRoute.params.subscribe(params=>{
      const id = params['id'];
      if(!id) return;
      this.httpClient.get<Restaurant>('http://localhost:8080/restaurants/' + id).subscribe(restaurantBacken =>{
        this.restaurantFrom.reset({
          id: restaurantBacken.id,
          name:restaurantBacken.name, 
          location: restaurantBacken.location,  
          phone: restaurantBacken.phone,
          openingTime: restaurantBacken.openingTime ,
          closingTime: restaurantBacken.closingTime,
          averageRating: restaurantBacken.averageRating,
          
          //tables: Tables
          status: restaurantBacken.status,
        });
        this.isUpdate = true;
      });
    });
  }


  save () {
    const restaurantBacken: Restaurant= this.restaurantFrom.value as Restaurant;
    console.log(this.restaurantFrom.value);
    console.log(restaurantBacken);
    
    if (this.isUpdate) {
    const url = 'http://localhost:8080/restaurants/' + restaurantBacken.id;
    this.httpClient.put<Restaurant>(url, restaurantBacken).subscribe(restaurantBacken => {
    this.router.navigate(['/restaurant', restaurantBacken.id, 'detail']);
    });
    
    } else {
    const url = 'http://localhost:8080/restaurants';
    this.httpClient.post<Restaurant>(url, restaurantBacken).subscribe(restaurantBacken => {
    this.router.navigate(['/restaurant', restaurantBacken.id, 'detail']);
    });
    }
  }


}
