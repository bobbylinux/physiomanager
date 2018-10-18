import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PhysiotherapistService} from '../../services/registers/physiotherapist.service';
import {DeletePhysiotherapistComponent} from './delete/delete-physiotherapist.component';
import {PhysiotherapistInterface} from '../../interfaces/physiotherapist.interface';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-physiotherapists',
  templateUrl: './physiotherapists.component.html',
  styleUrls: ['./physiotherapists.component.css']
})
export class PhysiotherapistsComponent implements OnInit {

  constructor(private dialog: MatDialog, private physiotherapistService: PhysiotherapistService, private route: Router) {
  }

  private physiotherapists: PhysiotherapistInterface[] = [];

  ngOnInit() {
    this.physiotherapistService.getAll().subscribe(
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
    const dialogRef = this.dialog.open(DeletePhysiotherapistComponent, {
      data: {
        physiotherapist: physiotherapist
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deletePhysiotherapist(physiotherapist);
      }
    });
  }

  deletePhysiotherapist(physiotherapist: PhysiotherapistInterface) {
    this.physiotherapistService.delete(physiotherapist.id).subscribe(
      response => {
        const idx = this.physiotherapists.indexOf(physiotherapist);
        this.physiotherapists.splice(idx, 1);
      }
    );
  }
}
