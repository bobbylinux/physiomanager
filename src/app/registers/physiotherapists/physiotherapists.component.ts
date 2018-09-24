import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PhysiotherapistService} from '../../services/registers/physiotherapist.service';
import {DeletePhysiotherapistComponent} from './delete/delete-physiotherapist.component';
import {PhysiotherapistInterface} from '../../interfaces/physiotherapist.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-physiotherapists',
  templateUrl: './physiotherapists.component.html',
  styleUrls: ['./physiotherapists.component.css']
})
export class PhysiotherapistsComponent implements OnInit {

  constructor(private modalService: NgbModal, private physiotherapistService: PhysiotherapistService, private route: Router) {
  }

  private physiotherapists: PhysiotherapistInterface[] = [];

  ngOnInit() {
    this.physiotherapistService.getAll('').subscribe(
      response => {
        if (response['data'].length > 0) {
          this.physiotherapists = response['data'];
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  editPhysiotherapist(physiotherapist: PhysiotherapistInterface) {
    this.route.navigate(['physiotherapists', physiotherapist.id, 'edit']);
  }

  deleteConfirmation(physiotherapist: PhysiotherapistInterface) {
    const modalRef = this.modalService.open(DeletePhysiotherapistComponent);
    modalRef.componentInstance.physiotherapist = physiotherapist;
    modalRef.componentInstance.confirmedDelete.subscribe(($event) => {
      this.deletePhysiotherapist($event);
    });
  }

  deletePhysiotherapist(physiotherapist: PhysiotherapistInterface) {
    this.physiotherapistService.delete(physiotherapist.id).subscribe(
      () => {
        const idx = this.physiotherapists.indexOf(physiotherapist);
        this.physiotherapists.splice(idx, 1);
      }
    );
  }
}
