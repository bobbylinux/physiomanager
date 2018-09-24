import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Program} from '../../../classes/program';
import {Therapy} from '../../../classes/therapy';

@Component({
  selector: 'app-delete-therapy',
  templateUrl: './delete-therapy.component.html',
  styleUrls: ['./delete-therapy.component.css']
})
export class DeleteTherapyComponent implements OnInit {

  @Input() therapy: Therapy;

  @Output() confirmedDelete = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

  deleteTherapy() {
    this.confirmedDelete.emit(this.therapy);
    this.activeModal.close();
  }

}
