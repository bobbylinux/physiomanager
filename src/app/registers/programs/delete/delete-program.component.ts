import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Program} from '../../../classes/program';

@Component({
  selector: 'app-delete-program',
  templateUrl: './delete-program.component.html',
  styleUrls: ['./delete-program.component.css']
})
export class DeleteProgramComponent implements OnInit {

  @Input() program: Program;

  @Output() confirmedDelete = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

  deleteProgram() {
    this.confirmedDelete.emit(this.program);
    this.activeModal.close();
  }
}
