import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkResultInterface } from '../../interfaces/work-result.interface';
import { DeleteWorkResultComponent } from './delete/delete-work-result.component';
import { WorkResultService } from '../../services/registers/work-result.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-work-results',
  templateUrl: './work-results.component.html',
  styleUrls: ['./work-results.component.css']
})
export class WorkResultsComponent implements OnInit {

  constructor(private dialog: MatDialog, private workResultService: WorkResultService, private route: Router) {
  }

  public workResults: WorkResultInterface[] = [];

  ngOnInit() {
    this.workResultService.getAll().subscribe(
      response => {
        if (response['data'].length > 0) {
          this.workResults = response['data'];
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  editWorkResult(workResult: WorkResultInterface) {
    this.route.navigate(['work_results', workResult.id, 'edit']);
  }

  deleteConfirmation(workResult: WorkResultInterface) {
    const dialogRef = this.dialog.open(DeleteWorkResultComponent, {
      data: {
        workResult: workResult
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deleteTherapy(workResult);
      }
    });
  }

  deleteTherapy(workResult: WorkResultInterface) {
    this.workResultService.delete(workResult.id).subscribe(
      () => {
        const idx = this.workResults.indexOf(workResult);
        this.workResults.splice(idx, 1);
      }
    );
  }
}
