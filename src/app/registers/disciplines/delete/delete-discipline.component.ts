import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Discipline} from '../../../classes/discipline';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-disciplines-delete',
  templateUrl: './delete-discipline.component.html',
  styleUrls: ['./delete-discipline.component.css']
})
export class DeleteDisciplineComponent implements OnInit {

  @Input() discipline: Discipline;

  @Output() confirmedDelete = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

  deleteDiscipline() {
    this.confirmedDelete.emit(this.discipline);
    this.activeModal.close();
  }

}
