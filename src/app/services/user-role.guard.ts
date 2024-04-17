import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';


export const userRoleGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (authService.getIsAdmin() || authService.getIsRestaurant()){
    return true;
  } else {
    return router.navigate(['/home']);
  }

};
