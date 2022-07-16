import * as moment from "moment";
import { ActivatedRoute } from "@angular/router";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ModalManager } from "ngb-modal";

import { User } from "src/app/entities/user.entity";
import {
  AuthService,
  GlobalService,
  UserService,
  VehicleService,
} from "src/app/services";
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
  @ViewChild("infoPenaltyModal") infoPenaltyModal;
  @ViewChild("infoOwnerModal") infoOwnerModal;
  private modalRef;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly vehicleService: VehicleService,
    private readonly globalService: GlobalService,
    private route: ActivatedRoute,
    private modalService: ModalManager
  ) {
    this.blockUI.start();
  }

  ngOnInit() {
    const token: any = this.globalService.getToken();
    let userInfo = this.authService.getDecodedAccessToken(token);

    this.route.params.subscribe((params) => {
      let id = params["id"];
      this.getUserInfo(id);

      userInfo.identification.toString() === id
        ? (this.allowEdit = true)
        : (this.allowEdit = false);
    });
  }

  public openModalPenalty() {
    this.modalRef = this.modalService.open(this.infoPenaltyModal, {
      size: "lg",
      modalClass: "infoPenaltyModal",
      hideCloseButton: false,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: false,
      backdropClass: "modal-backdrop",
    });
  }

  public openModalOwner() {
    this.modalRef = this.modalService.open(this.infoOwnerModal, {
      size: "md",
      modalClass: "infoOwnerModal",
      hideCloseButton: false,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: false,
      backdropClass: "modal-backdrop",
    });
  }

  public closeModal() {
    this.modalService.close(this.modalRef);
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
    this.userService.getById(identification).subscribe((res) => {
      this.blockUI.stop();
      res.data.forEach((element) => {
        this.infoFullUser = element;
        this.getRole(element.role.role);
        this.getAge(element.birthdate);
        this.getCreatedAt(element.createdAt);
        element.services.forEach((service) => {
          this.getServiceCount(service.state);
        });
      });

      if (this.infoFullUser.car !== null) {
        this.getInfoOwner(this.infoFullUser.car);
      }
      this.getInfoPenalty("CC", this.infoFullUser.identification);
    });
  }
}
