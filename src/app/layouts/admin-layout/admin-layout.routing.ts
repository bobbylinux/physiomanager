import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { PatientsComponent } from '../../patients/patients.component';
import { AddPatientComponent } from '../../patients/add-patient/add-patient.component';
import { PlansComponent } from '../../patients/plans/plans.component';
import { DoctorsComponent } from './../../registers/doctors/doctors.component';
import { DoctorDetailComponent } from './../../registers/doctors/doctor-detail/doctor-detail.component';
import { PainsComponent } from '../../registers/pains/pains.component';
import { PainDetailComponent } from './../../registers/pains/pain-detail/pain-detail.component';
import { PhysiotherapistDetailComponent } from './../../registers/physiotherapists/physiotherapist-detail/physiotherapist-detail.component';
import { PhysiotherapistsComponent } from './../../registers/physiotherapists/physiotherapists.component';
import { TherapiesComponent } from './../../registers/therapies/therapies.component';
import { TherapyDetailComponent } from './../../registers/therapies/therapy-detail/therapy-detail.component';
import { WorkResultsComponent } from './../../registers/work-results/work-results.component';
import { WorkResultDetailComponent } from '../../registers/work-results/work-result-detail/work-result-detail.component';
import { ProgramsComponent } from './../../registers/programs/programs.component';
import { ProgramDetailComponent } from '../../registers/programs/program-detail/program-detail.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'patients', component: PatientsComponent },
    { path: 'add-patient', component: AddPatientComponent },
    { path: 'plans/:id', component: PlansComponent, runGuardsAndResolvers: 'always' },
    { path: 'doctors', component: DoctorsComponent },
    { path: 'doctors/:id/edit', component: DoctorDetailComponent },
    { path: 'doctors/new', component: DoctorDetailComponent },
    { path: 'pains', component: PainsComponent },
    { path: 'pains/:id/edit', component: PainDetailComponent },
    { path: 'pains/new', component: PainDetailComponent },
    { path: 'physiotherapists', component: PhysiotherapistsComponent },
    { path: 'physiotherapists/:id/edit', component: PhysiotherapistDetailComponent },
    { path: 'physiotherapists/new', component: PhysiotherapistDetailComponent },
    { path: 'programs', component: ProgramsComponent },
    { path: 'programs/:id/edit', component: ProgramDetailComponent },
    { path: 'programs/new', component: ProgramDetailComponent },
    { path: 'therapies', component: TherapiesComponent },
    { path: 'therapies/:id/edit', component: TherapyDetailComponent },
    { path: 'therapies/new', component: TherapyDetailComponent },
    { path: 'physiotherapists/new', component: PhysiotherapistDetailComponent },
    { path: 'work_results', component: WorkResultsComponent },
    { path: 'work_results/:id/edit', component: WorkResultDetailComponent },
    { path: 'work_results/new', component: WorkResultDetailComponent },
];
