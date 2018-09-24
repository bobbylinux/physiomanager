import { Component, OnInit } from '@angular/core';
import { Patient } from '../classes/patient';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  searched = false;
  last_name = '';
  first_name = '';
  tax_code = '';
  patients: Patient[] = [];
  
  constructor(private service: PatientService) { }

  ngOnInit() {
  }

  searchPatient() {
    this.service.searchPatient(this.last_name, this.first_name, this.tax_code).subscribe(
      result => {
        this.patients = result['data'];
        this.searched = true;
      },
      error => {
        console.log(error);
      }
    );
  }

}
