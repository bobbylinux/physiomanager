import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProgramService} from '../../services/registers/program.service';
import {Program} from '../../classes/program';
import {Router} from '@angular/router';
import {MobilityService} from '../../services/mobility.service';
import {MobilityInterface} from '../../interfaces/mobility.interface';
import {ProgramInterface} from '../../interfaces/program.interface';
import {DeleteProgramComponent} from '../programs/delete/delete-program.component';
import {DeleteMobilityComponent} from './delete/delete-mobility.component';

@Component({
  selector: 'app-mobilities',
  templateUrl: './mobilities.component.html',
  styleUrls: ['./mobilities.component.css']
})
export class MobilitiesComponent implements OnInit {

  constructor(private modalService: NgbModal, private mobilityService: MobilityService, private route: Router) {
  }

  private mobilities: MobilityInterface[] = [];

  ngOnInit() {
    this.mobilityService.getAll('').subscribe(
      response => {
        if (response['data'].length > 0) {
          this.mobilities = response['data'];
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  editMobility(mobility: MobilityInterface) {
    this.route.navigate(['mobilities', mobility.id, 'edit']);
  }

  deleteConfirmation(mobility: MobilityInterface) {
    const modalRef = this.modalService.open(DeleteMobilityComponent);
    modalRef.componentInstance.mobility = mobility;
    modalRef.componentInstance.confirmedDelete.subscribe(($event) => {
      this.deleteMobility($event);
    });
  }

  deleteMobility(mobility: MobilityInterface) {
    this.mobilityService.delete(mobility.id).subscribe(
      response => {
        const idx = this.mobilities.indexOf(mobility);
        this.mobilities.splice(idx, 1);
      }
    );
  }
}
