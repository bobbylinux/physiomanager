import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../classes/patient';
import { PatientDetail } from '../../classes/patient-detail';
import { DoctorService } from './../../services/registers/doctor.service';
import { DoctorInterface } from './../../interfaces/doctor.interface';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  sexOptions = [
    { id: 'M', text: 'Maschio' },
    { id: 'F', text: 'Femmina' }
  ];

  doctors: DoctorInterface[];

  formGroup = new FormGroup({
    id: new FormControl(),
    last_name: new FormControl(),
    first_name: new FormControl(),
    tax_code: new FormControl(),
    sex: new FormControl(),
    birthday: new FormControl(),
    place_of_birth: new FormControl(),
    address: new FormControl(),
    city: new FormControl(),
    phone_number: new FormControl(),
    email: new FormControl(),
    doctor_id: new FormControl()
  });

  constructor(private patientService: PatientService, private doctorService: DoctorService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.doctorService.getAll(null,'enabled=true').subscribe(
        response => {
          this.doctors = response['data'];
        }
    )
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

  get tax_code() {
    return this.formGroup.get('tax_code');
  }

  get sex() {
    return this.formGroup.get('sex');
  }

  get birthday() {
    return this.formGroup.get('birthday');
  }

  get place_of_birth() {
    return this.formGroup.get('place_of_birth');
  }

  get address() {
    return this.formGroup.get('address');
  }

  get city() {
    return this.formGroup.get('city');
  }

  get phone_number() {
    return this.formGroup.get('phone_number');
  }

  get email() {
    return this.formGroup.get('email');
  }

  get doctorId() {
    return this.formGroup.get('doctor_id');
  }

  submitForm() {
    const last_name = this.last_name.value;
    const first_name = this.first_name.value;
    const tax_code = this.tax_code.value;
    const sex = this.sex.value;
    const birthday = this.birthday.value;
    const place_of_birth = this.place_of_birth.value;
    const address = this.address.value;
    const city = this.city.value;
    const phone = this.phone_number.value;
    const email = this.email.value;
    const doctor_id = this.doctorId.value;
    const patient = new Patient();
    patient.last_name = last_name;
    patient.first_name = first_name;
    patient.tax_code = tax_code;
    patient.birthday = birthday;
    patient.place_of_birth = place_of_birth;
    patient.sex = sex;
    patient.detail = new PatientDetail();
    patient.detail.address = address;
    patient.detail.city = city;
    patient.detail.phone_number = phone;
    patient.detail.email = email;
    patient.detail.doctor_id = doctor_id;

    this.patientService.create(patient).subscribe(
      () => {
        this.toastr.info('Paziente aggiunto correttamente', '', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-info alert-with-icon",
          positionClass: 'toast-top-right'
        });
        this.router.navigate(['patients']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
