import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TherapyService } from "../../../services/registers/therapy.service";
import { Therapy } from "../../../classes/therapy";
import { TherapyInterface } from "../../../interfaces/therapy.interface";
import { Logouttable } from "src/app/classes/logouttable";
import { AuthService } from "src/app/services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-therapy-detail",
  templateUrl: "./therapy-detail.component.html",
  styleUrls: ["./therapy-detail.component.css"]
})
export class TherapyDetailComponent extends Logouttable implements OnInit {
  public loading: boolean = false;
  public newTherapy: boolean = false;

  public enabledOptions = [
    { id: true, text: "Sì" },
    { id: false, text: "No" }
  ];

  formGroup = new FormGroup({
    id: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    enabled: new FormControl()
  });

  private therapy: TherapyInterface;

  constructor(
    private theraphyService: TherapyService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    super();
  }

  ngOnInit() {
    this.therapy = new Therapy();
    this.route.params.subscribe(params => {
      if (!params.id) {
        this.newTherapy = true;
        return;
      }
      this.loading = true;
      this.theraphyService.get(params.id, "").subscribe(
        response => {
          if (response["data"].length > 0) {
            this.therapy = response["data"][0];
            this.formGroup = new FormGroup({
              id: new FormControl(this.therapy.id),
              description: new FormControl(this.therapy.description),
              price: new FormControl(this.therapy.price),
              enabled: new FormControl(this.therapy.enabled)
            });
          }
          this.loading = false;
        },
        error => {
          if (error.status && error.status == 401) {
            this.logout(this.auth, this.router, this.toastr);
          } else {
            this.toastr.info(
              "Errore in fase di caricamento della terapia",
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

  get price() {
    return this.formGroup.get("price");
  }

  get enabled() {
    return this.formGroup.get("enabled");
  }

  addTherapy() {
    const description = this.description.value;
    const price = this.price.value;
    const enabled = this.enabled.value.toString() == "true" ? true : false;
    const therapy = new Therapy();
    therapy.description = description;
    therapy.price = price;
    therapy.enabled = enabled;

    this.theraphyService.create(therapy).subscribe(
      () => {
        this.toastr.info("Terapia aggiunta correttamente", "", {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: "toast-top-right"
        });
        this.router.navigate(["therapies"]);
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info("Errore in fase di aggiunta della terapia", "", {
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

  updateTherapy() {
    const id = this.id.value;
    const description = this.description.value;
    const price = this.price.value;
    const enabled = this.enabled.value.toString() == "true" ? true : false;
    const therapy = new Therapy();
    therapy.id = id;
    therapy.description = description;
    therapy.price = price;
    therapy.enabled = enabled;

    this.theraphyService.update(therapy).subscribe(
      () => {
        this.toastr.info("Terapia aggiornata correttamente", "", {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: "toast-top-right"
        });
        this.router.navigate(["therapies"]);
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info(
            "Errore in fase di aggiornamento della terapia",
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
    if (this.newTherapy) {
      this.addTherapy();
    } else {
      this.updateTherapy();
    }
  }
}
