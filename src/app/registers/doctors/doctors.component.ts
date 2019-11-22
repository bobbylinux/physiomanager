import { Component, OnInit } from "@angular/core";
import { DoctorService } from "../../services/registers/doctor.service";
import { DeleteDoctorComponent } from "./delete/delete-doctor.component";
import { Router } from "@angular/router";
import { Doctor } from "../../classes/doctor";
import { DoctorInterface } from "./../../interfaces/doctor.interface";
import { MatDialog } from "@angular/material";
import { AuthService } from "src/app/services/auth.service";
import { Logouttable } from "src/app/classes/logouttable";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-doctors",
  templateUrl: "./doctors.component.html",
  styleUrls: ["./doctors.component.css"]
})
export class DoctorsComponent extends Logouttable implements OnInit {
  public doctors: Doctor[] = [];
  public loading: boolean = true;

  constructor(
    private dialog: MatDialog,
    private doctorService: DoctorService,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    super();
  }

  ngOnInit() {
    this.doctorService.getAll().subscribe(
      result => {
        this.doctors = result["data"];
        this.loading = false;
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info("Errore in fase di caricamento dei medici", "", {
            timeOut: 8000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-warning alert-with-icon",
            positionClass: "toast-top-right"
          });

          this.loading = false;
        }
      }
    );
  }

  editDoctor(doctor: Doctor) {
    this.router.navigate(["doctors", doctor.id, "edit"]);
  }

  deleteConfirmation(doctor: DoctorInterface) {
    const dialogRef = this.dialog.open(DeleteDoctorComponent, {
      data: {
        doctor: doctor
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "delete") {
        this.deleteDoctor(doctor);
      }
    });
  }

  deleteDoctor(doctor: DoctorInterface) {
    this.doctorService.delete(doctor.id).subscribe(
      response => {
        const idx = this.doctors.indexOf(doctor);
        this.doctors.splice(idx, 1);
        this.toastr.info("Medico eliminato correttamente", "", {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-warning alert-with-icon",
          positionClass: "toast-top-right"
        });
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info("Errore in fase di eliminazione del medico", "", {
            timeOut: 8000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-primary alert-with-icon",
            positionClass: "toast-top-right"
          });
          this.loading = false;
        }
      }
    );
  }
}
