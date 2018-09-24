import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DisciplineService} from '../../../services/registers/discipline.service';
import {Discipline} from '../../../classes/discipline';
import {ActivatedRoute, Router} from '@angular/router';
import {DisciplineInterface} from '../../../interfaces/discipline.interface';

@Component({
  selector: 'app-discipline-detail',
  templateUrl: './discipline-detail.component.html',
  styleUrls: ['./discipline-detail.component.css']
})
export class DisciplineDetailComponent implements OnInit {

  private newDiscipline = false;

  enabledOptions = [
    {id: true, text: 'Sì'},
    {id: false, text: 'No'}
  ];

  private discipline: DisciplineInterface;

  formGroup = new FormGroup({
    id: new FormControl(),
    description: new FormControl(),
    enabled: new FormControl()
  });

  constructor(private disciplineService: DisciplineService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.discipline = new Discipline();
    this.route.params.subscribe(
      (params) => {
        if (!params.id) {
          this.newDiscipline = true;
          return;
        }
        this.disciplineService.get(params.id, '').subscribe(
          response => {
            if (response['data'].length > 0) {
              this.discipline = response['data'][0];
              this.formGroup = new FormGroup({
                id: new FormControl(this.discipline.id),
                description: new FormControl(this.discipline.description),
                enabled: new FormControl(this.discipline.enabled)
              });
            }
          }
        );
      }
    );
  }

  get id() {
    return this.formGroup.get('id');
  }

  get description() {
    return this.formGroup.get('description');
  }

  get enabled() {
    return this.formGroup.get('enabled');
  }

  addDiscipline() {
    const description = this.description.value;
    const enabled = this.enabled.value;
    const discipline = new Discipline();
    discipline.description = description;
    discipline.enabled = enabled === 'true' ? true : false;

    this.disciplineService.create(discipline).subscribe(
      response => {
        this.router.navigate(['disciplines']);
      }
    );
  }

  updateDiscipline() {
    const id = this.id.value;
    const description = this.description.value;
    const enabled = this.enabled.value;
    const discipline = new Discipline();
    discipline.id = id;
    discipline.description = description;
    discipline.enabled = enabled === 'true' ? true : false;

    this.disciplineService.update(discipline).subscribe(
      response => {
        this.router.navigate(['disciplines']);
      }
    );
  }

  submitForm() {
    if (this.newDiscipline) {
      this.addDiscipline();
    } else {
      this.updateDiscipline();
    }
  }
}
