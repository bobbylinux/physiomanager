import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DoctorService } from "../../../services/registers/doctor.service";
import { Doctor } from "../../../classes/doctor";
import { DoctorInterface } from "../../../interfaces/doctor.interface";
import { Logouttable } from "src/app/classes/logouttable";
import { AuthService } from "src/app/services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-doctor-detail",
  templateUrl: "./doctor-detail.component.html",
  styleUrls: ["./doctor-detail.component.css"]
})
export class DoctorDetailComponent extends Logouttable implements OnInit {
  public newDoctor: boolean = false;
  public loading: boolean = false;

  enabledOptions = [
    { id: true, text: "Sì" },
    { id: false, text: "No" }
  ];

  private doctor: DoctorInterface;

  formGroup = new FormGroup({
    id: new FormControl(),
    last_name: new FormControl(),
    first_name: new FormControl(),
    enabled: new FormControl()
  });

  constructor(
    private doctorService: DoctorService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    super();
  }

  ngOnInit() {
    this.doctor = new Doctor();
    this.route.params.subscribe(params => {
      if (!params.id) {
        this.newDoctor = true;
        return;
      }
      this.loading = true;
      this.doctorService.get(params.id, "").subscribe(
        response => {
          if (response["data"].length > 0) {
            this.doctor = response["data"][0];
            this.formGroup = new FormGroup({
              id: new FormControl(this.doctor.id),
              last_name: new FormControl(this.doctor.last_name),
              first_name: new FormControl(this.doctor.first_name),
              enabled: new FormControl(this.doctor.enabled)
            });
          }
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

  addDoctor() {
    const last_name = this.last_name.value;
    const first_name = this.first_name.value;
    const enabled = this.enabled.value.toString() == "true" ? true : false;
    const doctor = new Doctor();
    doctor.last_name = last_name;
    doctor.first_name = first_name;
    doctor.enabled = enabled;

    this.doctorService.create(doctor).subscribe(
      response => {
        this.toastr.info("Medico aggiunto correttamente", "", {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: "toast-top-right"
        });
        this.router.navigate(["doctors"]);
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info("Errore in fase di aggiunta del medico", "", {
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

  updateDoctor() {
    const id = this.id.value;
    const last_name = this.last_name.value;
    const first_name = this.first_name.value;
    const enabled = this.enabled.value.toString() == "true" ? true : false;
    const doctor = new Doctor();
    doctor.id = id;
    doctor.last_name = last_name;
    doctor.first_name = first_name;
    doctor.enabled = enabled;

    this.doctorService.update(doctor).subscribe(
      response => {
        this.toastr.info("Medico aggiornato correttamente", "", {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: "toast-top-right"
        });
        this.router.navigate(["doctors"]);
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info("Errore in fase di aggiornamento del medico", "", {
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

  submitForm() {
    this.loading = true;
    if (this.newDoctor) {
      this.addDoctor();
    } else {
      this.updateDoctor();
    }
  }
}
