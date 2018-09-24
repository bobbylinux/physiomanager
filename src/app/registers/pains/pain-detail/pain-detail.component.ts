import { Component, OnInit } from '@angular/core';
import {Mobility} from '../../../classes/mobility';
import {MobilityInterface} from '../../../interfaces/mobility.interface';
import {FormControl, FormGroup} from '@angular/forms';
import {MobilityService} from '../../../services/mobility.service';
import {Discipline} from '../../../classes/discipline';
import {ActivatedRoute, Router} from '@angular/router';
import {PainInterface} from '../../../interfaces/pain.interface';
import {PainService} from '../../../services/pain.service';
import {Pain} from '../../../classes/pain';

@Component({
  selector: 'app-pain-detail',
  templateUrl: './pain-detail.component.html',
  styleUrls: ['./pain-detail.component.css']
})
export class PainDetailComponent implements OnInit {
  private newPain = false;

  enabledOptions = [
    {id: true, text: 'Sì'},
    {id: false, text: 'No'}
  ];

  private pain: PainInterface;

  formGroup = new FormGroup({
    id: new FormControl(),
    description: new FormControl(),
    enabled: new FormControl()
  });

  constructor(private painService: PainService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.pain = new Pain();
    this.route.params.subscribe(
      (params) => {
        if (!params.id) {
          this.newPain = true;
          return;
        }
        this.painService.get(params.id, '').subscribe(
          response => {
            console.log(response);
            if (response['data'].length > 0) {
              this.pain = response['data'][0];
              this.formGroup = new FormGroup({
                id: new FormControl(this.pain.id),
                description: new FormControl(this.pain.description),
                enabled: new FormControl(this.pain.enabled)
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

  addPain() {
    const description = this.description.value;
    const enabled = this.enabled.value;
    const pain = new Pain();
    pain.description = description;
    pain.enabled = enabled === 'true' ? true : false;

    this.painService.create(pain).subscribe(
      response => {
        this.router.navigate(['pains']);
      }
    );
  }

  updatePain() {
    const id = this.id.value;
    const description = this.description.value;
    const enabled = this.enabled.value;
    const pain = new Pain();
    pain.id = id;
    pain.description = description;
    pain.enabled = enabled === 'true' ? true : false;

    this.painService.update(pain).subscribe(
      response => {
        this.router.navigate(['pains']);
      }
    );
  }

  submitForm() {
    if (this.newPain) {
      this.addPain();
    } else {
      this.updatePain();
    }
  }
}
