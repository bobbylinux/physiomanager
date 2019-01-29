import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class RouteGuardService implements CanActivate {

  constructor(private router: Router,private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }

}
