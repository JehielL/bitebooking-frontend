import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Dish } from '../Interfaces/dish.model';
import { Menu } from '../Interfaces/menu.model';
import AOS from 'aos';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-dish-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './dish-form.component.html',
  styleUrl: './dish-form.component.css'
})
export class DishFormComponent implements OnInit {

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

  menu: Menu | undefined;
  photoFile: File | undefined;
  photoPreview: string | undefined;
  dish: Dish | undefined;
  isUpdate: boolean = false;
  selectedMenu: Menu | undefined;
  authService: AuthenticationService | undefined;
  isAdmin = false;
  userId: string | null = null;
  isLoggedin = false;
  isRestaurant = false;
  showSpinner = true;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private httpClient: HttpClient,
    authService: AuthenticationService  ) {
      this.authService = authService;
      if (this.authService) {
        this.authService.isLoggedin.subscribe(isLoggedin => this.isLoggedin = isLoggedin);
        this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
        this.authService.isRestaurant.subscribe(isRestaurant => this.isRestaurant = isRestaurant);
        this.authService.userId.subscribe(userId => this.userId = userId);
      }
    }

  

  ngOnInit(): void {

    setTimeout(() => {
      this.showSpinner = false;
    }, 1000);
    AOS.init();


    this.activatedRoute.params.subscribe(params => {

      // CREACION
      const id = params['id'];
      if (!id) return;
      setTimeout(() => {
        this.showSpinner = false;
      }, 1000);
      this.httpClient.get<Menu>('http://localhost:8080/menus/' + id)
      .subscribe(menus => {
        this.menu = menus;
        this.dishForm.patchValue({
          menu: this.menu
        });
      });

      // EDICION

      this.httpClient.get<Dish>('http://localhost:8080/dishes/' + id).subscribe(dish => {
        this.dishForm.reset({
          menu: dish.menu,
        });  
        this.dish = dish;
        this.isUpdate = true;
     
      });

    });
  }

  onFileChange(event: Event) {
    let target = event.target as HTMLInputElement; // este target es el input de tipo file donde se carga el archivo

    if (target.files === null || target.files.length == 0) {
      return; // no se procesa ningún archivo
    }

    this.photoFile = target.files[0]; // guardar el archivo para enviarlo luego en el save()

    // OPCIONAL: PREVISUALIZAR LA IMAGEN POR PANTALLA
    let reader = new FileReader();
    reader.onload = event => this.photoPreview = reader.result as string;
    reader.readAsDataURL(this.photoFile);
  }

  save() {

    if (!this.menu)
      return;

    const dish: Dish = this.dishForm.value as Dish;
    dish.menu = this.menu;
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

    if (this.photoFile) {
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
    this.router.navigate(['/menus', this.menu?.id, 'detail']);
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o1 && o2) {
      return o1.id == o2.id;
    }
    return o1 == o2;
  }
}
