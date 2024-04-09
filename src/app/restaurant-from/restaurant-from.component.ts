import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../Interfaces/restaurant.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RestaurantType } from '../Interfaces/restaurantType.model';
import { __values } from 'tslib';
import { DatePipe } from '@angular/common';
import { appConfig } from '../app.config';



@Component({
  selector: 'app-restaurant-from',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule,RouterLink,DatePipe],
  templateUrl: './restaurant-from.component.html',
  styleUrl: './restaurant-from.component.css'
})
export class RestaurantFromComponent implements OnInit {
  restaurants: Restaurant |undefined;
  isUpdate: boolean = false;
  photoFile: File | undefined;
  photoPreview: string | undefined;

  restaurantFrom = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    phone: new FormControl(''), 
    restaurantTypes:new FormControl(RestaurantType.BAR),
    imageUrl: new FormControl(),
    openingTime: new FormControl(new Date()),
    closingTime: new FormControl(new Date()),  
    status: new FormControl(false),
    city:new FormControl(''),
    address:new FormControl(''),
    number:new FormControl(''),
    postalCode:new FormControl(''),
  });

  
   
  constructor( private httpClient: HttpClient,
               private fb: FormBuilder,
               private router: Router,
               private activatedRoute: ActivatedRoute){

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

    // OPCIONAL: PREVISUALIZAR LA IMAGEN POR PANTALLA
    let reader = new FileReader();
    reader.onload = event => this.photoPreview = reader.result as string;
    reader.readAsDataURL(this.photoFile); 
  }


  save () {
    const restaurantBacken: Restaurant= this.restaurantFrom.value as Restaurant;
  
    let formData =new FormData();
    formData.append('id', this.restaurantFrom.get('id')?.value?.toString() ?? '0');
    formData.append('name', this.restaurantFrom.get('name')?.value?? '');
    formData.append('restaurantTypes', this.restaurantFrom.get('restaurantTypes')?.value?.toString() ?? '');
    formData.append('imageUrl', this.restaurantFrom.get('imageUrl')?.value?? '');
    formData.append('phone', this.restaurantFrom.get('phone')?.value?? '0');
    //formData.append('openingTime', this.restaurantFrom.get('openingTime')?.value?.toString?? '');
    //formData.append('openingTime', this.restaurantFrom.get('openingTime')?.value?.toString?? '');
    formData.append('status', this.restaurantFrom.get('status')?.value?.toString() ?? '');
    formData.append('city', this.restaurantFrom.get('city')?.value?? '');
    formData.append('address', this.restaurantFrom.get('address')?.value?? '');
    formData.append('number', this.restaurantFrom.get('number')?.value?? '');
    formData.append('postalCode', this.restaurantFrom.get('postalCode')?.value?? '');
    
    if(this.photoFile) {
      formData.append("imageUrl", this.photoFile);
    }

    
    
    if (this.isUpdate) {
    
    this.httpClient.put<Restaurant>('http://localhost:8080/restaurant/'+ this.restaurants?.id, formData).subscribe(restaurantBacken =>
    this.navigateToList());
    
    }else {
    
    this.httpClient.post<Restaurant>('http://localhost:8080/restaurant/', formData).subscribe(restaurantBacken =>
    this.navigateToList());
    }
  }

  private navigateToList(){
    //this.router.navigate(['/restaurant/' +id, 'detail']);
  }

  compareObjects(o1: any, o2: any): boolean{

    if (o1 && o2){
      return o1.id == o2.id;
    }

    return o1 == o2;
  }

}
