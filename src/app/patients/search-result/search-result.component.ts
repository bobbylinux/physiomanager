import { Component, OnInit, Input } from '@angular/core';
import { PatientInterface } from './../../interfaces/patient.interface';
import { DeletePatientComponent } from './delete/delete-patient.component';
import { MatDialog } from '@angular/material';
import { PatientService } from './../../services/patient.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  private admin: boolean;

  @Input() 
  searched;
  @Input() 
  patients;
  
  constructor(private dialog: MatDialog, private patientService: PatientService) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.admin = user.admin;
  }

  deleteConfirmation(patient: PatientInterface) {
    const dialogRef = this.dialog.open(DeletePatientComponent, {
      data: {
        patient: patient
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deletePatient(patient);
      }
    });
  }

  deletePatient(patient: PatientInterface) {
    this.patientService.delete(patient.id).subscribe(
      response => {
        const idx = this.patients.indexOf(patient);
        this.patients.splice(idx, 1);
      }
    );
  }
}
