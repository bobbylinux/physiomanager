import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {PainService} from '../../services/pain.service';
import {PainInterface} from '../../interfaces/pain.interface';
import {DeletePainComponent} from './delete/delete-pain.component';

@Component({
  selector: 'app-pains',
  templateUrl: './pains.component.html',
  styleUrls: ['./pains.component.css']
})
export class PainsComponent implements OnInit {

  constructor(private modalService: NgbModal, private painService: PainService, private route: Router) {
  }

  private pains: PainInterface[] = [];

  ngOnInit() {
    this.painService.getAll('').subscribe(
      response => {
        if (response['data'].length > 0) {
          this.pains = response['data'];
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  editPain(pain: PainInterface) {
    this.route.navigate(['pains', pain.id, 'edit']);
  }

  deleteConfirmation(pain: PainInterface) {
    const modalRef = this.modalService.open(DeletePainComponent);
    modalRef.componentInstance.pain = pain;
    modalRef.componentInstance.confirmedDelete.subscribe(($event) => {
      this.deletePain($event);
    });
  }

  deletePain(pain: PainInterface) {
    this.painService.delete(pain.id).subscribe(
      response => {
        const idx = this.pains.indexOf(pain);
        this.pains.splice(idx, 1);
      }
    );
  }
}
