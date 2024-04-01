import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Dish } from '../Interfaces/dish.model';
import { Menu } from '../Interfaces/menu.model';
import AOS from 'aos';


@Component({
  selector: 'app-dish-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, HttpClientModule],
  templateUrl: './dish-form.component.html',
  styleUrl: './dish-form.component.css'
})
export class DishFormComponent implements OnInit{
 
  dishForm = new FormGroup({
    id: new FormControl<number>(0),
    title: new FormControl<string>(''),
    description: new FormControl<string>(''),
    price: new FormControl<number>(0.0),
    imgDish: new FormControl<string>(''),
    active: new FormControl<boolean>(false),
    alergys: new FormControl<boolean>(false),
    menu: new FormControl(),
   
  });
  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute) { 
  }

  photoFile: File | undefined;
  photoPreview: string | undefined;
  dish: Dish | undefined;
  isUpdate: boolean = false;
  menus: Menu[] = [];
  dishes: Dish[] = []; 
  selectedMenu: Menu | undefined;

  


 
 
  ngOnInit(): void {

    AOS.init();
    
    this.httpClient.get<Menu[]>('http://localhost:8080/menus')
      .subscribe(menus => this.menus = menus);

    
      this.activatedRoute.params.subscribe(params => {
        const id = params['id'];
        if(!id) return;
  
        
   
  
        
        this.httpClient.get<Dish>('http://localhost:8080/dishes/' + id).subscribe(dish => {
        this.dishForm.reset(dish);
        this.isUpdate = true;
        this.dish = dish;
        this.dishForm.get('menu')?.setValue(dish.menu); 

            
        });         
        });
        this.dishForm.get('menu')?.valueChanges.subscribe(menu => {
          this.selectedMenu = menu;
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

    const dish: Dish = this.dishForm.value as Dish;
    console.log(dish);

    // Crear FormData
    let formData = new FormData();
    formData.append('id', this.dishForm.get('id')?.value?.toString() ?? '0');
    formData.append('title', this.dishForm.get('title')?.value ?? '');
    formData.append('description', this.dishForm.get('description')?.value ?? '');
    formData.append('price', this.dishForm.get('price')?.value?.toString() ?? '0');
    formData.append('imgDish', this.dishForm.get('imgDish')?.value ?? '');
    formData.append('active', this.dishForm.get('active')?.value?.toString() ?? 'false');
    formData.append('alergys', this.dishForm.get('alergys')?.value?.toString() ?? 'false');
    formData.append('menu', this.dishForm.get('menu')?.value?.id.toString() ?? '0');
    

   if(this.photoFile) {
      formData.append("photo", this.photoFile);
    }

    if (this.isUpdate) {
        this.httpClient.put<Dish>('http://localhost:8080/dishes/' + this.dish?.id, formData)
      .subscribe(dish => this.navigateToList());
    } else {
      this.httpClient.post<Dish>('http://localhost:8080/dishes', formData)
      .subscribe(dish => this.navigateToList());
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
