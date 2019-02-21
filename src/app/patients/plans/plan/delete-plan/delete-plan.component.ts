import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogDataPlanInterface } from 'src/app/interfaces/dialog_data/dialog-data-plan.interface';

@Component({
  selector: 'app-delete-plan',
  templateUrl: './delete-plan.component.html',
  styleUrls: ['./delete-plan.component.css']
})
export class DeletePlanComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletePlanComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogDataPlanInterface) { }

  ngOnInit() {
  }

  deletePlan() {
    this.dialogRef.close("delete");
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
