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
import { DeletePainComponent } from './registers/pains/delete/delete-pain.component';
import { DeletePhysiotherapistComponent } from './registers/physiotherapists/delete/delete-physiotherapist.component';
import { DeleteProgramComponent } from './registers/programs/delete/delete-program.component';
import { DeleteTherapyComponent } from './registers/therapies/delete/delete-therapy.component';
import { DeleteWorkResultComponent } from './registers/work-results/delete/delete-work-result.component';
import { NoteComponent } from './patients/plans/plan/plan-sessions/note/note.component';
import { LoginComponent } from './login/login.component';
import { RouteGuardService } from 'src/app/services/route-guard.service';
import { AuthService } from './services/auth.service';
import { UnloggedUsersGuardService } from './services/unlogged-users-guard.service';
import { PaymentsComponent } from './patients/plans/payments/payments.component';
import { ToastrModule } from 'ngx-toastr';
import { DeletePatientComponent } from './patients/search-result/delete/delete-patient.component';
import { DeletePlanComponent } from './patients/plans/plan/delete-plan/delete-plan.component';

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
    MatTabsModule,
    ToastrModule.forRoot()
    ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,    
    NoteComponent,
    LoginComponent,
    PaymentsComponent,
    /*delete*/
    DeletePatientComponent,
    DeleteDoctorComponent,
    DeletePainComponent,
    DeletePhysiotherapistComponent,
    DeleteProgramComponent,
    DeleteTherapyComponent,
    DeleteWorkResultComponent,
    DeletePlanComponent
  ],
  providers: [RouteGuardService, UnloggedUsersGuardService, AuthService],
  entryComponents: [DeleteDoctorComponent, DeletePlanComponent, DeletePainComponent, DeletePhysiotherapistComponent, DeleteProgramComponent, DeleteTherapyComponent, DeletePatientComponent, DeleteWorkResultComponent, NoteComponent, PaymentsComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
