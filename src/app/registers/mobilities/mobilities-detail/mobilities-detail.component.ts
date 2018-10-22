import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MobilityService } from '../../../services/mobility.service';
import { Mobility } from '../../../classes/mobility';
import { MobilityInterface } from '../../../interfaces/mobility.interface';

@Component({
  selector: 'app-mobilities-detail',
  templateUrl: './mobilities-detail.component.html',
  styleUrls: ['./mobilities-detail.component.css']
})
export class MobilitiesDetailComponent implements OnInit {

  private newMobility = false;

  enabledOptions = [
    { id: true, text: 'Sì' },
    { id: false, text: 'No' }
  ];

  private mobility: MobilityInterface;

  formGroup = new FormGroup({
    id: new FormControl(),
    description: new FormControl(),
    index: new FormControl(),
    enabled: new FormControl()
  });

  constructor(private mobilityService: MobilityService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.mobility = new Mobility();
    this.route.params.subscribe(
      (params) => {
        if (!params.id) {
          this.newMobility = true;
          return;
        }
        this.mobilityService.get(params.id, '').subscribe(
          response => {
            if (response['data'].length > 0) {
              this.mobility = response['data'][0];
              this.formGroup = new FormGroup({
                id: new FormControl(this.mobility.id),
                description: new FormControl(this.mobility.description),
                index: new FormControl(this.mobility.index),
                enabled: new FormControl(this.mobility.enabled)
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

  addMobility() {
    const description = this.description.value;
    const index = this.index.value;
    const enabled = this.enabled.value.toString() == 'true' ? true : false;
    const mobility = new Mobility();
    mobility.description = description;
    mobility.index = index;
    mobility.enabled = enabled;

    this.mobilityService.create(mobility).subscribe(
      response => {
        this.router.navigate(['mobilities']);
      }
    );
  }

  updateMobility() {
    const id = this.id.value;
    const description = this.description.value;
    const index = this.index.value;
    const enabled = this.enabled.value.toString() == 'true' ? true : false;
    const mobility = new Mobility();
    mobility.id = id;
    mobility.description = description;
    mobility.index = index;
    mobility.enabled = enabled;

    this.mobilityService.update(mobility).subscribe(
      response => {
        this.router.navigate(['mobilities']);
      }
    );
  }

  submitForm() {
    if (this.newMobility) {
      this.addMobility();
    } else {
      this.updateMobility();
    }
  }
}
