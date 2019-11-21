import { Component, OnInit } from "@angular/core";
import { ProgramService } from "../../services/registers/program.service";
import { Program } from "../../classes/program";
import { DeleteProgramComponent } from "./delete/delete-program.component";
import { ProgramInterface } from "../../interfaces/program.interface";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { AuthService } from "src/app/services/auth.service";
import { Logouttable } from "src/app/classes/logouttable";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-programs",
  templateUrl: "./programs.component.html",
  styleUrls: ["./programs.component.css"]
})
export class ProgramsComponent extends Logouttable implements OnInit {
  private loading: boolean = true;

  constructor(
    private dialog: MatDialog,
    private programService: ProgramService,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    super();
  }

  public programs: Program[] = [];

  ngOnInit() {
    this.programService.getAll().subscribe(
      response => {
        if (response["data"].length > 0) {
          this.programs = response["data"];
        }

        this.loading = false;
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info(
            "Errore in fase di caricamento dei programmi riabilitativi",
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

  editProgram(program: ProgramInterface) {
    this.router.navigate(["programs", program.id, "edit"]);
  }

  deleteConfirmation(program: ProgramInterface) {
    const dialogRef = this.dialog.open(DeleteProgramComponent, {
      data: {
        program: program
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "delete") {
        this.deleteProgram(program);
      }
    });
  }

  deleteProgram(program: ProgramInterface) {
    this.programService.delete(program.id).subscribe(
      response => {
        const idx = this.programs.indexOf(program);
        this.programs.splice(idx, 1);
        this.toastr.info(
          "Programma riabilitativo eliminato correttamente",
          "",
          {
            timeOut: 8000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-primary alert-with-icon",
            positionClass: "toast-top-right"
          }
        );
        this.loading = false;
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info(
            "Errore in fase di eliminazione del programma riabilitativo",
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
