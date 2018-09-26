import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PatientService } from './services/patient.service';
import { PlanService } from './services/plan.service';
import { WorkResultService } from './services/work-result.service';
import { MobilityService } from './services/mobility.service';
import { PainService } from './services/pain.service';
import { DoctorService } from './services/registers/doctor.service';
import { PhysiotherapistService } from './services/registers/physiotherapist.service';
import { ProgramService } from './services/registers/program.service';
import { HttpClientModule } from '@angular/common/http';
import { TherapyService } from './services/registers/therapy.service';
import { SessionService } from './services/session.service';
import { BrowserModule } from '@angular/platform-browser';

import { MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    MatIconModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
  ],
  providers: [PatientService, PlanService, WorkResultService, MobilityService, PainService, DoctorService, PhysiotherapistService, ProgramService, TherapyService, SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
