import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import {
  NgbActiveModal,
  NgbModal,
  NgbModalConfig,
} from "@ng-bootstrap/ng-bootstrap";

import { AuthService, GlobalService, HelpService } from "src/app/services";
import { WorkshopService } from "src/app/services/workshop.service";
import { User } from "src/app/entities/user.entity";
import { ModalLicenseComponent } from "../../workshop-profile/modal-license/modal-license.component";
import { ModalVehicleComponent } from "../../workshop-profile/modal-vehicle/modal-vehicle.component";
import { ModalAssignAdminComponent } from "../../workshop-profile/modal-assign-admin/modal-assign-admin.component";
import { Car } from "src/app/entities/car.entity";

@Component({
  selector: "app-modal-new-workshop",
  templateUrl: "./modal-new-workshop.component.html",
  styleUrls: ["./modal-new-workshop.component.scss"],
})
export class ModalNewWorkshopComponent implements OnInit {
  @Input() title;
  public addForm: FormGroup;
  public userInfo: User;
  public workshopId: number;

  constructor(
    private readonly workshopService: WorkshopService,
    private readonly authService: AuthService,
    public readonly globalService: GlobalService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = "static";
    config.keyboard = false;

    this.createForm();
  }

  ngOnInit(): void {
    const token: any = this.globalService.getToken();
    this.userInfo = this.authService.getDecodedAccessToken(token);
  }

  get f() {
    return this.addForm.controls;
  }

  public create() {
    if (this.addForm.invalid) {
      return;
    }

    this.workshopService.create(this.addForm.value).subscribe(
      (res) => {
        if (res.code > 1000) {
          (this.workshopId = res.data.workshop.nit), this.activeModal.close();
          Swal.fire({
            title: `Operación exitosa`,
            text: res.message,
            icon: "success",
            confirmButtonText: "Ok",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Pasos iniciales",
                text: "Asigne administradores al nuevo taller. Desea realizar esta operación?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Si!",
                cancelButtonText: "No, después!",
                allowOutsideClick: false,
              }).then((resultIn) => {
                if (resultIn.isConfirmed) {
                  this.openModalNew(res.data.workshop.id);
                } else {
                  this.router.navigate(["/workshop-profile", this.workshopId]);
                }
              });
            }
          });
        } else {
          this.globalService.onFailure(res.error);
        }
      },
      (resError) => this.globalService.onFailure(resError.error)
    );
  }

  private createForm() {
    this.addForm = this.formBuilder.group({
      address: ["", [Validators.required]],
      limit_users: [0, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      name: ["", [Validators.required]],
      nit: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      state: [true, [Validators.required]],
    });
  }

  private openModalNew(id: number) {
    const modalRef = this.modalService.open(ModalAssignAdminComponent, {
      size: "lg",
    });
    modalRef.componentInstance.title =
      this.userInfo.role.role === "ADMIN" ? "Crear Cliente" : "Asignar Admin";
    modalRef.componentInstance.data = id;
    modalRef.componentInstance.admin = this.userInfo;

    modalRef.result.then((result) => {
      if (result?.state == "success") {
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
              this.openModalvehicle(null, false, result?.data);
            } else {
              this.router.navigate(["/workshop-profile", this.workshopId]);
            }
          });
        } else {
          this.router.navigate(["/workshop-profile", this.workshopId]);
        }
      }
    });
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
            this.openModalLicense(null, false, id);
          } else {
            this.router.navigate(["/workshop-profile", this.workshopId]);
          }
        });
      }
    });
  }

  public openModalLicense(licencias: [], isExist?: boolean, user?: number) {
    const modalRef = this.modalService.open(ModalLicenseComponent, {
      size: "lg",
    });

    const data = {
      title: isExist ? "Licencias" : "Agregar licencia",
      license: licencias,
      isExist: isExist,
      id: user,
    };
    modalRef.componentInstance.data = data;
  }
}
