import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogDataInterface } from 'src/app/interfaces/dialog-data.interface';
import { PaymentService } from './../../../services/payment.service';
import { PaymentTypeService } from './../../../services/registers/payment-type.service';
import { PaymentTypeInterface } from './../../../interfaces/payment-type.interface';
import { PaymentType } from 'src/app/classes/payment-type';
import { PaymentInterface } from 'src/app/interfaces/payment.interface';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  private paymentTypes: PaymentTypeInterface[];
  private payments: PaymentInterface[];
  private paymentTypeService: PaymentTypeService;
  private paymentService: PaymentService;
  private planId: number;

  constructor(public dialogRef: MatDialogRef<PaymentsComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogDataInterface) { }


  ngOnInit() {
    this.paymentService = this.data.paymentService;
    this.paymentTypeService = this.data.paymentTypeSerive;
    this.planId = this.data.planId;
    
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
