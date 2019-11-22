import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../services/auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { HttpErrorResponse, HttpHeaderResponse } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public isFisioCenter: boolean = false;
  public buttonClassColor: string;
  public loading: boolean = false;

  loginError: boolean = false;
  loginErrorMessage: string = "";
  public place = environment.place;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    console.log("enviroment", environment);
    this.isFisioCenter = this.place == "Fisiocenter";
    this.auth.userLoggedIn.subscribe(() => {
      this.router.navigate(["dashboard"]);
    });

    this.auth.userNotLoggedIn.subscribe((error: HttpHeaderResponse) => {
      this.loginError = true;
      this.loading = false;
      this.loginErrorMessage =
        error.status == 401
          ? "Username o password non validi"
          : "Si è verificato un errore nel tentativo di collegarsi alla piattaforma";
    });
  }

  login(form: NgForm) {
    if (!form.valid) {
      return false;
    }
    this.loading = true;
    this.auth.login(form.value.email, form.value.password);
  }
}
