import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { LoginMainComponent } from './login-main/login-main.component';
import { UserListComponent } from './user-list/user-list.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { RestaurantFromComponent } from './restaurant-form/restaurant-form.component';
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
import { AboutUsComponent } from './about-us/about-us.component';
import { userRoleGuard } from './services/user-role.guard';
import { AvatarFormComponent } from './avatar-form/avatar-form.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { userLoggedInGuard } from './services/user-logged-in.guard';
import { RankingComponent } from './ranking/ranking.component';



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
   path:'user/:id/update',
   component: DashboardUserComponent,
   canActivate: [userLoggedInGuard]
},
 {
   path:'user/login',
   component: LoginMainComponent
 },
 {
  path:'user/list',
  component: UserListComponent,
  canActivate: [userLoggedInGuard]
},
{
   path:'user/:id/detail',
   component: UserDetailComponent,
   canActivate: [userLoggedInGuard]
 },

{
   path: 'user/detail',
   component: UserDetailComponent,
   canActivate: [userLoggedInGuard]
},
 {
   path:'user/register',
   component: UserFormComponent
 },
 {
   path: 'bookings/user/:id',
   component: BookingListComponent,
   canActivate: [userLoggedInGuard]
 },
 {
    path: 'bookings',
    component: BookingListComponent,
    canActivate: [userLoggedInGuard]
 },
 {
   path: 'bookings/:id/detail',
   component: BookingDetailComponent,
   canActivate: [userLoggedInGuard]
},

 {
   path: 'bookings/:id/update',
   component: BookingFormComponent,
   canActivate: [userLoggedInGuard]
},
{
   path: 'bookings/create',
   component: BookingFormComponent,
   canActivate: [userLoggedInGuard]
},
{
   path:'restaurant-form',
   component: RestaurantFromComponent,
   canActivate: [userRoleGuard]
 },
{
   path:'restaurant-list',
   component: RestaurantListComponent,
   canActivate: [userLoggedInGuard]
 },
{
   path:'restaurant/:id/detail',
   component: RestaurantDetailComponent,
   canActivate: [userLoggedInGuard]
 },
 {
   path:'restaurant/:id/update',
   component:RestaurantFromComponent,
   canActivate: [userRoleGuard]
 },
 {
   path: 'menus',
   component: MenuListComponent,
   canActivate: [userLoggedInGuard]
},
{
   path: 'menus/:id/create',
   component: MenuFormComponent,
   canActivate: [userRoleGuard]

},
{
   path: 'menus/:id/update',
   component: MenuFormComponent,
   canActivate: [userRoleGuard]

},
{
   path: 'menus/:id/detail',
   component: MenuDetailComponent,
   canActivate: [userLoggedInGuard]
},
{
   path: 'dishes/create',
   component: DishFormComponent,
   canActivate: [userRoleGuard]
},
{
   path: 'dishes/:id/create',
   component: DishFormComponent,
   canActivate: [userRoleGuard]
},
{
   path: 'dishes/:id/update',
   component: DishFormComponent,
   canActivate: [userRoleGuard]
},
{
   path: 'bookings/:id/reserve',
   component: BookingFormComponent,
   canActivate: [userLoggedInGuard]
},
{
 path: 'menus/create',
 component: MenuFormComponent,
 canActivate: [userRoleGuard]
},
{
   path: 'kitchen',
   component: KitchenComponent,
   canActivate: [userLoggedInGuard]
},
{
   path: 'restaurant-list/:tipoCocina',
   component: RestaurantListComponent,
   canActivate: [userLoggedInGuard]
},
{
   path: 'about-us',
   component: AboutUsComponent

},
{
   path: 'users/account',
   component: AccountFormComponent,
   canActivate: [userLoggedInGuard]
},
{
   path: 'users/account/avatar',
   component: AvatarFormComponent,
   canActivate: [userLoggedInGuard]
},
{
   path: 'ranking',
   component: RankingComponent,
   canActivate: [userLoggedInGuard]
},
{
    path: '**',
    component:NotFoundComponent
}
];
