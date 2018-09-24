import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MobilityInterface} from '../../../interfaces/mobility.interface';

@Component({
  selector: 'app-delete-mobility',
  templateUrl: './delete-mobility.component.html',
  styleUrls: ['./delete-mobility.component.css']
})
export class DeleteMobilityComponent implements OnInit {

  @Input() mobility: MobilityInterface;

  @Output() confirmedDelete = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

  deleteMobility() {
    this.confirmedDelete.emit(this.mobility);
    this.activeModal.close();
  }

}
