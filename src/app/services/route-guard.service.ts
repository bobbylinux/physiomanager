import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class RouteGuardService implements CanActivate {

  constructor(private route: Router, authService: AuthService) { }

  canActivate() {
    return false;
  }
}
