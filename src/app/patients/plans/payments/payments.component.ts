import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PaymentService } from './../../../services/payment.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentTypeInterface } from './../../../interfaces/payment-type.interface';
import { PaymentInterface } from 'src/app/interfaces/payment.interface';
import { Payment } from 'src/app/classes/payment';
import { forkJoin } from 'rxjs';
import { DialogDataPaymentsInterface } from 'src/app/interfaces/dialog_data/dialog-data-payments.interface';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  private selectedPaymentType: PaymentTypeInterface;
  public paymentTypes: PaymentTypeInterface[];
  public payments: PaymentInterface[];
  public paymentService: PaymentService;
  public planId: number;
  public amount: number;
  public payment_type: number;
  public note: string;
  public total: number;
  public totalPayments: number;

  constructor(private toastr: ToastrService, public dialogRef: MatDialogRef<PaymentsComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogDataPaymentsInterface) { }


  ngOnInit() {
    this.paymentService = this.data.paymentService;
    this.planId = this.data.planId;
    this.payments = this.data.payments; 
    this.paymentTypes = this.data.paymentTypes;
    this.total = this.data.total;
    this.totalPayments = 0.00;
    this.calculateTotal();
    
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
    this.selectedPaymentType =  this.paymentTypes.find(x => x.id == selectedId);
  }

  addPaymentToPlan() {
    let payment: PaymentInterface = new Payment();
    payment.plan_id = this.planId;
    payment.amount = this.amount;
    payment.note = this.note;
    payment.payment_type_id = this.payment_type;
    payment.payment_type = this.selectedPaymentType;
    this.totalPayments += +this.amount;


    this.paymentService.create(payment).subscribe(
      response => {
        this.amount = null;
        this.note = "";
        this.payment_type = null;        
        let payment = response['data'][0];
        payment.payment_type = this.selectedPaymentType;
        console.log(payment);
        this.payments.push(payment);
        console.log("payments", this.payments);
        this.toastr.info('Pagamento inserito correttamente', '', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-warning alert-with-icon",
          positionClass: 'toast-top-right'
        });
      },
      error => {
        console.log(error);
        this.toastr.info('Errore in fase di inserimento del pagamento', '', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-warning alert-with-icon",
          positionClass: 'toast-top-right'
        });
      }
    );
  }

  showToastDeletedPayment() {
    this.toastr.info('Pagamento eliminato correttamente', '', {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-warning alert-with-icon",
      positionClass: 'toast-top-right'
    });
  }

  showToastDeletedPaymentError() {
    this.toastr.info('Errore in fase di eliminazione del pagamento', '', {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-warning alert-with-icon",
      positionClass: 'toast-top-right'
    });
  }

  deletePayment(payment) {
    const idx = this.payments.indexOf(payment);
    this.payments.splice(idx, 1);
    this.totalPayments -= +payment.amount;
    this.paymentService.search('plan_id=' + this.planId, '').subscribe(response => {
      let observables = new Array();
      for (let oldPayment of response['data']) {
        observables.push(this.paymentService.delete(oldPayment.id));
      }
      if (observables.length > 0) {
        forkJoin(observables).subscribe(
          () => {
            this.showToastDeletedPayment();
            for (let newPayment of this.payments) {
              newPayment.plan_id = this.planId;
              this.paymentService.create(newPayment).subscribe(
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
        if (this.payments.length > 0) {
          for (let newPayment of this.payments) {
            newPayment.plan_id = this.planId;
            this.paymentService.create(newPayment).subscribe(
              error => {
                console.log(error);
              }
            );
          }
        } else {
          this.showToastDeletedPayment();
        }
      }
    }, error => {
      console.log(error);
    });
  }
}
