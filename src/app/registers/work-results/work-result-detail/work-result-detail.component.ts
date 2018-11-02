import { Component, OnInit } from '@angular/core';
import {PainService} from '../../../services/registers/pain.service';
import {Pain} from '../../../classes/pain';
import {PainInterface} from '../../../interfaces/pain.interface';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkResultInterface} from '../../../interfaces/work-result.interface';
import {WorkResultService} from '../../../services/registers/work-result.service';
import {WorkResult} from '../../../classes/work-result';

@Component({
  selector: 'app-work-result-detail',
  templateUrl: './work-result-detail.component.html',
  styleUrls: ['./work-result-detail.component.css']
})
export class WorkResultDetailComponent implements OnInit {

  private newWorkResult = false;

  enabledOptions = [
    {id: true, text: 'Sì'},
    {id: false, text: 'No'}
  ];

  private workResult: WorkResultInterface;

  formGroup = new FormGroup({
    id: new FormControl(),
    description: new FormControl(),
    index: new FormControl(),
    enabled: new FormControl()
  });

  constructor(private workResultService: WorkResultService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.workResult = new WorkResult();
    this.route.params.subscribe(
      (params) => {
        if (!params.id) {
          this.newWorkResult = true;
          return;
        }
        this.workResultService.get(params.id, '').subscribe(
          response => {
            if (response['data'].length > 0) {
              this.workResult = response['data'][0];
              this.formGroup = new FormGroup({
                id: new FormControl(this.workResult.id),
                description: new FormControl(this.workResult.description),
                index: new FormControl(this.workResult.index),
                enabled: new FormControl(this.workResult.enabled)
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

  get index() {
    return this.formGroup.get('index');
  }
  
  get enabled() {
    return this.formGroup.get('enabled');
  }

  addWorkResult() {
    const description = this.description.value;
    const enabled = this.enabled.value;
    const index = this.index.value;
    const workResult = new WorkResult();
    workResult.description = description;
    workResult.index = index;
    workResult.enabled = enabled.toString() == 'true' ? true : false;

    this.workResultService.create(workResult).subscribe(
      () => {
        this.router.navigate(['work_results']);
      }
    );
  }

  updateWorkResult() {
    const id = this.id.value;
    const description = this.description.value;
    const enabled = this.enabled.value;
    const index = this.index.value;
    const workResult = new WorkResult();
    workResult.id = id;
    workResult.description = description;
    workResult.index = index;
    workResult.enabled = enabled.toString() == 'true' ? true : false;

    this.workResultService.update(workResult).subscribe(
      () => {
        this.router.navigate(['work_results']);
      }
    );
  }

  submitForm() {
    if (this.newWorkResult) {
      this.addWorkResult();
    } else {
      this.updateWorkResult();
    }
  }

}
