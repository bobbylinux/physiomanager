import {Component, EventEmitter, Input, OnInit, Output, Inject} from '@angular/core';
import {MobilityInterface} from '../../../interfaces/mobility.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeletePainComponent, DialogData } from '../../pains/delete/delete-pain.component';

@Component({
  selector: 'app-delete-mobility',
  templateUrl: './delete-mobility.component.html',
  styleUrls: ['./delete-mobility.component.css']
})
export class DeleteMobilityComponent implements OnInit {
  
  ngOnInit() {
  }

  constructor(public dialogRef: MatDialogRef<DeletePainComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  deleteMobility() {
    this.dialogRef.close("delete");
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
