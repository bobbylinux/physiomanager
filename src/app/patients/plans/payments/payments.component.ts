import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { PaymentService } from "./../../../services/payment.service";
import { ToastrService } from "ngx-toastr";
import { PaymentTypeInterface } from "./../../../interfaces/payment-type.interface";
import { PaymentInterface } from "src/app/interfaces/payment.interface";
import { Payment } from "src/app/classes/payment";
import { forkJoin } from "rxjs";
import { DialogDataPaymentsInterface } from "src/app/interfaces/dialog_data/dialog-data-payments.interface";
import { Logouttable } from "src/app/classes/logouttable";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-payments",
  templateUrl: "./payments.component.html",
  styleUrls: ["./payments.component.css"]
})
export class PaymentsComponent extends Logouttable implements OnInit {
  public loading: boolean = false;
  public selectedPaymentType: PaymentTypeInterface;
  public paymentTypes: PaymentTypeInterface[];
  public payments: PaymentInterface[];
  public paymentService: PaymentService;
  public planId: number;
  public amount: number;
  public payment_type: number;
  public note: string;
  public total: number;
  public totalPayments: number;

  constructor(
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<PaymentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataPaymentsInterface,
    private auth: AuthService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.paymentService = this.data.paymentService;
    this.planId = this.data.planId;
    this.payments = this.data.payments;
    this.paymentTypes = this.data.paymentTypes;
    this.total = this.data.total;
    this.totalPayments = 0.0;
    this.calculateTotal();
    console.log("data pagamenti", this.data.payments);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  calculateTotal() {
    for (let payment of this.payments) {
      this.totalPayments += +payment.amount;
    }
  }
  selectPaymentType(event) {
    const selectedId = event.target.value;
    this.selectedPaymentType = this.paymentTypes.find(x => x.id == selectedId);
  }

  addPaymentToPlan() {
    this.loading = true;
    let payment: PaymentInterface = new Payment();
    payment.plan_id = this.planId;
    payment.amount = this.amount;
    payment.note = this.note;
    payment.payment_type_id = this.payment_type;
    payment.payment_type = this.selectedPaymentType;

    this.paymentService.create(payment).subscribe(
      response => {
        this.totalPayments += +this.amount;
        this.amount = null;
        this.note = "";
        this.payment_type = null;
        let payment = response["data"][0];
        payment.payment_type = this.selectedPaymentType;
        this.payments.push(payment);
        this.loading = false;
        this.toastr.info("Pagamento inserito correttamente", "", {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: "toast-top-right"
        });
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info("Errore in fase di aggiunta del pagamento", "", {
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

  showToastDeletedPayment() {
    this.loading = false;
    this.toastr.info("Pagamento eliminato correttamente", "", {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-warning alert-with-icon",
      positionClass: "toast-top-right"
    });
  }

  showToastDeletedPaymentError() {
    this.loading = false;
    this.toastr.info("Errore in fase di eliminazione del pagamento", "", {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-warning alert-with-icon",
      positionClass: "toast-top-right"
    });
  }

  deletePayment(payment) {
    this.loading = true;
    const idx = this.payments.indexOf(payment);
    this.payments.splice(idx, 1);
    this.totalPayments -= +payment.amount;
    this.paymentService.search("plan_id=" + this.planId, "").subscribe(
      response => {
        let observables = new Array();
        for (let oldPayment of response["data"]) {
          observables.push(this.paymentService.delete(oldPayment.id));
        }
        if (observables.length > 0) {
          forkJoin(observables).subscribe(
            () => {
              this.showToastDeletedPayment();
              for (let newPayment of this.payments) {
                newPayment.plan_id = this.planId;
                this.paymentService.create(newPayment).subscribe(error => {
                  console.log(error);
                });
              }
            },
            error => {
              this.showToastDeletedPaymentError();
            }
          );
        } else {
          if (this.payments.length > 0) {
            for (let newPayment of this.payments) {
              newPayment.plan_id = this.planId;
              this.paymentService.create(newPayment).subscribe(
                () => {},
                error => {
                  this.showToastDeletedPaymentError();
                }
              );
            }
          } else {
            this.showToastDeletedPayment();
          }
        }
      },
      error => {
        this.showToastDeletedPaymentError();
      }
    );
  }
}
