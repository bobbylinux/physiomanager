import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-delete-pain',
  templateUrl: './delete-pain.component.html',
  styleUrls: ['./delete-pain.component.css']
})
export class DeletePainComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletePainComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  deletePain() {
    this.dialogRef.close("delete");
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
