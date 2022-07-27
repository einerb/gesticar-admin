import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { WorkshopsComponent } from "src/app/pages/workshops/workshops.component";
import { UsersComponent } from "src/app/pages/users/users.component";
import { AuthGuard } from "src/app/services/guards/auth.guard";
import { WorkshopProfileComponent } from "src/app/pages/workshop-profile/workshop-profile.component";
import { SettingsComponent } from "src/app/pages/settings/settings.component";
import { ServicesComponent } from "src/app/pages/services/services.component";
import { ServiceProfileComponent } from "src/app/pages/service-profile/service-profile.component";
import { ServiceEventsComponent } from "src/app/pages/service-events/service-events.component";

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
  {
    path: "settings",
    component: SettingsComponent,
    canActivate: [AuthGuard],
  },
  { path: "workshops/services", component: ServicesComponent },
  {
    path: "user-profile/:id/service-profile",
    component: ServiceProfileComponent,
  },
  {
    path: "user-profile/:id/service-profile/:hash/service-events",
    component: ServiceEventsComponent,
  },
];
