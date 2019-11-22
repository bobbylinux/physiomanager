import { Component, OnInit, Input } from "@angular/core";
import { PatientInterface } from "./../../interfaces/patient.interface";
import { DeletePatientComponent } from "./delete/delete-patient.component";
import { MatDialog } from "@angular/material";
import { PatientService } from "./../../services/patient.service";
import { Logouttable } from "src/app/classes/logouttable";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-search-result",
  templateUrl: "./search-result.component.html",
  styleUrls: ["./search-result.component.css"]
})
export class SearchResultComponent extends Logouttable implements OnInit {
  private admin: boolean;

  @Input()
  searched;
  @Input()
  patients;

  constructor(
    private dialog: MatDialog,
    private patientService: PatientService,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    super();
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.admin = user.admin;
  }

  deleteConfirmation(patient: PatientInterface) {
    const dialogRef = this.dialog.open(DeletePatientComponent, {
      data: {
        patient: patient
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "delete") {
        this.deletePatient(patient);
      }
    });
  }

  deletePatient(patient: PatientInterface) {
    this.patientService.delete(patient.id).subscribe(
      response => {
        const idx = this.patients.indexOf(patient);
        this.patients.splice(idx, 1);
        this.toastr.info("Paziente eliminato correttamente", "", {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: "toast-top-right"
        });
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info("Errore in fase di eliminazione del paziente", "", {
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
}
