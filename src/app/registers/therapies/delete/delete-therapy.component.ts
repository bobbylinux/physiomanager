import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogDataInterface } from './../../../interfaces/dialog-data.interface';

@Component({
  selector: 'app-delete-therapy',
  templateUrl: './delete-therapy.component.html',
  styleUrls: ['./delete-therapy.component.css']
})
export class DeleteTherapyComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteTherapyComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogDataInterface) { }

  ngOnInit() {
  }

  deleteTherapy() {
    this.dialogRef.close("delete");
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
