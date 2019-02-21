import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from '../classes/user';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Jwt } from './../interfaces/jwt';
import { UserInterface } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isUserLogged = false;
  private authUrl = 'http://localhost:8000/api/auth/';
  @Output() userLoggedIn = new EventEmitter<User>();
  @Output() userNotLoggedIn = new EventEmitter<HttpHeaderResponse>();
  @Output() userLoggedOut = new EventEmitter();

  constructor(private http: HttpClient) { }

  isUserLoggedIn() {
    this.isUserLogged = !!localStorage.getItem('token');
    return this.isUserLogged;
  }

  login(email: string, password: string) {
    this.http.post(this.authUrl + 'login', {
      email: email,
      password: password
    }).subscribe(
      (payload: Jwt) => {
        localStorage.setItem("token", payload.access_token);
        localStorage.setItem("user", JSON.stringify(payload.user));
        let user = new User();
        user = payload.user;
        this.userLoggedIn.emit(user);
      },
      (httpResponse: HttpHeaderResponse) => {
        this.userNotLoggedIn.emit(httpResponse);
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userLoggedOut.emit();
    this.isUserLogged = false;
  }

  getUser(): UserInterface {
    const data = JSON.parse(localStorage.getItem('user'));
    let user = new User();
    if (data) {
      user.email = data['email'];
      user.name = data['name'];
    }

    return user;
  }

  getToken(): string {
    return localStorage.getItem('token');
  }
}
