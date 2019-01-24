import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  formGroup = new FormGroup({
    notes: new FormControl()
  });

  submitForm() {
    return null;
  }
  
}
