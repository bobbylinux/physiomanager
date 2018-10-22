import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogDataInterface } from './../../../interfaces/dialog-data.interface';

@Component({
  selector: 'app-delete-doctor',
  templateUrl: './delete-doctor.component.html',
  styleUrls: ['./delete-doctor.component.css']
})
export class DeleteDoctorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteDoctorComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogDataInterface) { }

  ngOnInit() {
  }

  deleteDoctor() {
    this.dialogRef.close("delete");
  }

  closeDialog() {
    this.dialogRef.close();
  }


}
