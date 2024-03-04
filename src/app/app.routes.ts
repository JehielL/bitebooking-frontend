import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
<<<<<<< HEAD
import { LoginMainComponent } from './login-main/login-main.component';
=======
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
>>>>>>> CarlosRama

export const routes: Routes = [
   {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
   }, 
 {
    path:'home',
    component: HomeComponent
 },
 {
   path:'login',
   component: LoginMainComponent
 },
 {
   path:'registro',
   component: RegistrationFormComponent
 },
 {
   path:'restaurant-list',
   component: RestaurantListComponent
 },
 {
    path: 'booking',
    component: BookingListComponent
 },
 {
   path: 'booking/:id/detail',
   component: BookingDetailComponent
},
{
    path: '**',
    component:NotFoundComponent
    
}
];
