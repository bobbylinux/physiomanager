import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginError: boolean = false;
  loginErrorMessage: string = "";

  constructor(private auth: AuthService, private router: Router) {
    auth.userLoggedIn.subscribe(
      () => {
        this.router.navigate(['dashboard']);
      }
    );

    auth.userNotLoggedIn.subscribe( 
      (error: HttpHeaderResponse) => {
        this.loginError = true;
        this.loginErrorMessage = error.status == 401 ? "Username o password non validi" : error.statusText;
      }
    )
   }

  ngOnInit() {
  }

  login(form: NgForm) {
    if (!form.valid) {
      return false;
    }
    this.auth.login(form.value.email, form.value.password);
  }

}
