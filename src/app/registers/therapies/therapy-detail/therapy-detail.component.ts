import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TherapyService } from '../../../services/registers/therapy.service';
import { Therapy } from '../../../classes/therapy';
import { Program } from '../../../classes/program';
import { TherapyInterface } from '../../../interfaces/therapy.interface';

@Component({
  selector: 'app-therapy-detail',
  templateUrl: './therapy-detail.component.html',
  styleUrls: ['./therapy-detail.component.css']
})
export class TherapyDetailComponent implements OnInit {

  public newTherapy = false;

  public enabledOptions = [
    { id: true, text: 'Sì' },
    { id: false, text: 'No' }
  ];

  formGroup = new FormGroup({
    id: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    enabled: new FormControl()
  });

  private therapy: TherapyInterface;

  constructor(private theraphyService: TherapyService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.therapy = new Therapy();
    this.route.params.subscribe(
      (params) => {
        if (!params.id) {
          this.newTherapy = true;
          return;
        }
        this.theraphyService.get(params.id, '').subscribe(
          response => {
            if (response['data'].length > 0) {
              this.therapy = response['data'][0];
              this.formGroup = new FormGroup({
                id: new FormControl(this.therapy.id),
                description: new FormControl(this.therapy.description),
                price: new FormControl(this.therapy.price),
                enabled: new FormControl(this.therapy.enabled)
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

  get price() {
    return this.formGroup.get('price');
  }

  get enabled() {
    return this.formGroup.get('enabled');
  }

  addTherapy() {
    const description = this.description.value;
    const price = this.price.value;
    const enabled = this.enabled.value.toString() == 'true' ? true : false;
    const therapy = new Therapy();
    therapy.description = description;
    therapy.price = price;
    therapy.enabled = enabled;

    this.theraphyService.create(therapy).subscribe(
      () => {
        this.router.navigate(['therapies']);
      }
    );
  }

  updateTherapy() {
    const id = this.id.value;
    const description = this.description.value;
    const price = this.price.value;
    const enabled = this.enabled.value.toString() == 'true' ? true : false;
    const therapy = new Therapy();
    therapy.id = id;
    therapy.description = description;
    therapy.price = price;
    therapy.enabled = enabled;

    this.theraphyService.update(therapy).subscribe(
      () => {
        this.router.navigate(['therapies']);
      }
    );
  }

  submitForm() {
    if (this.newTherapy) {
      this.addTherapy();
    } else {
      this.updateTherapy();
    }
  }
}
