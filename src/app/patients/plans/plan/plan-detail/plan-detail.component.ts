import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
import { PainInterface } from "./../../../../interfaces/pain.interface";
import { WorkResultInterface } from "./../../../../interfaces/work-result.interface";
import { ProgramInterface } from "./../../../../interfaces/program.interface";

import { PlanInterface } from "../../../../interfaces/plan.interface";
import { Plan } from "../../../../classes/plan";
import { Utility } from "src/app/classes/utility";
import { MatDialog } from "@angular/material";
import { PaymentTypeService } from "src/app/services/registers/payment-type.service";
import { PaymentService } from "./../../../../services/payment.service";
import { PaymentTypeInterface } from "./../../../../interfaces/payment-type.interface";
import { PaymentInterface } from "src/app/interfaces/payment.interface";
import { SessionInterface } from "./../../../../interfaces/session.interface";
import { PaymentsComponent } from "../../payments/payments.component";
import { PaymentType } from "src/app/classes/payment-type";
import { Logouttable } from "src/app/classes/logouttable";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-plan-detail",
  templateUrl: "./plan-detail.component.html",
  styleUrls: ["./plan-detail.component.css"]
})
export class PlanDetailComponent extends Logouttable implements OnInit {
  private savePlanEventsSubscription: any;
  private managePaymentsEventsSubscription: any;
  @Input() savePlanEvent: Observable<void>;
  @Input() managePaymentsEvent: Observable<void>;
  @Input() public loading: boolean = false;
  private _plan = new BehaviorSubject<PlanInterface>(new Plan());
  private _sessions = new BehaviorSubject<SessionInterface[]>([]);
  private _newPlan = new BehaviorSubject<boolean>(false);
  private _pains = new BehaviorSubject<PainInterface[]>([]);
  private _programs = new BehaviorSubject<ProgramInterface[]>([]);
  private _workResults = new BehaviorSubject<WorkResultInterface[]>([]);
  @Output() clickOnSavePlan = new EventEmitter();
  @Output() clickOnDeletePlan = new EventEmitter();
  planFormGroup = new FormGroup({
    pathological_conditions: new FormControl(),
    note: new FormControl(),
    program: new FormControl(),
    privacy: new FormControl(),
    medical_certificate: new FormControl(),
    work_result_id: new FormControl(),
    pain_id: new FormControl(),
    final_report: new FormControl()
  });

  privacyOptions = [
    { id: true, text: "Sì" },
    { id: false, text: "No" }
  ];
  medicalCertificateOptions = [
    { id: true, text: "Sì" },
    { id: false, text: "No" }
  ];

  @Input()
  set sessions(value) {
    this._sessions.next(value);
  }
  get sessions() {
    return this._sessions.getValue();
  }

  @Input()
  set plan(value) {
    this._plan.next(value);
    if (this.plan) {
      this.planFormGroup.patchValue({
        pathological_conditions: this.plan.pathological_conditions,
        program: this.plan.program,
        note: this.plan.note,
        privacy: this.plan.privacy,
        medical_certificate: this.plan.medical_certificate,
        pain_id: this.plan.pain_id,
        work_result_id: this.plan.work_result_id,
        final_report: this.plan.final_report
      });
      if (this.plan.created_at != null) {
        this.plan.created_at.date = Utility.formatDateTime(
          this.plan.created_at.date
        );
      }
    }
  }
  get plan() {
    return this._plan.getValue();
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
  set newPlan(value) {
    this._newPlan.next(value);
    if (value) {
      this.plan = new Plan();
    }
  }
  get newPlan() {
    return this._newPlan.getValue();
  }

  constructor(
    private dialog: MatDialog,
    private paymentTypeService: PaymentTypeService,
    private paymentService: PaymentService,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    super();
  }

  ngOnInit() {
    this.savePlanEventsSubscription = this.savePlanEvent.subscribe(() => {
      this.savePlan();
    });
    this.managePaymentsEventsSubscription = this.managePaymentsEvent.subscribe(
      () => {
        this.managePayments();
      }
    );
  }

  selectProgram(event) {
    const selectedId = event.target.value;
    const program = this.programs.find(x => x.id == selectedId);
    this.planFormGroup.patchValue({ program: program.description.toString() });
  }

  savePlan() {
    this.loading = true;
    let plan = new Plan();
    plan.id = this.plan ? this.plan.id : 0;
    plan.patient_id = this.plan.patient_id;
    plan.pathological_conditions = this.planFormGroup.get(
      "pathological_conditions"
    ).value;
    plan.note = this.planFormGroup.get("note").value;
    plan.program = this.planFormGroup.get("program").value;
    plan.privacy = this.planFormGroup.get("privacy").value;
    plan.medical_certificate = this.planFormGroup.get(
      "medical_certificate"
    ).value;
    plan.pain_id =
      parseInt(this.planFormGroup.get("pain_id").value) == 0
        ? null
        : parseInt(this.planFormGroup.get("pain_id").value);
    plan.work_result_id =
      parseInt(this.planFormGroup.get("work_result_id").value) == 0
        ? null
        : parseInt(this.planFormGroup.get("work_result_id").value);
    plan.final_report = this.planFormGroup.get("final_report").value;
    this.clickOnSavePlan.emit(plan);
  }

  managePayments() {
    let paymentTypes: PaymentTypeInterface[];
    let payments: PaymentInterface[];
    let sessions = this.sessions;
    let total = 0;
    for (let session of sessions) {
      total += +session.price;
    }
    this.paymentTypeService.getAll(null, "enabled=true").subscribe(
      response => {
        if (response["data"].length > 0) {
          paymentTypes = response["data"];
          if (paymentTypes) {
            const emptyItemPaymentType: PaymentTypeInterface = new PaymentType();
            paymentTypes.unshift(emptyItemPaymentType);
          }
          this.paymentService
            .getAll("payment_type", "plan_id=" + this.plan.id)
            .subscribe(response => {
              payments = response["data"];

              this.dialog.open(PaymentsComponent, {
                height: "80%",
                width: "60%",
                data: {
                  planId: this.plan.id,
                  paymentTypes: paymentTypes,
                  payments: payments,
                  paymentService: this.paymentService,
                  total: total
                }
              });
            });
        }
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info(
            "Errore in fase di caricamento dei tipi di pagamento",
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
      }
    );
  }

  ngOnDestroy() {
    this.savePlanEventsSubscription.unsubscribe();
    this.managePaymentsEventsSubscription.unsubscribe();
  }
}
