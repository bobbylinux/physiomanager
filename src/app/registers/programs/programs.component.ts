import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProgramService} from '../../services/registers/program.service';
import {Program} from '../../classes/program';
import {DeleteProgramComponent} from './delete/delete-program.component';
import {ProgramInterface} from '../../interfaces/program.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {

  constructor(private modalService: NgbModal, private programService: ProgramService, private route: Router) {
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
    const modalRef = this.modalService.open(DeleteProgramComponent);
    modalRef.componentInstance.program = program;
    modalRef.componentInstance.confirmedDelete.subscribe(($event) => {
      this.deletePhysiotherapist($event);
    });
  }

  deletePhysiotherapist(program: Program) {
    this.programService.delete(program.id).subscribe(
      response => {
        const idx = this.programs.indexOf(program);
        this.programs.splice(idx, 1);
      }
    );
  }

}
