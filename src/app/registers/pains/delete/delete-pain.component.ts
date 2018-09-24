import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PainInterface} from '../../../interfaces/pain.interface';

@Component({
  selector: 'app-delete-pain',
  templateUrl: './delete-pain.component.html',
  styleUrls: ['./delete-pain.component.css']
})
export class DeletePainComponent implements OnInit {

  @Input() pain: PainInterface;

  @Output() confirmedDelete = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

  deletePain() {
    this.confirmedDelete.emit(this.pain);
    this.activeModal.close();
  }

}
