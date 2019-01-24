import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogDataNoteInterface } from 'src/app/interfaces/dialog_data/dialog-data-note.interface';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NoteComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogDataNoteInterface) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
