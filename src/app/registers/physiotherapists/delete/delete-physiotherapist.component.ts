import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Physiotherapist} from '../../../classes/physiotherapist';

@Component({
  selector: 'app-physiotherapists-delete',
  templateUrl: './delete-physiotherapist.component.html',
  styleUrls: ['./delete-physiotherapist.component.css']
})
export class DeletePhysiotherapistComponent implements OnInit {

  @Input() physiotherapist: Physiotherapist;

  @Output() confirmedDelete = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

  deletePhysiotherapist() {
    this.confirmedDelete.emit(this.physiotherapist);
    this.activeModal.close();
  }

}
