import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { PatientsComponent } from '../../patients/patients.component';
import { AddPatientComponent } from '../../patients/add-patient/add-patient.component';
import { PlansComponent } from '../../patients/plans/plans.component';
import { NewPlanComponent } from '../../patients/plans/new-plan/new-plan.component';
import { DoctorsComponent } from './../../registers/doctors/doctors.component';
import { DoctorDetailComponent } from './../../registers/doctors/doctor-detail/doctor-detail.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'patients', component: PatientsComponent },
    { path: 'add-patient', component: AddPatientComponent },
    { path: 'plans/:id', component: PlansComponent, runGuardsAndResolvers: 'always' },
    { path: 'plans/:id/new-plan', component: NewPlanComponent },
    { path: 'doctors', component: DoctorsComponent },
    { path: 'doctors/:id/edit', component: DoctorDetailComponent },
    { path: 'doctors/new', component: DoctorDetailComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'table-list', component: TableListComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'notifications', component: NotificationsComponent }
];
