import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { PainService } from '../../services/pain.service';
import { PainInterface } from '../../interfaces/pain.interface';
import { DeletePainComponent } from './delete/delete-pain.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-pains',
  templateUrl: './pains.component.html',
  styleUrls: ['./pains.component.css']
})
export class PainsComponent implements OnInit {

  constructor(private dialog: MatDialog, private painService: PainService, private route: Router) {
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
    const dialogRef = this.dialog.open(DeletePainComponent, {
      data: {
        pain: pain
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deletePain(pain);
      }
    });
  }

  deletePain(pain: PainInterface) {
    this.painService.delete(pain.id).subscribe(
      response => {
        console.log(response);
        const idx = this.pains.indexOf(pain);
        this.pains.splice(idx, 1);
      }
    );
  }
}
