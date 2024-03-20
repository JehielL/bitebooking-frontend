import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { LoginMainComponent } from './login-main/login-main.component';
import { UserListComponent } from './user-list/user-list.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { RestaurantFromComponent } from './restaurant-from/restaurant-from.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';

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
   path:'user-list/user-detail',
   component: UserDetailComponent
},
 {
   path:'user-list',
   component: UserListComponent
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
   path: 'user-detail',
   component: UserDetailComponent
},
 {
   path:'user-form',
   component: UserFormComponent
 },
 {
   path:'restaurant-from',
   component: RestaurantFromComponent
 },
 {
    path: 'bookings',
    component: BookingListComponent
 },
 {
   path: 'bookings/:id/detail',
   component: BookingDetailComponent
},
{
   path: 'bookings/:id/update',
   component: BookingFormComponent
},{
   path: 'bookings/create',
   component: BookingFormComponent
},
{
  path: 'bookings/:id/update',
  component: BookingFormComponent
  
},
{
   path:'restaurant-list',
   component: RestaurantListComponent
 },
 {
  path: 'restaurants/:id/detail',
  component: RestaurantDetailComponent
},
{
    path: '**',
    component:NotFoundComponent
    
},
];
