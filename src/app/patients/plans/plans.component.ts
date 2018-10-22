import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { PlanService } from '../../services/plan.service';
import { WorkResultService } from '../../services/work-result.service';
import { MobilityService } from '../../services/mobility.service';
import { PainService } from '../../services/pain.service';
import { ProgramService } from '../../services/registers/program.service';
import { TherapyService } from '../../services/registers/therapy.service';
import { PhysiotherapistService } from '../../services/registers/physiotherapist.service';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../../classes/patient';
import { WorkResult } from '../../classes/work-result';
import { Pain } from '../../classes/pain';
import { Mobility } from '../../classes/mobility';
import { Program } from '../../classes/program';
import { Therapy } from '../../classes/therapy';
import { Physiotherapist } from '../../classes/physiotherapist';
import { SessionInterface } from '../../interfaces/session.interface';
import { PlanInterface } from './../../interfaces/plan.interface';
import { ProgramInterface } from '../../interfaces/program.interface';
import { MobilityInterface } from '../../interfaces/mobility.interface';
import { WorkResultInterface } from '../../interfaces/work-result.interface';
import { PainInterface } from '../../interfaces/pain.interface';
import { PhysiotherapistInterface } from '../../interfaces/physiotherapist.interface';
import { TherapyInterface } from './../../interfaces/therapy.interface';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from './../../services/registers/doctor.service';
import { DoctorInterface } from './../../interfaces/doctor.interface';
import { Utility } from './../../classes/utility';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  newPlan: boolean = false;
  patient: Patient;
  plans: PlanInterface[] = [];
  doctors: DoctorInterface[] = [];
  workResults: WorkResult[];
  pains: Pain[];
  mobilities: Mobility[];
  programs: Program[];
  therapies: Therapy[];
  physiotherapists: Physiotherapist[];
  sessions: SessionInterface[] = [];
  session: SessionInterface;
  formDisabled: boolean = true;

  sexOptions = [
    { id: 'M', text: 'Maschio' },
    { id: 'F', text: 'Femmina' }
  ];

  formGroup = new FormGroup({
    patient_id: new FormControl(),
    last_name: new FormControl(),
    first_name: new FormControl(),
    tax_code: new FormControl(),
    sex: new FormControl(),
    birthday: new FormControl(),
    place_of_birth: new FormControl(),
    address: new FormControl(),
    city: new FormControl(),
    phone_number: new FormControl(),
    email: new FormControl(),
    doctor_id: new FormControl()
  });

  constructor(private patientService: PatientService,
    private planService: PlanService,
    private doctorService: DoctorService,
    private workResultService: WorkResultService,
    private mobilityService: MobilityService,
    private painService: PainService,
    private programService: ProgramService,
    private therapyService: TherapyService,
    private physiotherapistService: PhysiotherapistService,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.sessions = [];
    this.patient = new Patient();
    this.route.params.subscribe(
      (params) => {
        if (!params.id) {
          return;
        }
        /* dettaglio paziente */
        this.patientService.get(params.id, 'detail').subscribe(
          response => {
            if (response['data'].length > 0) {
              this.patient = response['data'][0];
              this.formGroup.patchValue(
                {
                  'id': this.patient.id,
                  'last_name': this.patient.last_name,
                  'first_name': this.patient.first_name,
                  'tax_code': this.patient.tax_code,
                  'sex': this.patient.sex,
                  'birthday': Utility.formatDate(this.patient.birthday),
                  'place_of_birth': this.patient.place_of_birth,
                  'address': this.patient.detail.address,
                  'city': this.patient.detail.city,
                  'doctor_id': this.patient.detail.doctor_id,
                  'phone_number': this.patient.detail.phone_number,
                  'email': this.patient.detail.email
                }
              );

              this.formGroup.disable();
            }
          },
          error => {
            console.log(error);
          }
        );
        /* cicli */
        this.planService.searchPlan(params.id).subscribe(
          response => {
            if (response['data'].length > 0) {
              this.plans = response['data'];
              this.newPlan = false;
            } else {
              this.plans = [];
              this.newPlan = true;
            }

          },
          error => {
            console.log(error);
          }
        );
        /* medici */
        this.doctorService.getAll(null, 'enabled=true').subscribe(
          response => {
            this.doctors = response['data'];
          }
        )
        /* risultati del lavoro */
        this.workResultService.getAll(null, 'enabled=true').subscribe(
          response => {
            if (response['data'].length > 0) {
              this.workResults = response['data'];
              if (this.workResults) {
                const emptyItemWorkResult: WorkResultInterface = new WorkResult();
                this.workResults.unshift(emptyItemWorkResult);
              }
            }
          },
          error => {
            console.log(error);
          }
        );
        /* mobilità */
        this.mobilityService.getAll(null, 'enabled=true').subscribe(
          response => {
            if (response['data'].length > 0) {
              this.mobilities = response['data'];
              if (this.mobilities) {
                const emptyItemMobility: MobilityInterface = new Mobility();
                this.mobilities.unshift(emptyItemMobility);
              }
            }
          },
          error => {
            console.log(error);
          }
        );
        /* indici di dolore */
        this.painService.getAll(null, 'enabled=true').subscribe(
          response => {
            if (response['data'].length > 0) {
              this.pains = response['data'];
              if (this.pains) {
                const emptyItemPain: PainInterface = new Pain();
                this.pains.unshift(emptyItemPain);
              }
            }
          },
          error => {
            console.log(error);
          }
        );
        /* programmi */
        this.programService.getAll(null, 'enabled=true').subscribe(
          response => {
            if (response['data'].length > 0) {
              this.programs = response['data'];
              if (this.programs) {
                const emptyItemProgram: ProgramInterface = new Program();
                this.programs.unshift(emptyItemProgram);
              }
            }
          },
          error => {
            console.log(error);
          }
        );
        /* terapie */
        this.therapyService.getAll(null, 'enabled=true').subscribe(
          response => {
            if (response['data'].length > 0) {
              this.therapies = response['data'];
              if (this.therapies) {
                const emptyTherapy: TherapyInterface = new Therapy();
                this.therapies.unshift(emptyTherapy);
              }
            }
          },
          error => {
            console.log(error);
          }
        );
        /* fisioterapisti */
        this.physiotherapistService.getAll(null, 'enabled=true').subscribe(
          response => {
            if (response['data'].length > 0) {
              this.physiotherapists = response['data'];
              if (this.physiotherapists) {
                const emptyItemPhysiotherapis: PhysiotherapistInterface = new Physiotherapist();
                this.physiotherapists.unshift(emptyItemPhysiotherapis);
              }
            }
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  get id() {
    return this.formGroup.get('id');
  }

  set id(id) {
    this.formGroup.setValue({ 'id': id });
  }

  get last_name() {
    return this.formGroup.get('last_name');
  }

  set last_name(last_name) {
    this.formGroup.setValue({ 'last_name': last_name });
  }

  get first_name() {
    return this.formGroup.get('first_name');
  }

  get tax_code() {
    return this.formGroup.get('tax_code');
  }

  get sex() {
    return this.formGroup.get('sex');
  }

  get birthday() {
    return this.formGroup.get('birthday');
  }

  get place_of_birth() {
    return this.formGroup.get('place_of_birth');
  }

  get address() {
    return this.formGroup.get('address');
  }

  get city() {
    return this.formGroup.get('city');
  }

  get phone_number() {
    return this.formGroup.get('phone_number');
  }

  get email() {
    return this.formGroup.get('email');
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
      patient.sex = this.sex.value;
      patient.birthday = this.birthday.value;
      patient.place_of_birth = this.place_of_birth.value;
      patient.detail.address = this.address.value;
      patient.detail.city = this.city.value;
      patient.detail.phone_number = this.phone_number.value;
      patient.detail.email = this.email.value;

      this.patientService.update(patient).subscribe(
        response => {
          this.toastr.info('Paziente aggiornato correttamente', '', {
            timeOut: 8000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-warning alert-with-icon",
            positionClass: 'toast-top-right'
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

}
