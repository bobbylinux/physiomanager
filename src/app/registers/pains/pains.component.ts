import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PainService } from "../../services/registers/pain.service";
import { PainInterface } from "../../interfaces/pain.interface";
import { DeletePainComponent } from "./delete/delete-pain.component";
import { MatDialog } from "@angular/material";
import { Logouttable } from "src/app/classes/logouttable";
import { AuthService } from "src/app/services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-pains",
  templateUrl: "./pains.component.html",
  styleUrls: ["./pains.component.css"]
})
export class PainsComponent extends Logouttable implements OnInit {
  private loading: boolean = true;

  constructor(
    private dialog: MatDialog,
    private painService: PainService,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    super();
  }

  public pains: PainInterface[] = [];

  ngOnInit() {
    this.painService.getAll().subscribe(
      response => {
        if (response["data"].length > 0) {
          this.pains = response["data"];
        }
        this.loading = false;
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info(
            "Errore in fase di caricamento degli indici di dolore",
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
        this.loading = false;
      }
    );
  }

  editPain(pain: PainInterface) {
    this.router.navigate(["pains", pain.id, "edit"]);
  }

  deleteConfirmation(pain: PainInterface) {
    const dialogRef = this.dialog.open(DeletePainComponent, {
      data: {
        pain: pain
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "delete") {
        this.deletePain(pain);
      }
    });
  }

  deletePain(pain: PainInterface) {
    this.painService.delete(pain.id).subscribe(
      response => {
        const idx = this.pains.indexOf(pain);
        this.pains.splice(idx, 1);
        this.toastr.info("Indice di dolore eliminato correttamente", "", {
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
            "Errore in fase di eliminazione dell'indice di dolore",
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
