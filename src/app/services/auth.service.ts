import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isUserLogged = false;
  @Output() userSignedIn = new EventEmitter<User>();
  @Output() userSignedUp = new EventEmitter<User>();
  @Output() userLoggedOut = new EventEmitter();
  constructor() { }

  isUserLoggedIn() {
    this.isUserLogged = !!localStorage.getItem('token');
    return this.isUserLogged;
  }

  login(email: string, password: string) {
    let user = new User();
    user.email = email;
    user.name = 'test';
    this.userSignedIn.emit(user);
    localStorage.setItem("token", email);
    return true;
  }

  logout() {
    localStorage.removeItem('token');
    this.userLoggedOut.emit();
    this.isUserLogged = false;
  }
}
