import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DisciplineService} from '../../services/registers/discipline.service';
import {DeleteDisciplineComponent} from './delete/delete-discipline.component';
import {Router} from '@angular/router';
import {DisciplineInterface} from '../../interfaces/discipline.interface';


@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.css']
})

export class DisciplinesComponent implements OnInit {

  constructor(private modalService: NgbModal, private disciplineService: DisciplineService, private route: Router) {
  }

  private disciplines: DisciplineInterface[] = [];

  ngOnInit() {
    this.disciplineService.getAll('').subscribe(
      response => {
        if (response['data'].length > 0) {
          this.disciplines = response['data'];
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  editDiscipline(discipline: DisciplineInterface) {
    this.route.navigate(['disciplines', discipline.id,'edit']);
  }

  deleteConfirmation(discipline: DisciplineInterface) {
    console.log('deleteConfirmation');
    const modalRef = this.modalService.open(DeleteDisciplineComponent);
    modalRef.componentInstance.discipline = discipline;
    modalRef.componentInstance.confirmedDelete.subscribe(($event) => {
      this.deleteDiscipline($event);
    });
  }

  deleteDiscipline(discipline: DisciplineInterface) {
    this.disciplineService.delete(discipline.id).subscribe(
      () => {
        const idx = this.disciplines.indexOf(discipline);
        this.disciplines.splice(idx, 1);
      }
    );
  }

}
