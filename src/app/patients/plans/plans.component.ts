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
import { SessionService } from '../../services/session.service';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../../classes/patient';
import { Plan } from '../../classes/plan';
import { WorkResult } from '../../classes/work-result';
import { Pain } from '../../classes/pain';
import { Mobility } from '../../classes/mobility';
import { Program } from '../../classes/program';
import { Therapy } from '../../classes/therapy';
import { Physiotherapist } from '../../classes/physiotherapist';
import { SessionInterface } from '../../interfaces/session.interface';
import { PlanInterface } from '../../interfaces/plan.interface';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  newPlan: boolean = false;
  patient: Patient;
  plans: Plan[];
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
    email: new FormControl()
  });

  constructor(private patientService: PatientService,
    private planService: PlanService,
    private workResultService: WorkResultService,
    private mobilityService: MobilityService,
    private painService: PainService,
    private programService: ProgramService,
    private therapyService: TherapyService,
    private physiotherapistService: PhysiotherapistService,
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {
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
                  'birthday': this.formatDate(this.patient.birthday),
                  'place_of_birth': this.patient.place_of_birth,
                  'address': this.patient.detail.address,
                  'city': this.patient.detail.city,
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
            this.sessions = [];
          },
          error => {
            console.log(error);
          }
        );
        /* risultati del lavoro */
        this.workResultService.getAll('').subscribe(
          response => {
            if (response['data'].length > 0) {
              this.workResults = response['data'];
            }
          },
          error => {
            console.log(error);
          }
        );
        /* mobilità */
        this.mobilityService.getAll('').subscribe(
          response => {
            if (response['data'].length > 0) {
              this.mobilities = response['data'];
            }
          },
          error => {
            console.log(error);
          }
        );
        /* indici di dolore */
        this.painService.getAll('').subscribe(
          response => {
            if (response['data'].length > 0) {
              this.pains = response['data'];
            }
          },
          error => {
            console.log(error);
          }
        );
        /* programmi */
        this.programService.getAll('').subscribe(
          response => {
            if (response['data'].length > 0) {
              this.programs = response['data'];
            }
          },
          error => {
            console.log(error);
          }
        );
        /* terapie */
        this.therapyService.getAll('').subscribe(
          response => {
            if (response['data'].length > 0) {
              this.therapies = response['data'];
            }
          },
          error => {
            console.log(error);
          }
        );
        /* fisioterapisti */
        this.physiotherapistService.getAll('').subscribe(
          response => {
            if (response['data'].length > 0) {
              this.physiotherapists = response['data'];
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

  formatDate(date: string) {
    let day = date.substr(0, 2);
    let month = date.substr(3, 2);
    let year = date.substr(6, 4);
    return year + "-" + month + "-" + day;
  }

  editPatient(event) {
    event.preventDefault();
    if (this.formGroup.disabled) {
      this.formGroup.enable();
    } else {
      //salviamo le modifiche
      this.formGroup.disable();
    }
  }

  addNewPlan() {
    this.newPlan = true;
  }

  addTherapyToSessions(session) {
    this.session = session;
    this.sessions.push(session);
  }

  savePlan(plan: PlanInterface) {
    if (this.newPlan) {
      plan.patient_id = this.patient.id;
      this.planService.create(plan).subscribe(
        response => {
          let planId = response['data'].id;

          if (this.sessions.length > 0) {
            for (let session of this.sessions) {
              session.plan_id = planId;
              //ora devo salvare le sessioni
              this.sessionService.create(session).subscribe(
                () => {
                  plan.sessions = this.sessions;
                  this.plans.push(plan);
                  this.newPlan = false;
                },
                error => {
                  console.log(error);
                }
              )
            }
          } else {
            this.plans.push(plan);
          }

        },
        error => {
          console.log(error);
        }
      );
    } else {
      //modifica scheda
      this.planService.update(plan).subscribe(
        () => {
          this.sessionService.getAll('').subscribe(response => {
            let observables = new Array();
            for (let session of response['data']) {
              observables.push(this.sessionService.delete(session.id));
            }
            if (observables.length > 0) {
              forkJoin(observables).subscribe(
                response => {
                  for (let session of this.sessions) {
                    this.sessionService.create(session).subscribe(
                      () => {
                        this.toastr.info('Scheda aggiornata correttamente', '', {
                          timeOut: 8000,
                          closeButton: true,
                          enableHtml: true,
                          toastClass: "alert alert-info alert-with-icon",
                          positionClass: 'toast-top-right'
                        });
                      },
                      error => {
                        console.log(error);
                      }
                    );
                  }
                },
                error => {
                  console.log(error);
                }
              );
            } else {
              if (this.sessions.length > 0) {
                for (let session of this.sessions) {
                  session.plan_id = plan.id;
                  this.sessionService.create(session).subscribe(
                    () => {
                      this.toastr.info('Scheda aggiornata correttamente', '', {
                        timeOut: 8000,
                        closeButton: true,
                        enableHtml: true,
                        toastClass: "alert alert-info alert-with-icon",
                        positionClass: 'toast-top-right'
                      });
                    },
                    error => {
                      console.log(error);
                    }
                  );
                }
              } else { 
                this.toastr.info('Scheda aggiornata correttamente', '', {
                  timeOut: 8000,
                  closeButton: true,
                  enableHtml: true,
                  toastClass: "alert alert-info alert-with-icon",
                  positionClass: 'toast-top-right'
                });
              }
            }
          }, error => {
            console.log(error);
          });
        },
        error => {
          console.log(error);
        }
      )
    }
  }
}
