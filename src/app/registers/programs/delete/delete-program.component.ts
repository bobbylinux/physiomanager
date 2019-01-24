import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogDataProgramInterface } from 'src/app/interfaces/dialog_data/dialog-data-program.interface';

@Component({
  selector: 'app-delete-program',
  templateUrl: './delete-program.component.html',
  styleUrls: ['./delete-program.component.css']
})
export class DeleteProgramComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteProgramComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogDataProgramInterface) { }

  ngOnInit() {
  }

  deleteProgram() {
    this.dialogRef.close("delete");
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
