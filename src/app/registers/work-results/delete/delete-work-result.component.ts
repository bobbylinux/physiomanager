import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {WorkResultInterface} from '../../../interfaces/work-result.interface';

@Component({
  selector: 'app-delete-work-result',
  templateUrl: './delete-work-result.component.html',
  styleUrls: ['./delete-work-result.component.css']
})
export class DeleteWorkResultComponent implements OnInit {
  @Input() workResult: WorkResultInterface;

  @Output() confirmedDelete = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

  deleteWorkResult() {
    this.confirmedDelete.emit(this.workResult);
    this.activeModal.close();
  }


}
