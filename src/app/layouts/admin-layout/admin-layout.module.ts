import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { PatientsComponent } from '../../patients/patients.component';
import { PatientService } from '../../services/patient.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PlanDetailComponent } from '../../patients/plans/plan-detail/plan-detail.component';
import { AddPlanSessionComponent } from '../../patients/plans/add-plan-session/add-plan-session.component';
import { NewPlanComponent } from '../../patients/plans/new-plan/new-plan.component';
import { SearchResultComponent } from '../../patients/search-result/search-result.component';
import { AddPatientComponent } from '../../patients/add-patient/add-patient.component';
import { PlansComponent } from '../../patients/plans/plans.component';
import { PlanSessionsComponent } from '../../patients/plans/plan-sessions/plan-sessions.component';

@NgModule({
  imports: [
CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    PatientsComponent,
    SearchResultComponent,
    AddPatientComponent,
    PlansComponent,
    PlanDetailComponent,
    AddPlanSessionComponent,    
    NewPlanComponent,
    PlanSessionsComponent,
    UserProfileComponent,
    
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    NotificationsComponent,
  ],
  providers: [PatientService]
})

export class AdminLayoutModule {}
