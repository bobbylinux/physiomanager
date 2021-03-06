import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PhysiotherapistService } from "../../../services/registers/physiotherapist.service";
import { FormControl, FormGroup } from "@angular/forms";
import { Physiotherapist } from "../../../classes/physiotherapist";
import { PhysiotherapistInterface } from "../../../interfaces/physiotherapist.interface";
import { Logouttable } from "src/app/classes/logouttable";
import { AuthService } from "src/app/services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-physiotherapist-detail",
  templateUrl: "./physiotherapist-detail.component.html",
  styleUrls: ["./physiotherapist-detail.component.css"]
})
export class PhysiotherapistDetailComponent extends Logouttable
  implements OnInit {
  public loading: boolean = false;
  public newPhysiotherapist: boolean = false;

  enabledOptions = [
    { id: true, text: "Sì" },
    { id: false, text: "No" }
  ];

  private physiotherapist: PhysiotherapistInterface;

  formGroup = new FormGroup({
    id: new FormControl(),
    last_name: new FormControl(),
    first_name: new FormControl(),
    enabled: new FormControl()
  });

  constructor(
    private physiotherapistService: PhysiotherapistService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    super();
  }

  ngOnInit() {
    this.physiotherapist = new Physiotherapist();
    this.route.params.subscribe(params => {
      if (!params.id) {
        this.newPhysiotherapist = true;
        return;
      }
      this.physiotherapistService.get(params.id, "").subscribe(
        response => {
          if (response["data"].length > 0) {
            this.physiotherapist = response["data"][0];
            this.formGroup = new FormGroup({
              id: new FormControl(this.physiotherapist.id),
              first_name: new FormControl(this.physiotherapist.first_name),
              last_name: new FormControl(this.physiotherapist.last_name),
              enabled: new FormControl(this.physiotherapist.enabled)
            });
          }
          this.loading = false;
        },
        error => {
          if (error.status && error.status == 401) {
            this.logout(this.auth, this.router, this.toastr);
          } else {
            this.toastr.info(
              "Errore in fase di caricamento del fisioterapista",
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

  get last_name() {
    return this.formGroup.get("last_name");
  }

  get first_name() {
    return this.formGroup.get("first_name");
  }

  get enabled() {
    return this.formGroup.get("enabled");
  }

  addPhysiotherapist() {
    const last_name = this.last_name.value;
    const first_name = this.first_name.value;
    const enabled = this.enabled.value.toString() == "true" ? true : false;
    const physiotherapist = new Physiotherapist();
    physiotherapist.last_name = last_name;
    physiotherapist.first_name = first_name;
    physiotherapist.enabled = enabled;

    this.physiotherapistService.create(physiotherapist).subscribe(
      response => {
        this.toastr.info("Fisioterapista aggiunto correttamente", "", {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: "toast-top-right"
        });
        this.router.navigate(["physiotherapists"]);
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info(
            "Errore in fase di aggiunta del fisioterapista",
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

  updatePhysiotherapist() {
    const id = this.id.value;
    const last_name = this.last_name.value;
    const first_name = this.first_name.value;
    const enabled = this.enabled.value.toString() == "true" ? true : false;
    const physiotherapist = new Physiotherapist();
    physiotherapist.id = id;
    physiotherapist.last_name = last_name;
    physiotherapist.first_name = first_name;
    physiotherapist.enabled = enabled;
    this.physiotherapistService.update(physiotherapist).subscribe(
      () => {
        this.toastr.info("Fisioterapista aggiornato correttamente", "", {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-warning alert-with-icon",
          positionClass: "toast-top-right"
        });
        this.router.navigate(["physiotherapists"]);
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info(
            "Errore in fase di aggiornamento del fisioterapista",
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
    if (this.newPhysiotherapist) {
      this.addPhysiotherapist();
    } else {
      this.updatePhysiotherapist();
    }
  }
}
