import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService, GlobalService } from "src/app/services";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "ni-tv-2 text-primary",
    class: "",
  },
  {
    path: "/workshops",
    title: "Talleres",
    icon: "ni-bullet-list-67 text-red",
    class: "",
  },
  {
    path: "/users",
    title: "Usuarios",
    icon: "ni ni-single-02 text-yellow",
    class: "",
  },
  //{ path: '/icons', title: 'Talleres',  icon:'ni-planet text-blue', class: '' },
  //{ path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public userInfo: any;
  public menuItems: any[];
  public isCollapsed = true;

  constructor(
    private router: Router,
    private readonly authService: AuthService,
    private readonly globalService: GlobalService
  ) {}

  ngOnInit() {
    const token: any = this.globalService.getToken();
    this.userInfo = this.authService.getDecodedAccessToken(token);

    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  public logout() {
    this.authService.logout();
  }
}
