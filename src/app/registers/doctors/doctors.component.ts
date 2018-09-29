import {Component, OnInit} from '@angular/core';
import {DoctorService} from '../../services/registers/doctor.service';
import {DeleteDoctorComponent} from './delete/delete-doctor.component';
import {Router} from '@angular/router';
import { Doctor } from '../../classes/doctor';
import { DoctorInterface } from './../../interfaces/doctor.interface';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  doctors: Doctor[] = []; 

  constructor(private dialog: MatDialog, private doctorService: DoctorService, private route: Router) {
  }

   
  ngOnInit() {
    this.doctorService.getAll('').subscribe(
      result => {
        this.doctors = result['data'];
      }
    );
  }

  editDoctor(doctor: Doctor) {
    this.route.navigate(['doctors', doctor.id, 'edit']);
  }

  deleteConfirmation(doctor: DoctorInterface) {
    const dialogRef = this.dialog.open(DeleteDoctorComponent, {
      data: {
        doctor: doctor
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deleteDoctor(doctor);
      }
    });
  }

  deleteDoctor(doctor: DoctorInterface) {
    this.doctorService.delete(doctor.id).subscribe(
      response => {
        const idx = this.doctors.indexOf(doctor);
        this.doctors.splice(idx, 1);
      }
    );
  }
}
