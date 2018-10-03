import { Component, OnInit } from '@angular/core';
import { Therapy } from '../../classes/therapy';
import { TherapyService } from '../../services/registers/therapy.service';
import { TherapyInterface } from '../../interfaces/therapy.interface';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DeleteTherapyComponent } from './delete/delete-therapy.component';

@Component({
  selector: 'app-therapies',
  templateUrl: './therapies.component.html',
  styleUrls: ['./therapies.component.css']
})
export class TherapiesComponent implements OnInit {

  constructor(private dialog: MatDialog, private therapyService: TherapyService, private route: Router) {
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
    const dialogRef = this.dialog.open(DeleteTherapyComponent, {
      data: {
        therapy: therapy
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deleteTherapy(therapy);
      }
    });
  }

  deleteTherapy(therapy: TherapyInterface) {
    this.therapyService.delete(therapy.id).subscribe(
      response => {
        const idx = this.therapies.indexOf(therapy);
        this.therapies.splice(idx, 1);
      }
    );
  }

}
