import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService, GlobalService } from "src/app/services";

declare interface RouteInfo {
  id: number;
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    id: 1,
    path: "/dashboard",
    title: "Dashboard",
    icon: "ni-tv-2 text-primary",
    class: "",
  },
  {
    id: 2,
    path: "",
    title: "Mi Taller",
    icon: "ni-bullet-list-67 text-red",
    class: "",
  },
  {
    id: 3,
    path: "/workshops",
    title: "Talleres",
    icon: "ni-bullet-list-67 text-red",
    class: "",
  },
  {
    id: 4,
    path: "/users",
    title: "Usuarios",
    icon: "ni ni-single-02 text-yellow",
    class: "",
  },
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

    if (this.userInfo.role.role === "ADMIN") {
      this.menuItems = ROUTES.filter((menuItem) => menuItem.id <= 2);
      this.menuItems[1].path = `/workshop-profile/${this.userInfo.workshops[0]?.nit}`;
    }
    if (this.userInfo.role.role === "ROOT") {
      this.menuItems = ROUTES.filter((menuItem) => menuItem.id !== 2);
    }

    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  public logout() {
    this.authService.logout();
  }
}
