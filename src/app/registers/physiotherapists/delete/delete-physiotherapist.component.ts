import {Component, OnInit, Input, Output, EventEmitter, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../../pains/delete/delete-pain.component';

@Component({
  selector: 'app-physiotherapists-delete',
  templateUrl: './delete-physiotherapist.component.html',
  styleUrls: ['./delete-physiotherapist.component.css']
})
export class DeletePhysiotherapistComponent implements OnInit {

 
  constructor(public dialogRef: MatDialogRef<DeletePhysiotherapistComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  deletePhysiotherapist() {
    this.dialogRef.close("delete");
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
