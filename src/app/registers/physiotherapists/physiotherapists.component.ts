import { Component, OnInit } from "@angular/core";
import { PhysiotherapistService } from "../../services/registers/physiotherapist.service";
import { DeletePhysiotherapistComponent } from "./delete/delete-physiotherapist.component";
import { PhysiotherapistInterface } from "../../interfaces/physiotherapist.interface";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { Logouttable } from "src/app/classes/logouttable";
import { AuthService } from "src/app/services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-physiotherapists",
  templateUrl: "./physiotherapists.component.html",
  styleUrls: ["./physiotherapists.component.css"]
})
export class PhysiotherapistsComponent extends Logouttable implements OnInit {
  public loading: boolean = true;

  constructor(
    private dialog: MatDialog,
    private physiotherapistService: PhysiotherapistService,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    super();
  }

  public physiotherapists: PhysiotherapistInterface[] = [];

  ngOnInit() {
    this.physiotherapistService.getAll().subscribe(
      response => {
        if (response["data"].length > 0) {
          this.physiotherapists = response["data"];
        }
        this.loading = false;
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info(
            "Errore in fase di caricamento dei fisioterapisti",
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

  editPhysiotherapist(physiotherapist: PhysiotherapistInterface) {
    this.router.navigate(["physiotherapists", physiotherapist.id, "edit"]);
  }

  deleteConfirmation(physiotherapist: PhysiotherapistInterface) {
    const dialogRef = this.dialog.open(DeletePhysiotherapistComponent, {
      data: {
        physiotherapist: physiotherapist
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "delete") {
        this.deletePhysiotherapist(physiotherapist);
      }
    });
  }

  deletePhysiotherapist(physiotherapist: PhysiotherapistInterface) {
    this.physiotherapistService.delete(physiotherapist.id).subscribe(
      response => {
        const idx = this.physiotherapists.indexOf(physiotherapist);
        this.physiotherapists.splice(idx, 1);
        this.toastr.info("Fisioterapista eliminato correttamente", "", {
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
            "Errore in fase di eliminazione del fisioterapista",
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
