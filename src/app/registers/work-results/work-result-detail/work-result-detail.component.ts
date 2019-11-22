import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { WorkResultInterface } from "../../../interfaces/work-result.interface";
import { WorkResultService } from "../../../services/registers/work-result.service";
import { WorkResult } from "../../../classes/work-result";
import { Logouttable } from "src/app/classes/logouttable";
import { AuthService } from "src/app/services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-work-result-detail",
  templateUrl: "./work-result-detail.component.html",
  styleUrls: ["./work-result-detail.component.css"]
})
export class WorkResultDetailComponent extends Logouttable implements OnInit {
  private newWorkResult: boolean = false;
  private loading: boolean = false;
  enabledOptions = [
    { id: true, text: "Sì" },
    { id: false, text: "No" }
  ];

  private workResult: WorkResultInterface;

  formGroup = new FormGroup({
    id: new FormControl(),
    description: new FormControl(),
    index: new FormControl(),
    enabled: new FormControl()
  });

  constructor(
    private workResultService: WorkResultService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    super();
  }

  ngOnInit() {
    this.workResult = new WorkResult();
    this.route.params.subscribe(params => {
      if (!params.id) {
        this.newWorkResult = true;
        return;
      }
      this.loading = true;
      this.workResultService.get(params.id, "").subscribe(
        response => {
          if (response["data"].length > 0) {
            this.workResult = response["data"][0];
            this.formGroup = new FormGroup({
              id: new FormControl(this.workResult.id),
              description: new FormControl(this.workResult.description),
              index: new FormControl(this.workResult.index),
              enabled: new FormControl(this.workResult.enabled)
            });

            this.loading = false;
          }
        },
        error => {
          if (error.status && error.status == 401) {
            this.logout(this.auth, this.router, this.toastr);
          } else {
            this.toastr.info(
              "Errore in fase di caricamento del risultato del lavoro",
              "",
              {
                timeOut: 8000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-warning alert-with-icon",
                positionClass: "toast-top-right"
              }
            );
            this.loading = false;
          }
        }
      );
    });
  }

  get id() {
    return this.formGroup.get("id");
  }

  get description() {
    return this.formGroup.get("description");
  }

  get index() {
    return this.formGroup.get("index");
  }

  get enabled() {
    return this.formGroup.get("enabled");
  }

  addWorkResult() {
    const description = this.description.value;
    const enabled = this.enabled.value;
    const index = this.index.value;
    const workResult = new WorkResult();
    workResult.description = description;
    workResult.index = index;
    workResult.enabled = enabled.toString() == "true" ? true : false;

    this.workResultService.create(workResult).subscribe(
      () => {
        this.toastr.info("Risultato del lavoro aggiunto correttamente", "", {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: "toast-top-right"
        });
        this.router.navigate(["work_results"]);
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info(
            "Errore in fase di aggiunta del risultato del lavoro",
            "",
            {
              timeOut: 8000,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-warning alert-with-icon",
              positionClass: "toast-top-right"
            }
          );
          this.loading = false;
        }
      }
    );
  }

  updateWorkResult() {
    const id = this.id.value;
    const description = this.description.value;
    const enabled = this.enabled.value;
    const index = this.index.value;
    const workResult = new WorkResult();
    workResult.id = id;
    workResult.description = description;
    workResult.index = index;
    workResult.enabled = enabled.toString() == "true" ? true : false;

    this.workResultService.update(workResult).subscribe(
      () => {
        this.toastr.info("Risultato del lavoro aggiornato correttamente", "", {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: "toast-top-right"
        });
        this.router.navigate(["work_results"]);
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info(
            "Errore in fase di aggiornamento del risultato del lavoro",
            "",
            {
              timeOut: 8000,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-warning alert-with-icon",
              positionClass: "toast-top-right"
            }
          );
          this.loading = false;
        }
      }
    );
  }

  submitForm() {
    this.loading = true;
    if (this.newWorkResult) {
      this.addWorkResult();
    } else {
      this.updateWorkResult();
    }
  }
}
