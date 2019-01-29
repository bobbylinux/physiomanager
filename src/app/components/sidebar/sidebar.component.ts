import { Component, OnInit, Input } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', icon: 'now-ui-icons design_app', class: '' },
    { path: '/patients', title: 'Ricerca Pazienti', icon: 'ui-1_zoom-bold', class: '' },
    { path: '/physiotherapists', title: 'Fisioterapisti', icon: 'business_badge', class: '' },
    { path: '/pains', title: 'Indici di Dolore', icon: 'business_badge', class: '' },
    { path: '/doctors', title: 'Medici', icon: 'business_badge', class: '' },
    { path: '/programs', title: 'Programmi Riabilitativi', icon: 'business_badge', class: '' },
    { path: '/work_results', title: 'Risultati del Lavoro', icon: 'business_badge', class: '' },
    { path: '/therapies', title: 'Terapie', icon: 'business_badge', class: '' },
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    menuItems: any[];
    @Input() place: string;
    
    constructor() { }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isMobileMenu() {
        if (window.innerWidth > 991) {
            return false;
        }
        return true;
    };
}
