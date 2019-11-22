import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DialogDataPaymentTypeInterface } from "src/app/interfaces/dialog_data/dialog-data-payment-type.interface";

@Component({
  selector: "app-delete-payment-type",
  templateUrl: "./delete-payment-type.component.html",
  styleUrls: ["./delete-payment-type.component.css"]
})
export class DeletePaymentTypeComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeletePaymentTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataPaymentTypeInterface
  ) {}

  ngOnInit() {}

  deletePaymentType() {
    this.dialogRef.close("delete");
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
