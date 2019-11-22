import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { PatientService } from "../../services/patient.service";
import { PlanService } from "../../services/plan.service";
import { WorkResultService } from "../../services/registers/work-result.service";
import { PainService } from "../../services/registers/pain.service";
import { ProgramService } from "../../services/registers/program.service";
import { TherapyService } from "../../services/registers/therapy.service";
import { PhysiotherapistService } from "../../services/registers/physiotherapist.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Patient } from "../../classes/patient";
import { WorkResult } from "../../classes/work-result";
import { Pain } from "../../classes/pain";
import { Program } from "../../classes/program";
import { Therapy } from "../../classes/therapy";
import { Physiotherapist } from "../../classes/physiotherapist";
import { SessionInterface } from "../../interfaces/session.interface";
import { PlanInterface } from "./../../interfaces/plan.interface";
import { ProgramInterface } from "../../interfaces/program.interface";
import { WorkResultInterface } from "../../interfaces/work-result.interface";
import { PainInterface } from "../../interfaces/pain.interface";
import { PhysiotherapistInterface } from "../../interfaces/physiotherapist.interface";
import { TherapyInterface } from "./../../interfaces/therapy.interface";
import { ToastrService } from "ngx-toastr";
import { DoctorService } from "./../../services/registers/doctor.service";
import { DoctorInterface } from "./../../interfaces/doctor.interface";
import { Utility } from "./../../classes/utility";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Logouttable } from "src/app/classes/logouttable";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-plans",
  templateUrl: "./plans.component.html",
  styleUrls: ["./plans.component.css"]
})
export class PlansComponent extends Logouttable implements OnInit {
  public loading: boolean = true;
  newPlan: boolean = true;
  patient: Patient;
  plans: PlanInterface[] = [];
  doctors: DoctorInterface[] = [];
  workResults: WorkResult[];
  pains: Pain[];
  programs: Program[];
  therapies: Therapy[];
  physiotherapists: Physiotherapist[];
  sessions: SessionInterface[] = [];
  session: SessionInterface;
  formDisabled: boolean = true;
  public patientId;

  formGroup = new FormGroup({
    patient_id: new FormControl(),
    last_name: new FormControl(),
    first_name: new FormControl(),
    tax_code: new FormControl(),
    birthday: new FormControl(),
    place_of_birth: new FormControl(),
    address: new FormControl(),
    city: new FormControl(),
    phone_number: new FormControl(),
    email: new FormControl(),
    doctor_id: new FormControl()
  });

  constructor(
    private patientService: PatientService,
    private planService: PlanService,
    private doctorService: DoctorService,
    private workResultService: WorkResultService,
    private painService: PainService,
    private programService: ProgramService,
    private therapyService: TherapyService,
    private physiotherapistService: PhysiotherapistService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.sessions = [];
    this.patient = new Patient();
    this.route.params
      .pipe(
        switchMap(params => {
          if (!params.id) {
            return of(null);
          }
          this.patientId = params.id;
          return this.getPatientDetail(this.patientId);
        }),
        switchMap(response => {
          if (response["data"].length > 0) {
            this.setPatientData(response);
          }
          return this.getPlansData(this.patientId);
        }),
        switchMap(response => {
          if (response["data"].length > 0) {
            this.plans = response["data"];
            this.newPlan = false;
          } else {
            this.plans = [];
            this.newPlan = true;
          }
          return this.getDoctorsData();
        }),
        switchMap(response => {
          this.doctors = response["data"];
          return this.getWorkResultsData();
        }),
        switchMap(response => {
          if (response["data"].length > 0) {
            this.workResults = response["data"];
            if (this.workResults) {
              const emptyItemWorkResult: WorkResultInterface = new WorkResult();
              this.workResults.unshift(emptyItemWorkResult);
            }
          }
          return this.getPainData();
        }),
        switchMap(response => {
          if (response["data"].length > 0) {
            this.pains = response["data"];
            if (this.pains) {
              const emptyItemPain: PainInterface = new Pain();
              this.pains.unshift(emptyItemPain);
            }
          }
          return this.getProgramsData();
        }),
        switchMap(response => {
          if (response["data"].length > 0) {
            this.programs = response["data"];
            if (this.programs) {
              const emptyItemProgram: ProgramInterface = new Program();
              this.programs.unshift(emptyItemProgram);
            }
          }
          return this.getTherapiesData();
        }),
        switchMap(response => {
          if (response["data"].length > 0) {
            this.therapies = response["data"];
            if (this.therapies) {
              const emptyTherapy: TherapyInterface = new Therapy();
              this.therapies.unshift(emptyTherapy);
            }
          }
          return this.getPhysiotherapistsData();
        })
      )
      .subscribe(
        response => {
          if (response["data"].length > 0) {
            this.physiotherapists = response["data"];
            if (this.physiotherapists) {
              const emptyItemPhysiotherapis: PhysiotherapistInterface = new Physiotherapist();
              this.physiotherapists.unshift(emptyItemPhysiotherapis);
            }
          }
          this.loading = false;
        },
        error => {
          if (error.status && error.status == 401) {
            this.logout(this.auth, this.router, this.toastr);
          } else {
            this.toastr.info("Errore in fase di caricamento dei dati", "", {
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

  get id() {
    return this.formGroup.get("id");
  }

  set id(id) {
    this.formGroup.setValue({ id: id });
  }

  get last_name() {
    return this.formGroup.get("last_name");
  }

  set last_name(last_name) {
    this.formGroup.setValue({ last_name: last_name });
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

  get doctor_id() {
    return this.formGroup.get("doctor_id");
  }

  get email() {
    return this.formGroup.get("email");
  }

  editPatient(event) {
    event.preventDefault();
    if (this.formGroup.disabled) {
      this.formGroup.enable();
    } else {
      //salviamo le modifiche
      let patient = new Patient();
      patient.id = this.patient.id;
      patient.first_name = this.first_name.value;
      patient.last_name = this.last_name.value;
      patient.tax_code = this.tax_code.value;
      patient.birthday = this.birthday.value;
      patient.place_of_birth = this.place_of_birth.value;
      patient.detail.address = this.address.value;
      patient.detail.city = this.city.value;
      patient.detail.phone_number = this.phone_number.value;
      patient.detail.email = this.email.value;
      patient.detail.doctor_id = this.doctor_id.value;

      this.patientService.update(patient).subscribe(
        response => {
          this.toastr.info("Paziente aggiornato correttamente", "", {
            timeOut: 8000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-warning alert-with-icon",
            positionClass: "toast-top-right"
          });
        },
        error => {
          console.log(error);
        }
      );

      this.formGroup.disable();
    }
  }

  addNewPlan() {
    this.newPlan = true;
  }

  planCreated(plan) {
    this.newPlan = false;
    this.plans.unshift(plan);
  }

  planDeleted(plan) {
    const idx = this.plans.indexOf(plan);
    this.plans.splice(idx, 1);
  }

  getPatientDetail(id: number): Observable<any> {
    return this.patientService.get(id, "detail");
  }

  getPlansData(id: string): Observable<any> {
    return this.planService.searchPlan(id);
  }

  getDoctorsData(): Observable<any> {
    return this.doctorService.getAll(null, "enabled=true");
  }

  getWorkResultsData(): Observable<any> {
    return this.workResultService.getAll(null, "enabled=true");
  }

  getPainData(): Observable<any> {
    return this.painService.getAll(null, "enabled=true");
  }

  getProgramsData(): Observable<any> {
    return this.programService.getAll(null, "enabled=true");
  }

  getTherapiesData(): Observable<any> {
    return this.therapyService.getAll(null, "enabled=true");
  }

  getPhysiotherapistsData(): Observable<any> {
    return this.physiotherapistService.getAll(null, "enabled=true");
  }

  setPatientData(response) {
    this.patient = response["data"][0];
    this.formGroup.patchValue({
      id: this.patient.id,
      last_name: this.patient.last_name,
      first_name: this.patient.first_name,
      tax_code: this.patient.tax_code,
      birthday: Utility.formatDateForDatabase(this.patient.birthday),
      place_of_birth: this.patient.place_of_birth,
      address: this.patient.detail.address,
      city: this.patient.detail.city,
      doctor_id: this.patient.detail.doctor_id,
      phone_number: this.patient.detail.phone_number,
      email: this.patient.detail.email
    });
    this.formGroup.disable();
  }
}
