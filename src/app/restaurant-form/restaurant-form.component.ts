import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../Interfaces/restaurant.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RestaurantType } from '../Interfaces/restaurantType.model';
import { __values } from 'tslib';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';



@Component({
  selector: 'app-restaurant-from',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,DatePipe],
  templateUrl: './restaurant-form.component.html',
  styleUrl: './restaurant-form.component.css'
})
export class RestaurantFromComponent implements OnInit {
  
  restaurantFrom = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    phone: new FormControl(''), 
    restaurantTypes:new FormControl(RestaurantType.BAR),
    description: new FormControl(''),
    openingTime: new FormControl('', [Validators.required, Validators.pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)]),
    closingTime: new FormControl('', [Validators.required, Validators.pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)]), 
    imageUrl: new FormControl(),
    city:new FormControl(''),
    address:new FormControl(''),
    number:new FormControl(''),
    postalCode:new FormControl(''),
    averageRating: new FormControl(0)
  });
  
  restaurants: Restaurant |undefined;
  isUpdate: boolean = false;
  isAdmin = false;
  isLoggedin = false;
  photoFile: File | undefined;
  photoPreview: string | undefined;

  constructor( private httpClient: HttpClient,
               private router: Router,
               private activatedRoute: ActivatedRoute,
                private authService: AuthenticationService){
                this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
                this.authService.isLoggedin.subscribe(isLoggedin => this.isLoggedin = isLoggedin);
                

              }

  ngOnInit(): void {
   
    this.httpClient.get<Restaurant[]>('http://localhost:8080/restaurant')
    .subscribe(restaurantBacken => restaurantBacken = restaurantBacken );

    this.activatedRoute.params.subscribe(params=>{
      const id = params['id'];
      if(!id) return;



      this.httpClient.get<Restaurant>('http://localhost:8080/restaurant/' + id).subscribe(restaurantBacken =>{
        this.restaurantFrom.reset(restaurantBacken);
        this.isUpdate = true;
        this.restaurants = restaurantBacken;
        
      });
    });
  }


  onFileChange(event: Event) {
  console.log(event);
    let target = event.target as HTMLInputElement; // este target es el input de tipo file donde se carga el archivo

    if(target.files === null || target.files.length == 0){
      return; // no se procesa ningún archivo
    }
    this.photoFile = target.files[0]; // guardar el archivo para enviarlo luego en el save()  

    let reader = new FileReader();
    reader.onload = event => this.photoPreview = reader.result as string;
    reader.readAsDataURL(this.photoFile); 
  }


  save () {
  
    let formData = new FormData();
    formData.append('id', this.restaurantFrom.get('id')?.value?.toString() ?? '0');
    formData.append('name', this.restaurantFrom.get('name')?.value ?? '');
    formData.append('restaurantTypes', this.restaurantFrom.get('restaurantTypes')?.value?.toString() ?? '');
    formData.append('phone', this.restaurantFrom.get('phone')?.value ?? '0');
    formData.append('openingTime', this.restaurantFrom.get('openingTime')?.value ?? '');
    formData.append('closingTime', this.restaurantFrom.get('closingTime')?.value ?? '');
    formData.append('imageUrl', this.restaurantFrom.get('imageUrl')?.value ?? '');
    formData.append('city', this.restaurantFrom.get('city')?.value ?? '');
    formData.append('address', this.restaurantFrom.get('address')?.value ?? '');
    formData.append('number', this.restaurantFrom.get('number')?.value ?? '');
    formData.append('postalCode', this.restaurantFrom.get('postalCode')?.value ?? '');
    formData.append('averageRating', this.restaurantFrom.get('averageRating')?.value?.toString() ?? '');
    
    if(this.photoFile) {
      formData.append("photo", this.photoFile);
    }

    
    
    if (this.isUpdate) {
    
    this.httpClient.put<Restaurant>('http://localhost:8080/restaurant/'+ this.restaurants?.id, formData).subscribe(restaurantBacken =>
    this.router.navigate(['/restaurant', restaurantBacken.id, 'detail']));
    
    }else {
    
    this.httpClient.post<Restaurant>('http://localhost:8080/restaurant', formData).subscribe(restaurantBacken =>
    this.router.navigate(['/restaurant', restaurantBacken.id, 'detail']));
    }
  }

  

  compareObjects(o1: any, o2: any): boolean{

    if (o1 && o2){
      return o1.id == o2.id;
    }

    return o1 == o2;
  }

}
