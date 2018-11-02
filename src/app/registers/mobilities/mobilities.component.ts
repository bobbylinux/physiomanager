import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MobilityService } from '../../services/registers/mobility.service';
import { MobilityInterface } from '../../interfaces/mobility.interface';
import { DeleteMobilityComponent } from './delete/delete-mobility.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-mobilities',
  templateUrl: './mobilities.component.html',
  styleUrls: ['./mobilities.component.css']
})
export class MobilitiesComponent implements OnInit {

  constructor(private dialog: MatDialog, private mobilityService: MobilityService, private route: Router) {
  }

  private mobilities: MobilityInterface[] = [];

  ngOnInit() {
    this.mobilityService.getAll().subscribe(
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
    const dialogRef = this.dialog.open(DeleteMobilityComponent, {
      data: {
        mobility: mobility
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deleteMobility(mobility);
      }
    });
  }

  deleteMobility(mobility: MobilityInterface) {
    this.mobilityService.delete(mobility.id).subscribe(
      () => {
        const idx = this.mobilities.indexOf(mobility);
        this.mobilities.splice(idx, 1);
      }
    );
  }
}
