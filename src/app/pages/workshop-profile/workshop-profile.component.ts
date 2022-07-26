import { ActivatedRoute } from "@angular/router";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { Component, OnInit } from "@angular/core";
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
  public opMd = false;

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
    modalRef.componentInstance.title =
      this.userInfo.role.role === "ADMIN" ? "Crear Cliente" : "Asignar Admin";
    modalRef.componentInstance.data = this.infoFullWorkshop.id;
    modalRef.componentInstance.admin = this.userInfo;

    modalRef.result.then((result) => {
      if (result?.state == "success") {
        this.getWokshopInfo(this.nit);

        if (this.userInfo.role.role === "ADMIN") {
          Swal.fire({
            title: "Pasos iniciales",
            text: "1. Asigne el vehículo al nuevo cliente agregado al taller. Desea realizar esta operación?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si!",
            cancelButtonText: "No, después!",
            allowOutsideClick: false,
          }).then((resultIn) => {
            if (resultIn.isConfirmed) {
              this.openModalvehicle(null, false, result.data);
            }
          });
        }
      }
    });
  }

  public openModalLicense(licencias: [], isExist?: boolean, id?: number) {
    const modalRef = this.modalService.open(ModalLicenseComponent, {
      size: "lg",
    });

    const data = {
      title: isExist ? "Licencias" : "Agregar licencia",
      license: licencias,
      isExist: isExist,
      id: id,
    };
    modalRef.componentInstance.data = data;
  }

  public openModalvehicle(vehicle?: Car, isExist?: boolean, id?: number) {
    const modalRef = this.modalService.open(ModalVehicleComponent, {
      size: "lg",
    });
    const data = {
      title: isExist
        ? `Información general del Vehículo ${vehicle.plate.toUpperCase()}`
        : `Crear Vehículo`,
      vehicle: vehicle,
      isExist: isExist,
      id: id,
    };
    modalRef.componentInstance.data = data;

    modalRef.result.then((result) => {
      if (result == "success") {
        Swal.fire({
          title: "Pasos iniciales",
          text: "2. Agregue las licencias respectivas al propietario del nuevo vehículo creado. Desea realizar esta operación?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Si!",
          cancelButtonText: "No, después!",
          allowOutsideClick: false,
        }).then((resultIn) => {
          if (resultIn.isConfirmed) {
            this.openModalLicense(null, false, 123);
          }
        });
      }
    });
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
    this.infoFullWorkshopUserAdmin = [];
    this.infoFullWorkshopUser = [];

    this.workshopService.getByNit(nit).subscribe((res) => {
      this.blockUI.stop();
      this.infoFullWorkshop = res.data;
      res.data?.users.filter((element) => {
        if (element.role.role === "USER") {
          this.infoFullWorkshopUser.push(element);
        }

        this.infoFullWorkshopUserAdmin.push(element);
      });

      this.patchValue(this.infoFullWorkshop);
      this.getCreatedAt(this.infoFullWorkshop.createdAt);
      this.getUpdatedAt(this.infoFullWorkshop.updatedAt);
    });
  }

  private patchValue(data) {
    this.editForm.patchValue({
      name: data?.name,
      address: data?.address,
      limit_users: data?.limit_users,
      nit: data?.nit,
      phone: data?.phone,
      state: data?.state,
    });
  }
}
