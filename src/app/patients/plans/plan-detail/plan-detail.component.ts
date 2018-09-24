import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { PainInterface } from './../../../interfaces/pain.interface';
import { WorkResultInterface } from './../../../interfaces/work-result.interface';
import { MobilityInterface } from './../../../interfaces/mobility.interface';
import { ProgramInterface } from './../../../interfaces/program.interface';

import { PlanInterface } from '../../../interfaces/plan.interface';
import { WorkResult } from '../../../classes/work-result';
import { Pain } from '../../../classes/pain';
import { Mobility } from '../../../classes/mobility';
import { Plan } from '../../../classes/plan';
import { Program } from '../../../classes/program';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.css']
})
export class PlanDetailComponent implements OnInit {

  private _plan = new BehaviorSubject<PlanInterface>(new Plan());
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

  @Input() 
  set plan(value) {
    this._plan.next(value);
    console.log(this.plan);
    if (this.plan) {
      this.planFormGroup.patchValue(
        {
          'pathological_conditions': this.plan.pathological_conditions,
          'program': this.plan.program,
          'note': this.plan.note,
          'privacy': this.plan.privacy,
          'mobility_id': this.plan.mobility_id,
          'pain_id' : this.plan.pain_id,
          'work_result_id' : this.plan.work_result_id,
          'final_report' : this.plan.final_report
        }
      );
    }
  }
  get plan() {
    return this._plan.getValue();
  }
  @Input()
  set pains(value) {
    this._pains.next(value);
    if (this.pains) {
      const emptyItemPain: PainInterface = new Pain();
      this.pains.unshift(emptyItemPain);
    }
  }
  get pains() {
    return this._pains.getValue();
  }
  @Input()
  set workResults(value) {
    this._workResults.next(value);
    if (this.workResults) {
      const emptyItemWorkResult: WorkResultInterface = new WorkResult();
      this.workResults.unshift(emptyItemWorkResult);
    }
  }
  get workResults() {
    return this._workResults.getValue();
  }
  @Input()
  set mobilities(value) {
    this._mobilities.next(value);
    if (this.mobilities) {
      const emptyItemMobility: MobilityInterface = new Mobility();
      this.mobilities.unshift(emptyItemMobility);
    }
  }
  get mobilities() {
    return this._mobilities.getValue();
  }
  @Input()
  set programs(value) {
    this._programs.next(value);
    if (this.programs) {
      const emptyItemProgram: ProgramInterface = new Program();
      this.programs.unshift(emptyItemProgram);
    }
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
    plan.pathological_conditions = this.planFormGroup.get('pathological_conditions').value;
    plan.note = this.planFormGroup.get('note').value;
    plan.program = this.planFormGroup.get('program').value;
    plan.privacy = this.planFormGroup.get('privacy').value;
    plan.mobility_id = this.planFormGroup.get('mobility_id').value;
    plan.pain_id = this.planFormGroup.get('pain_id').value;
    plan.work_result_id = this.planFormGroup.get('work_result_id').value;
    plan.final_report = this.planFormGroup.get('final_report').value;
    
    this.clickOnSavePlan.emit(plan);
  }
}
