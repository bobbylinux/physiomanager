import {Component, EventEmitter, Input, OnInit, Output, Inject} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PainInterface} from '../../../interfaces/pain.interface';
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

  @Input() pain: PainInterface;

  @Output() confirmedDelete = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<DeletePainComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  deletePain() {
    this.dialogRef.close("delete");
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
