import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogDataPatientInterface } from 'src/app/interfaces/dialog_data/dialog-data-patient.interface';

@Component({
  selector: 'app-delete-patient',
  templateUrl: './delete-patient.component.html',
  styleUrls: ['./delete-patient.component.css']
})
export class DeletePatientComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletePatientComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogDataPatientInterface) { }

  ngOnInit() {
  }

  deletePatient() {
    this.dialogRef.close("delete");
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
