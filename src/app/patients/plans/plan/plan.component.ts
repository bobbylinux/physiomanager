import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { PlanInterface } from '../../../interfaces/plan.interface';
import { Plan } from '../../../classes/plan';
import { MobilityInterface } from '../../../interfaces/mobility.interface';
import { PainInterface } from '../../../interfaces/pain.interface';
import { ProgramInterface } from '../../../interfaces/program.interface';
import { WorkResultInterface } from '../../../interfaces/work-result.interface';
import { PhysiotherapistInterface } from '../../../interfaces/physiotherapist.interface';
import { TherapyInterface } from '../../../interfaces/therapy.interface';
import { SessionService } from '../../../services/session.service';
import { PlanService } from '../../../services/plan.service';
import { PatientInterface } from '../../../interfaces/patient.interface';
import { Patient } from './../../../classes/patient';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  private _patient = new BehaviorSubject<PatientInterface>(new Patient());
  private _plan = new BehaviorSubject<PlanInterface>(new Plan());
  private _newPlan = new BehaviorSubject<boolean>(false);
  private _mobilities = new BehaviorSubject<MobilityInterface[]>([]);
  private _pains = new BehaviorSubject<PainInterface[]>([]);
  private _programs = new BehaviorSubject<ProgramInterface[]>([]);
  private _workResults = new BehaviorSubject<WorkResultInterface[]>([]);
  private _physiotherapists = new BehaviorSubject<PhysiotherapistInterface[]>([]);
  private _therapies = new BehaviorSubject<TherapyInterface[]>([]);

  private sessions = [];

  @Input()
  set patient(value) {
    this._patient.next(value);
  }
  get patient() {
    return this._patient.getValue();
  }
  @Input()
  set plan(value) {
    this._plan.next(value);
    if (this.plan && this.plan.sessions) {
      this.sessions = this.plan.sessions;
    } else {
      this.sessions = [];
    }
  }
  get plan() {
    return this._plan.getValue();
  }
  @Input()
  set newPlan(value) {
    this._newPlan.next(value);
  }
  get newPlan() {
    return this._newPlan.getValue();
  }
  @Input()
  set pains(value) {
    this._pains.next(value);
  }
  get pains() {
    return this._pains.getValue();
  }
  @Input()
  set workResults(value) {
    this._workResults.next(value);
  }
  get workResults() {
    return this._workResults.getValue();
  }
  @Input()
  set mobilities(value) {
    this._mobilities.next(value);
  }
  get mobilities() {
    return this._mobilities.getValue();
  }
  @Input()
  set programs(value) {
    this._programs.next(value);
  }
  get programs() {
    return this._programs.getValue();
  }
  @Input()
  set physiotherapists(value) {
    this._physiotherapists.next(value);
  }
  get physiotherapists() {
    return this._physiotherapists.getValue();
  }
  @Input()
  set therapies(value) {
    this._therapies.next(value);
  }
  get therapies() {
    return this._therapies.getValue();
  }
  constructor(private planService: PlanService, private sessionService: SessionService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  addTherapyToSessions(session) {
    this.sessions.push(session);
    console.log("pushed", session, this.sessions);
  }

  savePlan(plan: PlanInterface) {
    if (this.newPlan) {
      plan.patient_id = this.patient.id;
      this.planService.create(plan).subscribe(
        response => {
          this.toastr.info('Scheda aggiornata correttamente', '', {
            timeOut: 8000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-warning alert-with-icon",
            positionClass: 'toast-top-right'
          });

          let planId = response['data'].id;

          if (this.sessions.length > 0) {
            for (let session of this.sessions) {
              session.plan_id = planId;
              //ora devo salvare le sessioni
              this.sessionService.create(session).subscribe(
                () => {
                  plan.sessions = this.sessions;
                  //this.plans.push(plan);
                  this.newPlan = false;
                },
                error => {
                  console.log(error);
                }
              )
            }
          } else {
            //this.plans.push(plan);
          }

        },
        error => {
          console.log(error);
        }
      );
    } else {
      //modifica scheda
      console.log(this.sessions);
      this.planService.update(plan).subscribe(
        () => {
          this.toastr.info('Scheda aggiornata correttamente', '', {
            timeOut: 8000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-warning alert-with-icon",
            positionClass: 'toast-top-right'
          });

          this.sessionService.search('plan_id=' + plan.id, '').subscribe(response => {
            let observables = new Array();
            for (let session of response['data']) {
              observables.push(this.sessionService.delete(session.id));
            }
            if (observables.length > 0) {
              forkJoin(observables).subscribe(
                () => {
                  for (let session of this.sessions) {
                    session.plan_id = plan.id;
                    this.sessionService.create(session).subscribe(
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
                    error => {
                      console.log(error);
                    }
                  );
                }
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