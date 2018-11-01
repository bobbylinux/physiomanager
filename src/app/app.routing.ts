import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { RouteGuardService } from './services/route-guard.service';

const routes: Routes =[
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [RouteGuardService] 
  }, {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [RouteGuardService], 
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
  {
    path: '**',
    redirectTo: 'dashboard',
    canActivate: [RouteGuardService] 
  }
];

@NgModule({
  imports: [
CommonModule,
    RouterModule.forRoot(routes,  {onSameUrlNavigation: 'reload'})
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
