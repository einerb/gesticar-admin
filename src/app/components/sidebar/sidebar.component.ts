import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/workshops', title: 'Talleres',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/users', title: 'Usuarios',  icon:'ni ni-single-02 text-yellow', class: '' },
    //{ path: '/icons', title: 'Talleres',  icon:'ni-planet text-blue', class: '' },
    //{ path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}