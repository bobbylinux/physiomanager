import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../../pains/delete/delete-pain.component';

@Component({
  selector: 'app-delete-therapy',
  templateUrl: './delete-therapy.component.html',
  styleUrls: ['./delete-therapy.component.css']
})
export class DeleteTherapyComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteTherapyComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  deleteTherapy() {
    this.dialogRef.close("delete");
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
