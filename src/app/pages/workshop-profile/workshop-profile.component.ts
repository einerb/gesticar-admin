import { ActivatedRoute } from "@angular/router";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import * as moment from "moment-timezone";
import Swal from "sweetalert2";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";

import { WorkshopService } from "src/app/services/workshop.service";
import { Workshop } from "src/app/entities/workshop.entity";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  AuthService,
  GlobalService,
  HelpService,
  UserService,
} from "src/app/services";
import { ModalAssignAdminComponent } from "./modal-assign-admin/modal-assign-admin.component";
import { User } from "src/app/entities/user.entity";
import { ModalLicenseComponent } from "./modal-license/modal-license.component";
import { Car } from "src/app/entities/car.entity";
import { ModalVehicleComponent } from "./modal-vehicle/modal-vehicle.component";

@Component({
  selector: "app-workshop-profile",
  templateUrl: "./workshop-profile.component.html",
  styleUrls: ["./workshop-profile.component.scss"],
})
export class WorkshopProfileComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  public infoFullWorkshop: Workshop;
  public infoFullWorkshopUser: User[] = [];
  public infoFullWorkshopUserAdmin: User[] = [];
  public createdAt: string;
  public updatedAt: string;
  public editForm: FormGroup;
  public nit: string;
  public userInfo: User;

  constructor(
    private readonly workshopService: WorkshopService,
    private readonly globalService: GlobalService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly helpService: HelpService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = "static";
    config.keyboard = false;

    this.blockUI.start();
    this.createForm();
  }

  ngOnInit() {
    const token: any = this.globalService.getToken();
    this.userInfo = this.authService.getDecodedAccessToken(token);

    this.route.params.subscribe((params) => {
      this.nit = params["id"];
      this.getWokshopInfo(this.nit);
    });

    this.helpService.modal$.subscribe((md) => {
      if (md) {
        this.openModalNew();
      }
    });
  }

  get f() {
    return this.editForm.controls;
  }

  public delete(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-default",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "¿Está usted seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar!",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.userService.delete(id).subscribe((res) => {
            if (res.code > 1000) {
              this.globalService.onSuccess(res.message);
              this.getWokshopInfo(this.nit);
            } else {
              this.globalService.onFailure(res.error);
            }
          });
        }
      });
  }

  public edit(nit: string) {
    this.blockUI.start();
    this.workshopService.update(nit, this.editForm.value).subscribe(
      (res) => {
        this.blockUI.stop();
        if (res.code > 1000) {
          this.globalService.onSuccess(res.message);
          this.getWokshopInfo(nit);
        } else {
          this.globalService.onFailure(res.error);
        }
      },
      (resError) => {
        this.blockUI.stop();
        this.globalService.onFailure(resError.message);
      }
    );
  }

  public openModalNew() {
    const modalRef = this.modalService.open(ModalAssignAdminComponent, {
      size: "lg",
    });
    modalRef.componentInstance.title = "Asignar Admin";
    modalRef.componentInstance.data = this.infoFullWorkshop.id;

    modalRef.result.then((result) => {
      if (result == "success") {
        this.getWokshopInfo(this.nit);
      }
    });
  }

  public openModalLicense(licencias: []) {
    const modalRef = this.modalService.open(ModalLicenseComponent, {
      size: "lg",
    });
    modalRef.componentInstance.title = "Licencias";
    modalRef.componentInstance.data = licencias;
  }

  public openModalvehicle(vehicle: Car) {
    const modalRef = this.modalService.open(ModalVehicleComponent, {
      size: "lg",
    });
    modalRef.componentInstance.title = `Información general del Vehículo ${vehicle.plate.toUpperCase()}`;
    modalRef.componentInstance.data = vehicle;
  }

  private createForm() {
    this.editForm = this.formBuilder.group({
      address: ["", [Validators.required]],
      limit_users: [0, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      name: ["", [Validators.required]],
      nit: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      state: [true, [Validators.required]],
    });
  }

  private getCreatedAt(date: string) {
    this.createdAt = moment.tz(date, "America/Bogota").format("lll");
  }

  private getUpdatedAt(date: string) {
    this.updatedAt = moment.tz(date, "America/Bogota").format("lll");
  }

  private getWokshopInfo(nit: any) {
    this.workshopService.getByNit(nit).subscribe((res) => {
      this.blockUI.stop();
      this.infoFullWorkshop = res.data;
      res.data?.users.forEach((element) => {
        if (element.role.role === "USER") {
          this.infoFullWorkshopUser.push(element);
        }
      });
      this.patchValue(this.infoFullWorkshop);
      this.getCreatedAt(this.infoFullWorkshop.createdAt);
      this.getUpdatedAt(this.infoFullWorkshop.updatedAt);
    });
  }

  private patchValue(data) {
    this.editForm.patchValue({
      name: data.name,
      address: data.address,
      limit_users: data.limit_users,
      nit: data.nit,
      phone: data.phone,
      state: data.state,
    });
  }
}
