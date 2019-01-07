import { Component, OnInit, Inject } from '@angular/core';
import { DialogDataInterface } from './../../../../../interfaces/dialog-data.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NoteComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogDataInterface) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
