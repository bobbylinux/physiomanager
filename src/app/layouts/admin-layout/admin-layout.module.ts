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
import { DoctorsComponent } from '../../registers/doctors/doctors.component';
import { DoctorDetailComponent } from '../../registers/doctors/doctor-detail/doctor-detail.component';
import { MobilitiesComponent } from '../../registers/mobilities/mobilities.component';
import { MobilitiesDetailComponent } from '../../registers/mobilities/mobilities-detail/mobilities-detail.component';
import { PainDetailComponent } from '../../registers/pains/pain-detail/pain-detail.component';
import { PainsComponent } from './../../registers/pains/pains.component';
import { PhysiotherapistsComponent } from './../../registers/physiotherapists/physiotherapists.component';
import { PhysiotherapistDetailComponent } from './../../registers/physiotherapists/physiotherapist-detail/physiotherapist-detail.component';
import { TherapiesComponent } from '../../registers/therapies/therapies.component';
import { TherapyDetailComponent } from '../../registers/therapies/therapy-detail/therapy-detail.component';
import { WorkResultDetailComponent } from '../../registers/work-results/work-result-detail/work-result-detail.component';
import { WorkResultsComponent } from './../../registers/work-results/work-results.component';
import { ProgramsComponent } from './../../registers/programs/programs.component';
import { ProgramDetailComponent } from './../../registers/programs/program-detail/program-detail.component';
import { DeleteDoctorComponent } from '../../registers/doctors/delete/delete-doctor.component';
import { DeleteMobilityComponent } from '../../registers/mobilities/delete/delete-mobility.component';
import { DeletePainComponent } from '../../registers/pains/delete/delete-pain.component';
import { DeletePhysiotherapistComponent } from '../../registers/physiotherapists/delete/delete-physiotherapist.component';
import { DeleteProgramComponent } from '../../registers/programs/delete/delete-program.component';
import { DeleteTherapyComponent } from '../../registers/therapies/delete/delete-therapy.component';
import { DeleteWorkResultComponent } from '../../registers/work-results/delete/delete-work-result.component';
import { PlanService } from '../../services/plan.service';
import { WorkResultService } from '../../services/work-result.service';
import { MobilityService } from '../../services/mobility.service';
import { PainService } from '../../services/pain.service';
import { DoctorService } from '../../services/registers/doctor.service';
import { PhysiotherapistService } from '../../services/registers/physiotherapist.service';
import { ProgramService } from '../../services/registers/program.service';
import { TherapyService } from '../../services/registers/therapy.service';
import { SessionService } from '../../services/session.service';

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
    DoctorsComponent,
    DoctorDetailComponent,
    MobilitiesComponent,
    MobilitiesDetailComponent,
    PainsComponent,
    PainDetailComponent,
    PhysiotherapistsComponent,
    PhysiotherapistDetailComponent,
    TherapiesComponent,
    TherapyDetailComponent,
    WorkResultsComponent,
    WorkResultDetailComponent,
    ProgramsComponent,
    ProgramDetailComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    NotificationsComponent,
  ],
 
  providers: [PatientService, PlanService, WorkResultService, MobilityService, PainService, DoctorService, PhysiotherapistService, ProgramService, TherapyService, SessionService],
})

export class AdminLayoutModule { }
