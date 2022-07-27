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
import { ModalNewServiceComponent } from "./modal-new-service/modal-new-service.component";

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
  public servicesCompleted: string[] = [];
  public servicesActive: string[] = [];
  public servicesCreated: string[] = [];
  public createdAt: string;
  public allowEdit: boolean = false;
  public userInfo: User;
  public editForm: FormGroup;
  public vehicleForm: FormGroup;
  public model: NgbDateStruct;
  public maxDate = {
    year: parseInt(moment(new Date()).add(-18, "years").format("YYYY")),
    month: parseInt(moment(new Date().getMonth()).format("MM")),
    day: parseInt(moment(new Date().getDay()).format("DD")),
  };
  public id: number;

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
    this.createFormVehicle();
  }

  ngOnInit() {
    const token: any = this.globalService.getToken();
    this.userInfo = this.authService.getDecodedAccessToken(token);

    this.route.params.subscribe((params) => {
      this.id = params["id"];
      this.getUserInfo(this.id);

      this.userInfo.identification === this.id
        ? (this.allowEdit = true)
        : (this.allowEdit = false);
    });
  }

  get f() {
    return this.editForm.controls;
  }

  get g() {
    return this.vehicleForm.controls;
  }

  public edit(identification: number) {
    if (this.editForm.invalid) {
      return;
    }

    const data: any = {
      name: this.editForm.get("name").value,
      lastname: this.editForm.get("lastname").value,
      occupation: this.editForm.get("occupation").value,
      city: this.editForm.get("city").value,
      address: this.editForm.get("address").value,
      birthdate: this.formattedDateInv(this.editForm.get("birthdate").value),
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

  public editVehicle() {
    if (this.vehicleForm.invalid) {
      return;
    }

    const data: Car = {
      plate: this.infoFullUser.car["plate"],
      bodywork: this.vehicleForm.get("bodywork").value,
      brand: this.vehicleForm.get("brand").value,
      color: this.vehicleForm.get("color").value,
      countryOrigin: this.vehicleForm.get("countryOrigin").value,
      cylinder: this.vehicleForm.get("cylinder").value,
      dateShielding:
        this.vehicleForm.get("dateShielding").value === null
          ? null
          : this.formattedDateInv(this.vehicleForm.get("dateShielding").value),
      divipola: this.vehicleForm.get("divipola").value,
      dueDateSoat: this.formattedDateInv(
        this.vehicleForm.get("dueDateSoat").value
      ),
      enrollmentDate: this.formattedDateInv(
        this.vehicleForm.get("enrollmentDate").value
      ),
      expeditionDateSoat: this.formattedDateInv(
        this.vehicleForm.get("expeditionDateSoat").value
      ),
      fuel: this.vehicleForm.get("fuel").value,
      identificationOwner: this.id,
      isShielding: this.vehicleForm.get("isShielding").value
        ? this.vehicleForm.get("isShielding").value
        : false,
      levelShielding: this.vehicleForm.get("levelShielding").value
        ? this.vehicleForm.get("levelShielding").value
        : null,
      line: this.vehicleForm.get("line").value,
      model: this.vehicleForm.get("model").value,
      noChasis: this.vehicleForm.get("noChasis").value,
      noMotor: this.vehicleForm.get("noMotor").value,
      noSerie: this.vehicleForm.get("noSerie").value,
      noVin: this.vehicleForm.get("noVin").value,
      occupant: this.vehicleForm.get("occupant").value,
      pbv: this.vehicleForm.get("pbv").value,
      requireTechReview: this.vehicleForm.get("requireTechReview").value,
      soatNumber: this.vehicleForm.get("soatNumber").value,
      state: this.vehicleForm.get("state2").value,
      statusVehicle: this.vehicleForm.get("statusVehicle").value,
      techReview: this.vehicleForm.get("techReview").value,
      tonnage: this.vehicleForm.get("tonnage").value,
      transitAgency: this.vehicleForm.get("transitAgency").value,
      typeService: this.vehicleForm.get("typeService").value,
      typeVehicle: this.vehicleForm.get("typeVehicle").value,
    };

    this.vehicleService
      .update(this.infoFullUser.car["plate"], data)
      .subscribe((res) => {
        if (res.code > 1000) {
          this.globalService.onSuccess(res.message);
          this.getUserInfo(this.id);
        } else {
          this.globalService.onFailure(res.error);
        }
      });
  }

  public openModalLicense(licencias: [], isExist?: boolean, user?: User) {
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

    modalRef.result.then(() => {
      this.getUserInfo(user.identification);
    });
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

  public openModalService(user?: User) {
    const modalRef = this.modalService.open(ModalNewServiceComponent);
    const data = {
      title: `Crear Servicio`,
      user: user,
    };
    modalRef.componentInstance.data = data;

    modalRef.result.then((result) => {
      if (result == "success") {
        this.getUserInfo(user.identification);
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
        this.getUserInfo(id);
      }
    });
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
      state: [false],
    });
  }

  private createFormVehicle() {
    this.vehicleForm = this.formBuilder.group({
      plate: [""],
      bodywork: ["", [Validators.required]],
      brand: ["", [Validators.required]],
      color: ["", [Validators.required]],
      countryOrigin: ["", [Validators.required]],
      cylinder: ["", [Validators.required]],
      dateShielding: [""],
      divipola: ["", [Validators.required]],
      dueDateSoat: [""],
      enrollmentDate: [""],
      expeditionDateSoat: [""],
      fuel: ["", [Validators.required]],
      isShielding: [false],
      levelShielding: [null],
      line: ["", [Validators.required]],
      model: ["", [Validators.required]],
      noChasis: ["", [Validators.required]],
      noMotor: ["", [Validators.required]],
      noSerie: ["", [Validators.required]],
      noVin: ["", [Validators.required]],
      occupant: ["", [Validators.required]],
      pbv: ["", [Validators.required]],
      requireTechReview: ["", [Validators.required]],
      soatNumber: ["", [Validators.required]],
      state2: [false],
      statusVehicle: ["", [Validators.required]],
      techReview: ["", [Validators.required]],
      tonnage: ["", [Validators.required]],
      transitAgency: ["", [Validators.required]],
      typeService: ["", [Validators.required]],
      typeVehicle: ["", [Validators.required]],
    });
  }

  private formattedDate(date: string) {
    let dateFinal;
    if (date !== undefined) {
      let dateFormatted = date.split("-");

      dateFinal = {
        year: parseInt(dateFormatted[0]),
        month: parseInt(dateFormatted[1]),
        day: parseInt(dateFormatted[2]),
      };
    } else {
      dateFinal = null;
    }

    return dateFinal;
  }

  private formattedDateInv(date: any) {
    let dateFinal;
    if (date !== undefined) {
      dateFinal = `${date?.year}-${date?.month}-${date?.day}`;
    } else {
      dateFinal = null;
    }

    return dateFinal;
  }

  private getCreatedAt(date: string) {
    this.createdAt = moment(date).format("ll");
  }

  private getAge(birthdate: string) {
    this.age = moment(moment(new Date()).format("YYYY-MM-DD")).diff(
      moment(birthdate).format("YYYY-MM-DD"),
      "years"
    );
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
      this.getRole(res.data?.role.role);
      this.getAge(res.data?.birthdate);
      this.getCreatedAt(res.data?.createdAt);
      if (this.infoFullUser?.car) this.patchValueVehcile(this.infoFullUser.car);
      this.servicesActive = res.data?.services.filter(
        (service) => service.state === "ACTIVE"
      );
      this.servicesCreated = res.data?.services.filter(
        (service) => service.state === "CREATED"
      );
      this.servicesCompleted = res.data?.services.filter(
        (service) => service.state === "COMPLETED"
      );

      if (this.infoFullUser?.workshops !== undefined)
        this.infoFullUser.workshops = res.data?.workshops[0];
    });
  }

  private patchValue(data) {
    this.editForm.patchValue({
      identification: data?.identification,
      name: data?.name,
      lastname: data?.lastname,
      occupation: data?.occupation,
      city: data?.city,
      address: data?.address,
      birthdate: this.formattedDate(data?.birthdate),
      phone: data?.phone,
      email: data?.email,
      password: data?.password,
      state: data?.state,
    });
  }

  private patchValueVehcile(data) {
    this.vehicleForm.patchValue({
      plate: data?.plate,
      bodywork: data?.bodywork,
      brand: data?.brand,
      color: data?.color,
      countryOrigin: data?.countryOrigin,
      cylinder: data?.cylinder,
      dateShielding: data?.dateShielding,
      divipola: data?.divipola,
      dueDateSoat: this.formattedDate(data?.dueDateSoat),
      enrollmentDate: this.formattedDate(data?.enrollmentDate),
      expeditionDateSoat: this.formattedDate(data?.expeditionDateSoat),
      fuel: data?.fuel,
      identificationOwner: data?.identificationOwner,
      isShielding: data?.isShielding,
      levelShielding: data?.levelShielding,
      line: data?.line,
      model: data?.model,
      noChasis: data?.noChasis,
      noMotor: data?.noMotor,
      noSerie: data?.noSerie,
      noVin: data?.noVin,
      occupant: data?.occupant,
      pbv: data?.pbv,
      requireTechReview: data?.requireTechReview,
      soatNumber: data?.soatNumber,
      state2: data?.state,
      statusVehicle: data?.statusVehicle,
      techReview: data?.techReview,
      tonnage: data?.tonnage,
      transitAgency: data?.transitAgency,
      typeService: data?.typeService,
      typeVehicle: data?.typeVehicle,
    });
  }
}
