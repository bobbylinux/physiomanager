import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PainInterface } from "../../../interfaces/pain.interface";
import { PainService } from "../../../services/registers/pain.service";
import { Pain } from "../../../classes/pain";
import { Logouttable } from "src/app/classes/logouttable";
import { AuthService } from "src/app/services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-pain-detail",
  templateUrl: "./pain-detail.component.html",
  styleUrls: ["./pain-detail.component.css"]
})
export class PainDetailComponent extends Logouttable implements OnInit {
  private newPain: boolean = false;
  private loading: boolean = false;

  enabledOptions = [
    { id: true, text: "Sì" },
    { id: false, text: "No" }
  ];

  private pain: PainInterface;

  formGroup = new FormGroup({
    id: new FormControl(),
    description: new FormControl(),
    index: new FormControl(),
    enabled: new FormControl()
  });

  constructor(
    private painService: PainService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    super();
  }

  ngOnInit() {
    this.pain = new Pain();
    this.route.params.subscribe(params => {
      if (!params.id) {
        this.newPain = true;
        return;
      }
      this.painService.get(params.id, "").subscribe(
        response => {
          if (response["data"].length > 0) {
            this.pain = response["data"][0];
            this.formGroup = new FormGroup({
              id: new FormControl(this.pain.id),
              description: new FormControl(this.pain.description),
              index: new FormControl(this.pain.index),
              enabled: new FormControl(this.pain.enabled)
            });
          }
        },
        error => {
          if (error.status && error.status == 401) {
            this.logout(this.auth, this.router, this.toastr);
          } else {
            this.toastr.info("Errore in fase di caricamento del medico", "", {
              timeOut: 8000,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-warning alert-with-icon",
              positionClass: "toast-top-right"
            });
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

  addPain() {
    const description = this.description.value;
    const index = this.index.value;
    const enabled = this.enabled.value.toString() == "true" ? true : false;
    const pain = new Pain();
    pain.description = description;
    pain.index = index;
    pain.enabled = enabled;
    this.loading = true;
    this.painService.create(pain).subscribe(
      () => {
        this.toastr.info("Indice di dolore aggiunto correttamente", "", {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: "toast-top-right"
        });
        this.router.navigate(["pains"]);
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info(
            "Errore in fase di aggiunta dell'indice di dolore",
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

  updatePain() {
    const id = this.id.value;
    const description = this.description.value;
    const index = this.index.value;
    const enabled = this.enabled.value.toString() == "true" ? true : false;
    const pain = new Pain();
    pain.id = id;
    pain.index = index;
    pain.description = description;
    pain.enabled = enabled;
    this.loading = true;

    this.painService.update(pain).subscribe(
      () => {
        this.toastr.info("Indice di dolore aggiornato correttamente", "", {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: "toast-top-right"
        });
        this.router.navigate(["pains"]);
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info(
            "Errore in fase di aggiornamento dell'indice di dolore",
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
    if (this.newPain) {
      this.addPain();
    } else {
      this.updatePain();
    }
  }
}
