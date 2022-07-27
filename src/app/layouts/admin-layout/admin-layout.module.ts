import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BlockUIModule } from "ng-block-ui";
import { NgxVerticalTimelineModule } from "ngx-vertical-timeline";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { WorkshopsComponent } from "src/app/pages/workshops/workshops.component";
import { UsersComponent } from "src/app/pages/users/users.component";
import { WorkshopProfileComponent } from "src/app/pages/workshop-profile/workshop-profile.component";
import { SettingsComponent } from "src/app/pages/settings/settings.component";
import { ModalAssignAdminComponent } from "src/app/pages/workshop-profile/modal-assign-admin/modal-assign-admin.component";
import { ModalOwnerComponent } from "src/app/pages/user-profile/modal-owner/modal-owner.component";
import { ModalPenaltyComponent } from "src/app/pages/user-profile/modal-penalty/modal-penalty.component";
import { ModalNewWorkshopComponent } from "src/app/pages/workshops/modal-new-workshop/modal-new-workshop.component";
import { ServicesComponent } from "src/app/pages/services/services.component";
import { ModalNewServiceComponent } from "src/app/pages/user-profile/modal-new-service/modal-new-service.component";
import { ModalVehicleComponent } from "src/app/pages/workshop-profile/modal-vehicle/modal-vehicle.component";
import { ModalLicenseComponent } from "src/app/pages/workshop-profile/modal-license/modal-license.component";
import { ServiceProfileComponent } from "src/app/pages/service-profile/service-profile.component";
import { ServiceEventsComponent } from "src/app/pages/service-events/service-events.component";
import { ModalNewEventComponent } from "src/app/pages/service-events/modal-new-event/modal-new-event.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxVerticalTimelineModule,
    BlockUIModule.forRoot({
      message: "Cargando...",
    }),
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    WorkshopsComponent,
    WorkshopProfileComponent,
    UsersComponent,
    SettingsComponent,
    ModalAssignAdminComponent,
    ModalOwnerComponent,
    ModalPenaltyComponent,
    ModalNewWorkshopComponent,
    ModalLicenseComponent,
    ModalVehicleComponent,
    ModalNewServiceComponent,
    ServicesComponent,
    ServiceProfileComponent,
    ServiceEventsComponent,
    ModalNewEventComponent,
  ],
  providers: [],
})
export class AdminLayoutModule {}
