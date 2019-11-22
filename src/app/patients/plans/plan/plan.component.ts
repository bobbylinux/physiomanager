import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { BehaviorSubject, forkJoin, Subject } from "rxjs";
import { PlanInterface } from "../../../interfaces/plan.interface";
import { Plan } from "../../../classes/plan";
import { PainInterface } from "../../../interfaces/pain.interface";
import { ProgramInterface } from "../../../interfaces/program.interface";
import { WorkResultInterface } from "../../../interfaces/work-result.interface";
import { PhysiotherapistInterface } from "../../../interfaces/physiotherapist.interface";
import { TherapyInterface } from "../../../interfaces/therapy.interface";
import { SessionService } from "../../../services/session.service";
import { PlanService } from "../../../services/plan.service";
import { PatientInterface } from "../../../interfaces/patient.interface";
import { Patient } from "./../../../classes/patient";
import { ToastrService } from "ngx-toastr";
import { Logouttable } from "src/app/classes/logouttable";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { DeletePlanComponent } from "./delete-plan/delete-plan.component";

@Component({
  selector: "app-plan",
  templateUrl: "./plan.component.html",
  styleUrls: ["./plan.component.css"]
})
export class PlanComponent extends Logouttable implements OnInit {
  public admin: boolean = false;
  public loading: boolean = false;
  public savePlanEventsSubject: Subject<void> = new Subject<void>();
  public managePaymentsEventsSubject: Subject<void> = new Subject<void>();
  public _patient = new BehaviorSubject<PatientInterface>(new Patient());
  public _plan = new BehaviorSubject<PlanInterface>(new Plan());
  public _newPlan = new BehaviorSubject<boolean>(false);
  public _pains = new BehaviorSubject<PainInterface[]>([]);
  public _programs = new BehaviorSubject<ProgramInterface[]>([]);
  public _workResults = new BehaviorSubject<WorkResultInterface[]>([]);
  public _physiotherapists = new BehaviorSubject<PhysiotherapistInterface[]>(
    []
  );
  public _therapies = new BehaviorSubject<TherapyInterface[]>([]);

  public sessions = [];
  public totalAmount = 0;

  @Output()
  onCreatedPlan = new EventEmitter<PlanInterface>();

  @Output()
  onDeletedPlan = new EventEmitter<PlanInterface>();

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
      for (let session of this.sessions) {
        this.totalAmount += parseFloat(session.price.toString());
      }
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
    if (value) {
      this.plan = new Plan();
    }
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
  constructor(
    private planService: PlanService,
    private sessionService: SessionService,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.admin = user.admin;
  }

  addTherapyToSessions(session) {
    this.sessions.push(session);
    this.totalAmount += parseFloat(session.price.toString());
  }

  mapPlanObject() {
    this.savePlanEventsSubject.next();
  }

  managePayments() {
    this.managePaymentsEventsSubject.next();
  }

  savePlan(plan: PlanInterface) {
    if (this.newPlan) {
      plan.patient_id = this.patient.id;
      this.planService.create(plan).subscribe(
        response => {
          this.toastr.info("Scheda aggiunta correttamente", "", {
            timeOut: 8000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-primary alert-with-icon",
            positionClass: "toast-top-right"
          });

          plan = response["data"][0];
          if (this.sessions.length > 0) {
            for (let session of this.sessions) {
              session.plan_id = plan.id;
              this.sessionService.create(session).subscribe(
                () => {
                  plan.sessions = this.sessions;
                  this.newPlan = false;
                  this.onCreatedPlan.emit(plan);
                },
                error => {
                  if (error.status && error.status == 401) {
                    this.logout(this.auth, this.router, this.toastr);
                  } else {
                    this.toastr.info(
                      "Errore in fase di aggiunta della sessione",
                      "",
                      {
                        timeOut: 8000,
                        closeButton: true,
                        enableHtml: true,
                        toastClass: "alert alert-warning alert-with-icon",
                        positionClass: "toast-top-right"
                      }
                    );
                  }
                  this.loading = false;
                }
              );
            }
          } else {
            this.onCreatedPlan.emit(plan);
          }
        },
        error => {
          if (error.status && error.status == 401) {
            this.logout(this.auth, this.router, this.toastr);
          } else {
            this.toastr.info("Errore in fase di aggiunta della scheda", "", {
              timeOut: 8000,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-warning alert-with-icon",
              positionClass: "toast-top-right"
            });
          }
        }
      );
    } else {
      this.planService.update(plan).subscribe(
        () => {
          this.toastr.info("Scheda aggiornata correttamente", "", {
            timeOut: 8000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-primary alert-with-icon",
            positionClass: "toast-top-right"
          });

          this.sessionService.search("plan_id=" + plan.id, "").subscribe(
            response => {
              let observables = new Array();
              for (let session of response["data"]) {
                observables.push(this.sessionService.delete(session.id));
              }
              if (observables.length > 0) {
                forkJoin(observables).subscribe(
                  () => {
                    for (let session of this.sessions) {
                      session.plan_id = plan.id;
                      this.sessionService.create(session).subscribe(
                        () => {},
                        error => {
                          if (error.status && error.status == 401) {
                            this.logout(this.auth, this.router, this.toastr);
                          } else {
                            this.toastr.info(
                              "Errore in fase di caricamento delle sessioni",
                              "",
                              {
                                timeOut: 8000,
                                closeButton: true,
                                enableHtml: true,
                                toastClass:
                                  "alert alert-warning alert-with-icon",
                                positionClass: "toast-top-right"
                              }
                            );

                            this.loading = false;
                          }
                        }
                      );
                    }
                  },
                  error => {
                    if (error.status && error.status == 401) {
                      this.logout(this.auth, this.router, this.toastr);
                    } else {
                      this.toastr.info(
                        "Errore in fase di caricamento delle sessioni",
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
              } else {
                if (this.sessions.length > 0) {
                  for (let session of this.sessions) {
                    session.plan_id = plan.id;
                    this.sessionService.create(session).subscribe(
                      () => {},
                      error => {
                        if (error.status && error.status == 401) {
                          this.logout(this.auth, this.router, this.toastr);
                        } else {
                          this.toastr.info(
                            "Errore in fase di aggiunta della sessione",
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
                }
              }
            },
            error => {
              if (error.status && error.status == 401) {
                this.logout(this.auth, this.router, this.toastr);
              } else {
                this.toastr.info(
                  "Errore in fase di aggiornamento della scheda",
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
        },
        error => {
          if (error.status && error.status == 401) {
            this.logout(this.auth, this.router, this.toastr);
          } else {
            this.toastr.info(
              "Errore in fase di aggiornamento della scheda",
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
  }

  deletePlanConfirmation(plan: PlanInterface) {
    const dialogRef = this.dialog.open(DeletePlanComponent, {
      data: {
        plan: plan
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "delete") {
        this.deletePlan(plan);
      }
    });
  }

  deletePlan(plan: PlanInterface) {
    this.planService.delete(plan.id).subscribe(
      () => {
        this.toastr.info("Scheda eliminata correttamente", "", {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: "toast-top-right"
        });
        this.loading = false;
        this.onDeletedPlan.emit(plan);
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info("Errore in fase di eliminazione della scheda", "", {
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

  deleteSession(session) {
    this.totalAmount -= parseFloat(session.price.toString());
  }
}
