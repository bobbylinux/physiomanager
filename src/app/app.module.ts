import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { MatIconModule, MatDialogModule, MatTabsModule } from '@angular/material';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DeleteDoctorComponent } from './registers/doctors/delete/delete-doctor.component';
import { DeleteMobilityComponent } from './registers/mobilities/delete/delete-mobility.component';
import { DeletePainComponent } from './registers/pains/delete/delete-pain.component';
import { DeletePhysiotherapistComponent } from './registers/physiotherapists/delete/delete-physiotherapist.component';
import { DeleteProgramComponent } from './registers/programs/delete/delete-program.component';
import { DeleteTherapyComponent } from './registers/therapies/delete/delete-therapy.component';
import { DeleteWorkResultComponent } from './registers/work-results/delete/delete-work-result.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    MatIconModule,
    MatDialogModule,
    MatTabsModule
    ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,    
    /*delete*/
    DeleteDoctorComponent,
    DeleteMobilityComponent,
    DeletePainComponent,
    DeletePhysiotherapistComponent,
    DeleteProgramComponent,
    DeleteTherapyComponent,
    DeleteWorkResultComponent,

  ],
  entryComponents: [DeleteDoctorComponent, DeleteMobilityComponent, DeletePainComponent, DeletePhysiotherapistComponent, DeleteProgramComponent, DeleteTherapyComponent, DeleteWorkResultComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
