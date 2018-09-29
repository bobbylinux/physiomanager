import { Component, OnInit } from '@angular/core';

declare interface RouteInfo { 
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/patients', title: 'Ricerca Pazienti',  icon: 'ui-1_zoom-bold', class: '' },
    { path: '/physiotherapists', title: 'Fisioterapisti',  icon: 'business_badge', class: '' },
    { path: '/pains', title: 'Indici di Dolore',  icon: 'business_badge', class: '' },
    { path: '/doctors', title: 'Medici',  icon: 'business_badge', class: '' },
    { path: '/mobilities', title: 'Mobilità',  icon: 'business_badge', class: '' },
    { path: '/programs', title: 'Programmi',  icon: 'business_badge', class: '' },
    { path: '/work_results', title: 'Risultati del Lavoro',  icon: 'business_badge', class: '' },
    { path: '/therapies', title: 'Terapie',  icon: 'business_badge', class: '' },
    /*
    { path: '/icons', title: 'Icons',  icon:'education_atom', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'ui-1_bell-53', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'users_single-02', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'design_bullet-list-67', class: '' },
    { path: '/typography', title: 'Typography',  icon:'text_caps-small', class: '' }
    */
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
