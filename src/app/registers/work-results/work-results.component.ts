import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {WorkResultInterface} from '../../interfaces/work-result.interface';
import {DeleteWorkResultComponent} from './delete/delete-work-result.component';
import {WorkResultService} from '../../services/work-result.service';

@Component({
  selector: 'app-work-results',
  templateUrl: './work-results.component.html',
  styleUrls: ['./work-results.component.css']
})
export class WorkResultsComponent implements OnInit {

  constructor(private modalService: NgbModal, private workResultService: WorkResultService, private route: Router) {
  }

  private workResults: WorkResultInterface[] = [];

  ngOnInit() {
    this.workResultService.getAll('').subscribe(
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
    const modalRef = this.modalService.open(DeleteWorkResultComponent);
    modalRef.componentInstance.workResult = workResult;
    modalRef.componentInstance.confirmedDelete.subscribe(($event) => {
      this.deleteWorkResult($event);
    });
  }

  deleteWorkResult(workResult: WorkResultInterface) {
    this.workResultService.delete(workResult.id).subscribe(
      () => {
        const idx = this.workResults.indexOf(workResult);
        this.workResults.splice(idx, 1);
      }
    );
  }

}
