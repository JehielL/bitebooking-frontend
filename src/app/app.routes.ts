import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { LoginMainComponent } from './login-main/login-main.component';
import { UserListComponent } from './user-list/user-list.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { RegisterComponent } from './register/register.component';
import { RegisterUserComponent } from './user-form/user-form.component';
import { RestaurantFromComponent } from './restaurant-from/restaurant-from.component';

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
  path:'user-list',
  component: UserListComponent
},
 
 {
   path:'registro',
   component: RegisterComponent
 },
 {
   path:'user',
   component: RegisterUserComponent
 },
 {
   path:'restaurant-from',
   component: RestaurantFromComponent
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
   path: 'booking/:id/detail',
   component: BookingDetailComponent
},{
   path: 'booking/form',
   component: BookingFormComponent
},
{
    path: '**',
    component:NotFoundComponent
    
}
];
