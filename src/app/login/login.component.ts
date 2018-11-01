import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    if (!form.valid) {
      return false;
    }
    
    let result = this.auth.login(form.value.email, form.value.password);
    
    if (result) {
      this.router.navigate(['dashboard']);
    }
  }

}
