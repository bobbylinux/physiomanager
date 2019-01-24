import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogDataWorkResultInterface } from 'src/app/interfaces/dialog_data/dialog-data-work-result.interface';

@Component({
  selector: 'app-delete-work-result',
  templateUrl: './delete-work-result.component.html',
  styleUrls: ['./delete-work-result.component.css']
})
export class DeleteWorkResultComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteWorkResultComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogDataWorkResultInterface) { }

  ngOnInit() {
  }

  deleteWorkResult() {
    this.dialogRef.close("delete");
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
