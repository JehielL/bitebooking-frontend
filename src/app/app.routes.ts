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
import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuFormComponent } from './menu-form/menu-form.component';
import { MenuDetailComponent } from './menu-detail/menu-detail.component';
import { DishFormComponent } from './dish-form/dish-form.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { HomeSinLogComponent } from './home-sin-log/home-sin-log.component';
import { KitchenComponent } from './kitchen/kitchen.component';


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
   path: 'home-logout',
   component: HomeSinLogComponent
 },
 {
   path: 'bitebooking',
   component: HomeSinLogComponent
},
{
   path:'user/:id/update',
   component: DashboardUserComponent
},
 {
   path:'user/login',
   component: LoginMainComponent
 },
 {
  path:'user/list',
  component: UserListComponent
},
{
   path:'user/:id/detail',
   component: UserDetailComponent
 },

{
   path: 'user/detail',
   component: UserDetailComponent
},
 {
   path:'user/register',
   component: UserFormComponent
 },
 {
   path: 'bookings/user/:id',
   component: BookingListComponent
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
},
{
   path: 'bookings/create',
   component: BookingFormComponent
},
{
   path:'restaurant-from',
   component: RestaurantFromComponent
 },
{
   path:'restaurant-list',
   component: RestaurantListComponent
 },
 {
   path:'restaurant/detail',
   component: RestaurantDetailComponent
 },
{
   path:'restaurant/:id/detail',
   component: RestaurantDetailComponent
 },
 {
   path:'restaurant/:id/update',
   component:RestaurantFromComponent
 },
 {
   path: 'menus',
   component: MenuListComponent
},
{
   path: 'menus/:id/create',
   component: MenuFormComponent

},
{
   path: 'menus/:id/update',
   component: MenuFormComponent

},
{
   path: 'menus/:id/detail',
   component: MenuDetailComponent
},
{
   path: 'dishes/create',
   component: DishFormComponent
},
{
   path: 'dishes/:id/create',
   component: DishFormComponent
},
{
   path: 'dishes/:id/update',
   component: DishFormComponent
},
{
   path: 'bookings/:id/reserve',
   component: BookingFormComponent
},
{
 path: 'menus/create',
 component: MenuFormComponent
},
{
   path: 'kitchen',
   component: KitchenComponent
},
{
   path: 'restaurant-list/:tipoCocina',
   component: RestaurantListComponent
},

{
    path: '**',
    component:NotFoundComponent
    
}
];
