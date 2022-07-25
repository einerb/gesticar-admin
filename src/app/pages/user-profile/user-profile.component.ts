import * as moment from "moment";
import { ActivatedRoute } from "@angular/router";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { User } from "src/app/entities/user.entity";
import {
  AuthService,
  GlobalService,
  UserService,
  VehicleService,
} from "src/app/services";
import {
  NgbDateStruct,
  NgbModal,
  NgbModalConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { ModalPenaltyComponent } from "./modal-penalty/modal-penalty.component";
import { ModalOwnerComponent } from "./modal-owner/modal-owner.component";
import { ModalLicenseComponent } from "../workshop-profile/modal-license/modal-license.component";
import { ModalVehicleComponent } from "../workshop-profile/modal-vehicle/modal-vehicle.component";
import { Car } from "src/app/entities/car.entity";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  public role: string;
  public infoFullUser: User;
  public infoOwner: any[] = [];
  public infoPenalty: any[] = [];
  public age: number;
  public servicesCompleted: number = 0;
  public servicesActive: number = 0;
  public servicesCreated: number = 0;
  public createdAt: string;
  public allowEdit: boolean = false;
  public userInfo: User;
  public editForm: FormGroup;
  public model: NgbDateStruct;
  public maxDate = {
    year: parseInt(moment(new Date()).add(-18, "years").format("YYYY")),
    month: parseInt(moment(new Date().getMonth()).format("MM")),
    day: parseInt(moment(new Date().getDay()).format("DD")),
  };

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly vehicleService: VehicleService,
    private readonly globalService: GlobalService,
    private route: ActivatedRoute,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
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
      let id = params["id"];
      this.getUserInfo(id);

      this.userInfo.identification.toString() === id
        ? (this.allowEdit = true)
        : (this.allowEdit = false);
    });
  }

  get f() {
    return this.editForm.controls;
  }

  public edit(identification: number) {
    if (this.editForm.invalid) {
      return;
    }

    let birthdateFormatted =
      this.editForm.get("birthdate").value?.year +
      "-" +
      this.editForm.get("birthdate").value?.month +
      "-" +
      this.editForm.get("birthdate").value?.day;

    const data: any = {
      name: this.editForm.get("name").value,
      lastname: this.editForm.get("lastname").value,
      occupation: this.editForm.get("occupation").value,
      city: this.editForm.get("city").value,
      address: this.editForm.get("address").value,
      birthdate: birthdateFormatted,
      phone: this.editForm.get("phone").value,
      state: this.editForm.get("state").value,
      gender: this.infoFullUser.gender,
      workshopId: this.infoFullUser.workshops
        ? this.infoFullUser.workshops.id
        : null,
    };

    this.userService.update(identification, data).subscribe((res) => {
      if (res.code > 1000) {
        this.globalService.onSuccess(res.message);
        this.getUserInfo(identification);
      } else {
        this.globalService.onFailure(res.error);
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

  public openModalPenalty() {
    this.blockUI.start();

    this.getInfoPenalty("CC", this.infoFullUser.identification);

    const modalRef = this.modalService.open(ModalPenaltyComponent, {
      size: "lg",
    });
    modalRef.componentInstance.title = "Comparendos";
    modalRef.componentInstance.data = this.infoPenalty;

    this.blockUI.stop();
  }

  public openModalOwner() {
    this.blockUI.start();

    if (this.infoFullUser.car !== null) {
      this.getInfoOwner(this.infoFullUser.car);
    }

    const modalRef = this.modalService.open(ModalOwnerComponent);
    modalRef.componentInstance.title = "Propietarios";
    modalRef.componentInstance.data = this.infoOwner;
    this.blockUI.stop();
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
  }

  private createForm() {
    this.editForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      occupation: [""],
      city: ["Barranquilla"],
      address: [""],
      birthdate: [""],
      phone: [""],
      state: [false, [Validators.required]],
    });
  }

  private getServiceCount(stateService: string) {
    if (stateService === "ACTIVE") {
      this.servicesActive += 1;
    } else if (stateService === "CREATED") {
      this.servicesCompleted += 1;
    } else {
      this.servicesCreated += 1;
    }
  }

  private getCreatedAt(date: string) {
    this.createdAt = moment(date).format("ll");
  }

  private getAge(birthdate: string) {
    this.age = moment(new Date()).diff(birthdate, "years");
  }

  private getInfoOwner(car: any) {
    this.vehicleService.getOwner(car.plate).subscribe((res: any) => {
      res.data.propietarios.forEach((element) => {
        this.infoOwner.push({
          documentType: element.idTipoDocumento,
          documentNumber: element.noDocumento,
          fullname: element.nombreCompleto,
        });
      });
    });
  }

  private getInfoPenalty(documentType: string, documentNumber: number) {
    this.vehicleService
      .getPenalty(documentType, documentNumber)
      .subscribe((res: any) => {
        if (res.data != "") {
          res.data.comparendos.forEach((element) => {
            this.infoPenalty.push({
              description: element.descripcionInfraccion,
              address: element.direccionComparendo,
              state: element.estadoComparendo,
              date: element.fechaComparendo,
              photodetection: element.fotodeteccion,
              number: element.numeroComparendo,
              secretary: element.secretariaComparendo,
              total: element.total,
            });
          });
        }
      });
  }

  private getRole(role: string) {
    switch (role) {
      case "ROOT":
        this.role = "Super Root";
        break;
      case "ADMIN":
        this.role = "Administrador";
        break;
      default:
        this.role = "Propietario";
    }
  }

  private getUserInfo(identification: number) {
    this.blockUI.start();
    this.userService.getById(identification).subscribe((res) => {
      this.blockUI.stop();

      this.infoFullUser = res.data;
      this.patchValue(this.infoFullUser);
      this.getRole(res.data.role.role);
      this.getAge(res.data.birthdate);
      this.getCreatedAt(res.data.createdAt);
      res.data.services.forEach((service) => {
        this.getServiceCount(service.state);
      });

      this.infoFullUser.workshops = res.data.workshops[0];
    });
  }

  private patchValue(data) {
    let birthdate = data?.birthdate.split("-");

    this.editForm.patchValue({
      identification: data?.identification,
      name: data?.name,
      lastname: data?.lastname,
      occupation: data?.occupation,
      city: data?.city,
      address: data?.address,
      birthdate: this.model,
      phone: data?.phone,
      email: data?.email,
      password: data?.password,
      state: data?.state,
    });
  }
}
