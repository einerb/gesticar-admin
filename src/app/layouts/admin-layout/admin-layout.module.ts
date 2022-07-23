import { NgModule, LOCALE_ID } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BlockUIModule } from "ng-block-ui";
import { ClipboardModule } from "ngx-clipboard";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { WorkshopsComponent } from "src/app/pages/workshops/workshops.component";
import { UsersComponent } from "src/app/pages/users/users.component";
import { WorkshopProfileComponent } from "src/app/pages/workshop-profile/workshop-profile.component";
import { SettingsComponent } from "src/app/pages/settings/settings.component";
import { ModalAssignAdminComponent } from "src/app/pages/workshop-profile/modal-assign-admin/modal-assign-admin.component";
import { ModalOwnerComponent } from "src/app/pages/user-profile/modal-owner/modal-owner.component";
import { ModalPenaltyComponent } from "src/app/pages/user-profile/modal-penalty/modal-penalty.component";
import { ModalNewWorkshopComponent } from "src/app/pages/workshops/modal-new-workshop/modal-new-workshop.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    BlockUIModule.forRoot({
      message: "Cargando...",
    }),
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    WorkshopsComponent,
    WorkshopProfileComponent,
    UsersComponent,
    SettingsComponent,
    ModalAssignAdminComponent,
    ModalOwnerComponent,
    ModalPenaltyComponent,
    ModalNewWorkshopComponent,
  ],
  providers: [],
})
export class AdminLayoutModule {}
