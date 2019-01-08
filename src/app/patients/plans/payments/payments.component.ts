import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogDataInterface } from 'src/app/interfaces/dialog-data.interface';
import { PaymentService } from './../../../services/payment.service';
import { PaymentTypeService } from './../../../services/registers/payment-type.service';
import { PaymentTypeInterface } from './../../../interfaces/payment-type.interface';
import { PaymentInterface } from 'src/app/interfaces/payment.interface';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  private selectedPaymentType: PaymentTypeInterface;
  private paymentTypes: PaymentTypeInterface[];
  private payments: PaymentInterface[];
  private paymentService: PaymentService;
  private planId: number;

  constructor(public dialogRef: MatDialogRef<PaymentsComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogDataInterface) { }


  ngOnInit() {
    this.paymentService = this.data.paymentService;
    this.planId = this.data.planId;
    this.payments = this.data.payments; 
    this.paymentTypes = this.data.paymentTypes;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  selectPaymentType(event) {
    const selectedId = event.target.value;
    this.selectedPaymentType =  this.paymentTypes.find(x => x.id == selectedId);
  }
}
