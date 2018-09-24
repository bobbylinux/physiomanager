import {Component, OnInit} from '@angular/core';
import {ModalComponent} from '../../modals/modal/modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Therapy} from '../../classes/therapy';
import {TherapyService} from '../../services/registers/therapy.service';
import {DeleteProgramComponent} from '../programs/delete/delete-program.component';
import {Program} from '../../classes/program';
import {DeleteTherapyComponent} from './delete/delete-therapy.component';
import {TherapyInterface} from '../../interfaces/therapy.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-therapies',
  templateUrl: './therapies.component.html',
  styleUrls: ['./therapies.component.css']
})
export class TherapiesComponent implements OnInit {

  constructor(private modalService: NgbModal, private therapyService: TherapyService, private route: Router) {
  }

  private therapies: Therapy[] = [];

  ngOnInit() {
    this.therapyService.getAll('').subscribe(
      response => {
        if (response['data'].length > 0) {
          this.therapies = response['data'];
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  editTherapy(therapy: TherapyInterface) {
    this.route.navigate(['therapies', therapy.id, 'edit']);
  }

  deleteConfirmation(therapy: TherapyInterface) {
    const modalRef = this.modalService.open(DeleteTherapyComponent);
    modalRef.componentInstance.therapy = therapy;
    modalRef.componentInstance.confirmedDelete.subscribe(($event) => {
      this.deletePhysiotherapist($event);
    });
  }

  deletePhysiotherapist(therapy: Therapy) {
    this.therapyService.delete(therapy.id).subscribe(
      () => {
        const idx = this.therapies.indexOf(therapy);
        this.therapies.splice(idx, 1);
      }
    );
  }

}
