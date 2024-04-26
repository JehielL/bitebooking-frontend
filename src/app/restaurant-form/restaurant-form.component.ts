import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../Interfaces/restaurant.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RestaurantType } from '../Interfaces/restaurantType.model';
import { __values } from 'tslib';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { combineLatest, delay, switchMap, timer } from 'rxjs';



@Component({
  selector: 'app-restaurant-from',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,DatePipe],
  templateUrl: './restaurant-form.component.html',
  styleUrl: './restaurant-form.component.css'
})
export class RestaurantFormComponent implements OnInit {
  restaurantForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required), 
    restaurantType: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    openingTime: new FormControl('', Validators.required),
    closingTime: new FormControl('', Validators.required), 
    imageUrl: new FormControl(''),
    city: new FormControl(''),
    address: new FormControl(''),
    number: new FormControl(''),
    postalCode: new FormControl(''),
    averageRating: new FormControl(0)
  });

  restaurantTypes: { key: string, value: string }[] = [];
  restaurants: Restaurant |undefined;
  isUpdate: boolean = false;
  isAdmin = false;
  isLoggedin = false;
  photoFile: File | undefined;
  photoPreview: string | undefined;
  showSpinner = true;

  constructor( private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
     private authService: AuthenticationService){
     this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
     this.authService.isLoggedin.subscribe(isLoggedin => this.isLoggedin = isLoggedin);
     

   }

  ngOnInit(): void {
    this.restaurantTypes = Object.keys(RestaurantType).map(key => ({
      key: key,
      value: RestaurantType[key as keyof typeof RestaurantType]
    }));

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
          this.isUpdate = true;
          this.loadRestaurant(id);
      } else {
          this.isUpdate = false;
      }
  });
  
  }

  loadRestaurant(id: string): void {
    timer(500).pipe(
      switchMap(() => this.httpClient.get<Restaurant>(`http://localhost:8080/restaurant/${id}`))).subscribe(restaurant => {
      this.restaurantForm.patchValue(restaurant);
      this.showSpinner = false;
    });
  }


  onFileChange(event: Event) {
  console.log(event);
    let target = event.target as HTMLInputElement; 

    if(target.files === null || target.files.length == 0){
      return;
    }
    this.photoFile = target.files[0]; 

    let reader = new FileReader();
    reader.onload = event => this.photoPreview = reader.result as string;
    reader.readAsDataURL(this.photoFile); 
  }


  save() {
    const formData = new FormData();
    formData.append('name', this.restaurantForm.get('name')?.value ?? '');
    formData.append('restaurantType', this.restaurantForm.get('restaurantType')?.value ?? '');
    formData.append('description', this.restaurantForm.get('description')?.value ?? '');
    formData.append('phone', this.restaurantForm.get('phone')?.value ?? '');
    formData.append('openingTime', this.restaurantForm.get('openingTime')?.value ?? '');
    formData.append('closingTime', this.restaurantForm.get('closingTime')?.value ?? '');
    formData.append('city', this.restaurantForm.get('city')?.value ?? '');
    formData.append('address', this.restaurantForm.get('address')?.value ?? '');
    formData.append('number', this.restaurantForm.get('number')?.value ?? '');
    formData.append('postalCode', this.restaurantForm.get('postalCode')?.value ?? '');
    formData.append('imageUrl', this.restaurantForm.get('imageUrl')?.value ?? '');

    if (this.photoFile) {
        formData.append("photo", this.photoFile);
    }

    const id = this.restaurantForm.get('id')?.value;
    if (id && this.isUpdate) {
      timer(500).pipe(
        switchMap( () => this.httpClient.put<Restaurant>(`http://localhost:8080/restaurant/${id}`, formData)))
            .subscribe(response => {
              
                this.router.navigate(['/restaurant', response.id, 'detail']);
                this.showSpinner = false;
            }, error => {
            });
    } else {
      timer(500).pipe(
        switchMap( () => this.httpClient.post<Restaurant>('http://localhost:8080/restaurant', formData)))
            .subscribe(response => {
                this.router.navigate(['/restaurant', response.id, 'detail']);
                this.showSpinner = false;
            });
    }
}

  

  

  compareObjects(o1: any, o2: any): boolean{

    if (o1 && o2){
      return o1.id == o2.id;
    }

    return o1 == o2;
  }
  getRestaurantType(type?: string): string {
    if (!type) return 'No especificado';
    return RestaurantType[type as keyof typeof RestaurantType];
  }
}
