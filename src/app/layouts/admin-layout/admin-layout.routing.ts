import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { WorkshopsComponent } from "src/app/pages/workshops/workshops.component";
import { UsersComponent } from "src/app/pages/users/users.component";
import { AuthGuard } from "src/app/services/guards/auth.guard";
import { WorkshopProfileComponent } from "src/app/pages/workshop-profile/workshop-profile.component";

export const AdminLayoutRoutes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "workshops",
    component: WorkshopsComponent,
    canActivate: [AuthGuard],
  },
  { path: "users", component: UsersComponent, canActivate: [AuthGuard] },
  {
    path: "user-profile/:id",
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "workshop-profile/:id",
    component: WorkshopProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: "tables", component: TablesComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
];
