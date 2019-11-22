import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { WorkResultInterface } from "../../interfaces/work-result.interface";
import { DeleteWorkResultComponent } from "./delete/delete-work-result.component";
import { WorkResultService } from "../../services/registers/work-result.service";
import { MatDialog } from "@angular/material";
import { Logouttable } from "src/app/classes/logouttable";
import { AuthService } from "src/app/services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-work-results",
  templateUrl: "./work-results.component.html",
  styleUrls: ["./work-results.component.css"]
})
export class WorkResultsComponent extends Logouttable implements OnInit {
  private loading: boolean = true;

  constructor(
    private dialog: MatDialog,
    private workResultService: WorkResultService,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    super();
  }

  public workResults: WorkResultInterface[] = [];

  ngOnInit() {
    this.workResultService.getAll().subscribe(
      response => {
        if (response["data"].length > 0) {
          this.workResults = response["data"];
        }
        this.loading = false;
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info(
            "Errore in fase di caricamento dei risultati del lavoro",
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

  editWorkResult(workResult: WorkResultInterface) {
    this.router.navigate(["work_results", workResult.id, "edit"]);
  }

  deleteConfirmation(workResult: WorkResultInterface) {
    const dialogRef = this.dialog.open(DeleteWorkResultComponent, {
      data: {
        workResult: workResult
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "delete") {
        this.deleteWorkResult(workResult);
      }
    });
  }

  deleteWorkResult(workResult: WorkResultInterface) {
    this.workResultService.delete(workResult.id).subscribe(
      result => {
        const idx = this.workResults.indexOf(workResult);
        this.workResults.splice(idx, 1);
        this.toastr.info("Risultato del lavoro eliminato correttamente", "", {
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
            "Errore in fase di eliminazione del risultato del lavoro",
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
