import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PatientService } from "../../services/patient.service";
import { Patient } from "../../classes/patient";
import { PatientDetail } from "../../classes/patient-detail";
import { DoctorService } from "./../../services/registers/doctor.service";
import { DoctorInterface } from "./../../interfaces/doctor.interface";
import { Logouttable } from "src/app/classes/logouttable";
import { AuthService } from "src/app/services/auth.service";
import { UtilityService } from "src/app/services/utility.service";

@Component({
  selector: "app-add-patient",
  templateUrl: "./add-patient.component.html",
  styleUrls: ["./add-patient.component.css"]
})
export class AddPatientComponent extends Logouttable implements OnInit {
  private loading: boolean = true;
  private doctors: DoctorInterface[];
  private formGroup: FormGroup;

  constructor(
    private patientService: PatientService,
    private doctorService: DoctorService,
    private toastr: ToastrService,
    private router: Router,
    private auth: AuthService,
    private utilityService: UtilityService
  ) {
    super();
  }

  ngOnInit() {
    this.initFormGroup();
    this.doctorService.getAll(null, "enabled=true").subscribe(
      response => {
        this.doctors = response["data"];
        this.loading = false;
        this.toggleFields(true);
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info("Errore in fase di caricamento dei medici", "", {
            timeOut: 8000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-primary alert-with-icon",
            positionClass: "toast-top-right"
          });
          this.loading = false;
          this.toggleFields(true);
        }
      }
    );
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

  get tax_code() {
    return this.formGroup.get("tax_code");
  }

  get birthday() {
    return this.formGroup.get("birthday");
  }

  get place_of_birth() {
    return this.formGroup.get("place_of_birth");
  }

  get address() {
    return this.formGroup.get("address");
  }

  get city() {
    return this.formGroup.get("city");
  }

  get phone_number() {
    return this.formGroup.get("phone_number");
  }

  get email() {
    return this.formGroup.get("email");
  }

  get doctor_id() {
    return this.formGroup.get("doctor_id");
  }

  submitForm() {
    this.toggleFields(false);
    let patient = new Patient();
    patient.last_name = this.last_name.value;
    patient.first_name = this.first_name.value;
    patient.tax_code = this.tax_code.value;
    patient.birthday = this.birthday.value;
    patient.place_of_birth = this.place_of_birth.value;
    patient.detail = new PatientDetail();
    patient.detail.address = this.address.value;
    patient.detail.city = this.city.value;
    patient.detail.phone_number = this.phone_number.value;
    patient.detail.email = this.email.value;
    patient.detail.doctor_id =
      this.doctor_id.value != 0 ? this.doctor_id.value : null;

    this.patientService.create(patient).subscribe(
      response => {
        this.toastr.info("Paziente aggiunto correttamente", "", {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: "toast-top-right"
        });

        if (response["data"] && response["data"].length > 0) {
          let patientResponse = response["data"][0];
          this.router.navigate([`plans/${patientResponse.id}`]);
        } else {
          this.toastr.info("Errore in fase di aggiunta del paziente", "", {
            timeOut: 8000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-warning alert-with-icon",
            positionClass: "toast-top-right"
          });
          this.loading = false;
        }
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info("Errore in fase di aggiunta del paziente", "", {
            timeOut: 8000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-warning alert-with-icon",
            positionClass: "toast-top-right"
          });
        }
        this.loading = false;
        this.toggleFields(true);
      }
    );
  }

  toggleFields(enable: boolean = true) {
    if (enable) {
      this.formGroup.get("last_name").enable();
      this.formGroup.get("first_name").enable();
      this.formGroup.get("tax_code").enable();
      this.formGroup.get("birthday").enable();
      this.formGroup.get("place_of_birth").enable();
      this.formGroup.get("address").enable();
      this.formGroup.get("city").enable();
      this.formGroup.get("phone_number").enable();
      this.formGroup.get("email").enable();
      this.formGroup.get("doctor_id").enable();
    } else {
      this.formGroup.get("last_name").disable();
      this.formGroup.get("first_name").disable();
      this.formGroup.get("tax_code").disable();
      this.formGroup.get("birthday").disable();
      this.formGroup.get("place_of_birth").disable();
      this.formGroup.get("address").disable();
      this.formGroup.get("city").disable();
      this.formGroup.get("phone_number").disable();
      this.formGroup.get("email").disable();
      this.formGroup.get("doctor_id").disable();
    }
  }

  initFormGroup() {
    this.formGroup = new FormGroup({
      id: new FormControl(),
      last_name: new FormControl({
        value: this.utilityService.getPatientData().last_name,
        disabled: true
      }),
      first_name: new FormControl({
        value: this.utilityService.getPatientData().first_name,
        disabled: true
      }),
      tax_code: new FormControl({
        value: this.utilityService.getPatientData().tax_code,
        disabled: true
      }),
      birthday: new FormControl({ value: "", disabled: true }),
      place_of_birth: new FormControl({ value: "", disabled: true }),
      address: new FormControl({ value: "", disabled: true }),
      city: new FormControl({ value: "", disabled: true }),
      phone_number: new FormControl({ value: "", disabled: true }),
      email: new FormControl({ value: "", disabled: true }),
      doctor_id: new FormControl({ value: 0, disabled: true })
    });
  }
}
