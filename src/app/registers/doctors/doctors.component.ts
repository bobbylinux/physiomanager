import {Component, OnInit} from '@angular/core';
import {DoctorService} from '../../services/registers/doctor.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeleteDoctorComponent} from './delete/delete-doctor.component';
import {Router} from '@angular/router';
import { Doctor } from '../../classes/doctor';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  doctors: Doctor[] = []; 

  constructor(private modalService: NgbModal, private doctorService: DoctorService, private route: Router) {
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

  deleteConfirmation(doctor: Doctor) {
    console.log('deleteConfirmation');
    const modalRef = this.modalService.open(DeleteDoctorComponent);
    modalRef.componentInstance.doctor = doctor;
    modalRef.componentInstance.confirmedDelete.subscribe(($event) => {
      this.deleteDoctor($event);
    });
  }

  deleteDoctor(doctor: Doctor) {
    console.log(doctor);
    this.doctorService.delete(doctor.id).subscribe(
      response => {
        const idx = this.doctors.indexOf(doctor);
        this.doctors.splice(idx, 1);
      }
    );
  }
}
