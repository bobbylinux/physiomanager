import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { PainInterface } from './../../../../interfaces/pain.interface';
import { WorkResultInterface } from './../../../../interfaces/work-result.interface';
import { MobilityInterface } from './../../../../interfaces/mobility.interface';
import { ProgramInterface } from './../../../../interfaces/program.interface';

import { PlanInterface } from '../../../../interfaces/plan.interface';
import { Plan } from '../../../../classes/plan';
import { Utility } from 'src/app/classes/utility';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.css']
})
export class PlanDetailComponent implements OnInit {

  private _plan = new BehaviorSubject<PlanInterface>(new Plan());
  private _newPlan = new BehaviorSubject<boolean>(false);
  private _mobilities = new BehaviorSubject<MobilityInterface[]>([]);
  private _pains = new BehaviorSubject<PainInterface[]>([]);
  private _programs = new BehaviorSubject<ProgramInterface[]>([]);
  private _workResults = new BehaviorSubject<WorkResultInterface[]>([]);
  @Output() clickOnSavePlan = new EventEmitter();
  planFormGroup = new FormGroup({
    pathological_conditions: new FormControl(),
    note: new FormControl(),
    program: new FormControl(),
    privacy: new FormControl(),
    medical_certificate: new FormControl(),
    work_result_id: new FormControl(),
    pain_id: new FormControl(),
    mobility_id: new FormControl(),
    final_report: new FormControl()
  });

  privacyOptions = [
    { id: null, text: null },
    { id: true, text: 'Sì' },
    { id: false, text: 'No' }
  ];
  medicalCertificateOptions = [
    { id: null, text: null },
    { id: true, text: 'Sì' },
    { id: false, text: 'No' }
  ];

  @Input() 
  set plan(value) {
    this._plan.next(value);
    if (this.plan) {
      this.planFormGroup.patchValue(
        {
          'pathological_conditions': this.plan.pathological_conditions,
          'program': this.plan.program,
          'note': this.plan.note,
          'privacy': this.plan.privacy,
          'medical_certificate': this.plan.medical_certificate,
          'mobility_id': this.plan.mobility_id,
          'pain_id' : this.plan.pain_id,
          'work_result_id' : this.plan.work_result_id,
          'final_report' : this.plan.final_report
        }
      );
      if (this.plan.created_at != null) {
        //this.plan.created_at.date = Utility.formatDate(this.plan.created_at.date);
      }
    }
  }
  get plan() {
    return this._plan.getValue();
  }
  @Input()
  set newPlan(value) {
    this._newPlan.next(value);
  }
  get newPlan() {
    return this._newPlan.getValue();
  }
  @Input()
  set pains(value) {
    this._pains.next(value);
  }
  get pains() {
    return this._pains.getValue();
  }
  @Input()
  set workResults(value) {
    this._workResults.next(value);
  }
  get workResults() {
    return this._workResults.getValue();
  }
  @Input()
  set mobilities(value) {
    this._mobilities.next(value);
  }
  get mobilities() {
    return this._mobilities.getValue();
  }
  @Input()
  set programs(value) {
    this._programs.next(value);
  }
  get programs() {
    return this._programs.getValue();
  }

  constructor() { }

  ngOnInit() { }

  selectProgram(event) {
    const selectedId = event.target.value;
    const program = this.programs.find(x => x.id == selectedId);
    this.planFormGroup.patchValue({'program': program.description.toString()});
  }

  savePlan() {
    let plan = new Plan();
    plan.id = this.plan ? this.plan.id : 0;
    plan.patient_id = this.plan.patient_id;
    plan.pathological_conditions = this.planFormGroup.get('pathological_conditions').value;
    plan.note = this.planFormGroup.get('note').value;
    plan.program = this.planFormGroup.get('program').value;
    plan.privacy = this.planFormGroup.get('privacy').value;
    plan.medical_certificate = this.planFormGroup.get('medical_certificate').value;
    plan.mobility_id = this.planFormGroup.get('mobility_id').value;
    plan.pain_id = this.planFormGroup.get('pain_id').value;
    plan.work_result_id = this.planFormGroup.get('work_result_id').value;
    plan.final_report = this.planFormGroup.get('final_report').value;
    
    this.clickOnSavePlan.emit(plan);
  }
}
