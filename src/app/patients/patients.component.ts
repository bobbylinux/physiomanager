import { Component, OnInit } from "@angular/core";
import { Patient } from "../classes/patient";
import { PatientService } from "../services/patient.service";
import { Logouttable } from "../classes/logouttable";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { ToastrService } from "ngx-toastr";
import { UtilityService } from "../services/utility.service";

@Component({
  selector: "app-patients",
  templateUrl: "./patients.component.html",
  styleUrls: ["./patients.component.css"]
})
export class PatientsComponent extends Logouttable implements OnInit {
  public loading: boolean = false;
  searched = false;
  last_name = "";
  first_name = "";
  tax_code = "";
  patients: Patient[] = [];

  constructor(
    private service: PatientService,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService,
    private utilityService: UtilityService
  ) {
    super();
  }

  ngOnInit() {}

  searchPatient() {
    this.loading = true;
    this.service
      .searchPatient(this.last_name, this.first_name, this.tax_code)
      .subscribe(
        result => {
          this.patients = result["data"];
          this.searched = true;
          this.loading = false;
        },
        error => {
          if (error.status && error.status == 401) {
            this.logout(this.auth, this.router, this.toastr);
          } else {
            this.toastr.info("Errore in fase di caricamento dei pazienti", "", {
              timeOut: 8000,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-warning alert-with-icon",
              positionClass: "toast-top-right"
            });
          }
        }
      );
  }

  ngOnDestroy() {
    let patient = new Patient();
    patient.last_name = this.last_name;
    patient.first_name = this.first_name;
    patient.tax_code = this.tax_code;
    this.utilityService.setPatientData(patient);
  }
}
