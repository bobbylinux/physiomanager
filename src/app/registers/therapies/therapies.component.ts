import { Component, OnInit } from "@angular/core";
import { Therapy } from "../../classes/therapy";
import { TherapyService } from "../../services/registers/therapy.service";
import { TherapyInterface } from "../../interfaces/therapy.interface";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { DeleteTherapyComponent } from "./delete/delete-therapy.component";
import { AuthService } from "src/app/services/auth.service";
import { Logouttable } from "src/app/classes/logouttable";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-therapies",
  templateUrl: "./therapies.component.html",
  styleUrls: ["./therapies.component.css"]
})
export class TherapiesComponent extends Logouttable implements OnInit {
  private loading: boolean = true;
  constructor(
    private dialog: MatDialog,
    private therapyService: TherapyService,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    super();
  }

  public therapies: Therapy[] = [];

  ngOnInit() {
    this.therapyService.getAll().subscribe(
      response => {
        if (response["data"].length > 0) {
          this.therapies = response["data"];
        }
        this.loading = false;
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info("Errore in fase di caricamento delle terapie", "", {
            timeOut: 8000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-warning alert-with-icon",
            positionClass: "toast-top-right"
          });
        }
        this.loading = false;
      }
    );
  }

  editTherapy(therapy: TherapyInterface) {
    this.router.navigate(["therapies", therapy.id, "edit"]);
  }

  deleteConfirmation(therapy: TherapyInterface) {
    const dialogRef = this.dialog.open(DeleteTherapyComponent, {
      data: {
        therapy: therapy
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "delete") {
        this.deleteTherapy(therapy);
      }
    });
  }

  deleteTherapy(therapy: TherapyInterface) {
    this.therapyService.delete(therapy.id).subscribe(
      response => {
        const idx = this.therapies.indexOf(therapy);
        this.therapies.splice(idx, 1);
        this.toastr.info("Terapia eliminata correttamente", "", {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: "toast-top-right"
        });
        this.loading = false;
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info(
            "Errore in fasei di eliminazione della terapia",
            "",
            {
              timeOut: 8000,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-warning alert-with-icon",
              positionClass: "toast-top-right"
            }
          );
        }
      }
    );
  }
}
