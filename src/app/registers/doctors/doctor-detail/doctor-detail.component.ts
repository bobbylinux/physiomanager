import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../../../services/doctor.service';
import { Doctor } from '../../../classes/doctor';
import { DisciplineService } from '../../../services/registers/discipline.service';
import { DisciplineInterface } from '../../../interfaces/discipline.interface';
import { DoctorInterface } from '../../../interfaces/doctor.interface';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.css']
})
export class DoctorDetailComponent implements OnInit {

  private newDoctor = false;

  enabledOptions = [
    { id: true, text: 'Sì' },
    { id: false, text: 'No' }
  ];

  private doctor: DoctorInterface;
  private disciplines: DisciplineInterface[];

  formGroup = new FormGroup({
    id: new FormControl(),
    last_name: new FormControl(),
    first_name: new FormControl(),
    discipline: new FormControl(),
    enabled: new FormControl()
  });

  constructor(private doctorService: DoctorService, private disciplineService: DisciplineService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.doctor = new Doctor();
    this.route.params.subscribe(
      (params) => {
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
        if (!params.id) {
          this.newDoctor = true;
          return;
        }
        this.doctorService.get(params.id, '').subscribe(
          response => {
            if (response['data'].length > 0) {
              this.doctor = response['data'][0];
              console.log(this.doctor);
              this.formGroup = new FormGroup({
                id: new FormControl(this.doctor.id),
                last_name: new FormControl(this.doctor.last_name),
                first_name: new FormControl(this.doctor.first_name),
                discipline: new FormControl(this.doctor.discipline_id),
                enabled: new FormControl(this.doctor.enabled)
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

  get last_name() {
    return this.formGroup.get('last_name');
  }

  get first_name() {
    return this.formGroup.get('first_name');
  }

  get discipline() {
    return this.formGroup.get('discipline');
  }

  get enabled() {
    return this.formGroup.get('enabled');
  }

  addDoctor() {
    const last_name = this.last_name.value;
    const first_name = this.first_name.value;
    const discipline_id = this.discipline.value;
    const enabled = this.enabled.value === 'true' ? true : false;
    const doctor = new Doctor();
    doctor.last_name = last_name;
    doctor.first_name = first_name;
    doctor.discipline_id = discipline_id;
    doctor.enabled = enabled;

    this.doctorService.create(doctor).subscribe(
      response => {
        this.router.navigate(['doctors']);
      }
    );
  }

  updateDoctor() {
    const id = this.id.value;
    const last_name = this.last_name.value;
    const first_name = this.first_name.value;
    const discipline_id = this.discipline.value;
    const enabled = this.enabled.value;
    const doctor = new Doctor();
    doctor.id = id;
    doctor.last_name = last_name;
    doctor.first_name = first_name;
    doctor.discipline_id = discipline_id;
    doctor.enabled = enabled === 'true' ? true : false;

    this.doctorService.update(doctor).subscribe(
      response => {
        this.router.navigate(['doctors']);
      }
    );
  }

  submitForm() {
    if (this.newDoctor) {
      this.addDoctor();
    } else {
      this.updateDoctor();
    }
  }

}
