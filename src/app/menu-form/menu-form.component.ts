import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Menu } from '../Interfaces/menu.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Restaurant } from '../Interfaces/restaurant.model';
import AOS from 'aos';

@Component({
  selector: 'app-menu-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, HttpClientModule],
  templateUrl: './menu-form.component.html',
  styleUrl: './menu-form.component.css'
})
export class MenuFormComponent implements OnInit {
  
  
  menuForm = new FormGroup({
    id: new FormControl(0),
    title: new FormControl(''),
    description: new FormControl(''),
    imgMenu: new FormControl(''),
    active: new FormControl(false),
    alergys: new FormControl(false),
    restaurantType: new FormControl(),
    restaurant: new FormControl(),


  });
  photoFile: File | undefined;
  photoPreview: string | undefined;
  menu: Menu | undefined;
  isUpdate: boolean = false;
  restaurants: Restaurant[] = [];
 

  constructor(private httpClient: HttpClient, 
    private activatedRoute: ActivatedRoute,
    private router: Router) 
    {}

  ngOnInit(): void {

    AOS.init();

    this.httpClient.get<Restaurant[]>('http://localhost:8080/restaurant')
      .subscribe(restaurants => this.restaurants = restaurants);
    
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(!id) return;

      
 

      
      this.httpClient.get<Menu>('http://localhost:8080/menus/' + id).subscribe(menu => {
      this.menuForm.reset(menu);
      this.isUpdate = true;
      this.menuForm.get('restaurant')?.setValue(menu.restaurant); 
      this.menu = menu;
          
      });

    

       
      });

   
    

  }
  onFileChange(event: Event) {
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

  save() {

    const menu: Menu = this.menuForm.value as Menu;

    // Crear FormData
    let formData = new FormData();
    formData.append('id', this.menuForm.get('id')?.value?.toString() ?? '0');
    formData.append('title', this.menuForm.get('title')?.value ?? '');
    formData.append('description', this.menuForm.get('description')?.value ?? '');
    formData.append('imgMenu', this.menuForm.get('imgMenu')?.value ?? '');
    formData.append('active', this.menuForm.get('active')?.value?.toString() ?? 'false');
    formData.append('restaurantType', this.menuForm.get('restaurantType')?.value ?? '');
    formData.append('alergys', this.menuForm.get('alergys')?.value?.toString() ?? 'false');
    formData.append('restaurant', this.menuForm.get('restaurant')?.value?.id.toString() ?? '0');
    

   if(this.photoFile) {
      formData.append("photo", this.photoFile);
    }

    if (this.isUpdate) {
        this.httpClient.put<Menu>('http://localhost:8080/menus/' + this.menu?.id, formData)
      .subscribe(menu => this.navigateToList());
    } else {
      this.httpClient.post<Menu>('http://localhost:8080/menus', formData)
      .subscribe(menu => this.navigateToList());
    }
  }


  private navigateToList() {
    this.router.navigate(['/menus']);

   
  }
  compareObjects(o1: any, o2: any): boolean{

    if (o1 && o2){
      return o1.id == o2.id;
    }

    return o1 == o2;
  }

  
  

}
