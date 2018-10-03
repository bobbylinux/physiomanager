import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../../services/registers/program.service';
import { Program } from '../../classes/program';
import { DeleteProgramComponent } from './delete/delete-program.component';
import { ProgramInterface } from '../../interfaces/program.interface';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {

  constructor(private dialog: MatDialog, private programService: ProgramService, private route: Router) {
  }

  private programs: Program[] = [];

  ngOnInit() {
    this.programService.getAll('').subscribe(
      response => {
        if (response['data'].length > 0) {
          this.programs = response['data'];
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  editProgram(program: ProgramInterface) {
    this.route.navigate(['programs', program.id, 'edit']);
  }

  deleteConfirmation(program: ProgramInterface) {
    const dialogRef = this.dialog.open(DeleteProgramComponent, {
      data: {
        program: program
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deleteProgram(program);
      }
    });
  }

  deleteProgram(program: ProgramInterface) {
    this.programService.delete(program.id).subscribe(
      response => {
        const idx = this.programs.indexOf(program);
        this.programs.splice(idx, 1);
      }
    );
  }

}
