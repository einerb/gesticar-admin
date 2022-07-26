import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { Car } from "src/app/entities/car.entity";

import { GlobalService, VehicleService } from "src/app/services";

@Component({
  selector: "app-modal-vehicle",
  templateUrl: "./modal-vehicle.component.html",
  styleUrls: ["./modal-vehicle.component.scss"],
})
export class ModalVehicleComponent implements OnInit {
  @Input() data;
  @BlockUI() blockUI: NgBlockUI;
  public searchForm: FormGroup;
  public addForm: FormGroup;
  public result: any;
  public loading = false;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private readonly carService: VehicleService,
    public readonly globalService: GlobalService
  ) {
    this.searchForm = this.formBuilder.group({
      plateSearch: [
        "",
        [
          Validators.pattern(
            /[a-zA-Z]{3}[0-9]{3}|[a-zA-Z]{3}[0-9]{2}[a-zA-Z]/g
          ),
          Validators.required,
        ],
      ],
    });

    this.createForm();
  }

  ngOnInit(): void {
    if (this.data.isExist) this.patchValue(this.data?.vehicle);
  }

  get f() {
    return this.searchForm.controls;
  }

  get g() {
    return this.addForm.controls;
  }

  public create() {
    if (this.addForm.invalid) {
      return;
    }

    const data: Car = {
      plate: this.addForm.get("plate").value,
      bodywork: this.addForm.get("bodywork").value,
      brand: this.addForm.get("brand").value,
      color: this.addForm.get("color").value,
      countryOrigin: this.addForm.get("countryOrigin").value,
      cylinder: this.addForm.get("cylinder").value,
      dateShielding: this.formattedDateInv(
        this.addForm.get("dateShielding").value
      ),
      divipola: this.addForm.get("divipola").value,
      dueDateSoat: this.formattedDateInv(this.addForm.get("dueDateSoat").value),
      enrollmentDate: this.formattedDateInv(
        this.addForm.get("enrollmentDate").value
      ),
      expeditionDateSoat: this.formattedDateInv(
        this.addForm.get("expeditionDateSoat").value
      ),
      fuel: this.addForm.get("fuel").value,
      identificationOwner: this.data.id,
      isShielding: this.addForm.get("isShielding").value
        ? this.addForm.get("isShielding").value
        : false,
      levelShielding: this.addForm.get("levelShielding").value
        ? this.addForm.get("levelShielding").value
        : null,
      line: this.addForm.get("line").value,
      model: this.addForm.get("model").value,
      noChasis: this.addForm.get("noChasis").value,
      noMotor: this.addForm.get("noMotor").value,
      noSerie: this.addForm.get("noSerie").value,
      noVin: this.addForm.get("noVin").value,
      occupant: this.addForm.get("occupant").value,
      pbv: this.addForm.get("pbv").value,
      requireTechReview: this.addForm.get("requireTechReview").value,
      soatNumber: this.addForm.get("soatNumber").value,
      state: this.addForm.get("state").value,
      statusVehicle: this.addForm.get("statusVehicle").value,
      techReview: this.addForm.get("techReview").value,
      tonnage: this.addForm.get("tonnage").value,
      transitAgency: this.addForm.get("transitAgency").value,
      typeService: this.addForm.get("typeService").value,
      typeVehicle: this.addForm.get("typeVehicle").value,
    };

    this.carService.create(data).subscribe((res) => {
      if (res.code > 1000) {
        this.globalService.onSuccess(res.message);
        this.activeModal.close("success");
      } else {
        this.globalService.onFailure(res.error);
      }
    });
  }

  public searchPlate() {
    if (this.searchForm.invalid) {
      return;
    }
    this.blockUI.start();
    this.loading = true;

    this.carService
      .getVehicle("CC", this.data.id, this.searchForm.get("plateSearch").value)
      .subscribe((res: any) => {
        this.blockUI.stop();

        if (res.data?.mensaje !== undefined && res.data?.mensaje !== "") {
          this.globalService.onFailure(res.data.mensaje);
          this.loading = false;
        } else {
          this.blockUI.start();

          this.carService
            .getVehicleComplete(this.searchForm.get("plateSearch").value)
            .subscribe((resComplete: any) => {
              this.blockUI.stop();
              this.loading = false;
              this.result = {
                plate: resComplete.data.vehicle?.noPlaca,
                bodywork: resComplete.data.vehicle?.tipoCarroceria,
                brand: resComplete.data.vehicle?.marca,
                color: res.data.vehicleInformation?.color,
                countryOrigin: resComplete.data.vehicle?.ciudad,
                cylinder: resComplete.data.vehicle?.cilindraje,
                divipola: resComplete.data.vehicle?.divipola,
                dueDateSoat: res.data.soat?.dueDate,
                enrollmentDate: res.data.vehicleInformation?.enrollmentDate,
                expeditionDateSoat: res.data.soat?.expeditionDate,
                fuel: resComplete.data.vehicle?.tipoCombustible,
                line: resComplete.data.vehicle?.linea,
                model: resComplete.data.vehicle?.modelo,
                noChasis: resComplete.data.vehicle?.noChasis,
                noMotor: resComplete.data.vehicle?.noMotor,
                noVin: resComplete.data.vehicle?.noVin,
                occupant: resComplete.data.vehicle?.ocupantes,
                requireTechReview: res.data.techReview?.requireTechReview,
                soatNumber: res.data.soat?.soatNumber,
                statusVehicle: resComplete.data.vehicle?.estadoDelVehiculo,
                techReview: res.data.techReview?.valid,
                tonnage: resComplete.data.vehicle?.toneladas,
                typeService: resComplete.data.vehicle?.tipoServicio,
                typeVehicle: resComplete.data.vehicle?.claseVehiculo,
              };

              this.patchValue(this.result);
            });
        }
      });
  }

  private createForm() {
    this.addForm = this.formBuilder.group({
      plate: [
        "",
        [
          Validators.pattern(
            /[a-zA-Z]{3}[0-9]{3}|[a-zA-Z]{3}[0-9]{2}[a-zA-Z]/g
          ),
          Validators.required,
        ],
      ],
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
      state: [false],
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
    let dateFormatted;

    if (date.includes("/")) {
      dateFormatted = date?.split("/");
      dateFinal = {
        year: parseInt(dateFormatted[2]),
        month: parseInt(dateFormatted[1]),
        day: parseInt(dateFormatted[0]),
      };
    } else {
      dateFormatted = date?.split("-");
      dateFinal = {
        year: parseInt(dateFormatted[0]),
        month: parseInt(dateFormatted[1]),
        day: parseInt(dateFormatted[2]),
      };
    }

    return dateFinal;
  }

  private formattedDateInv(date: any) {
    let dateFinal;
    if (date !== undefined) {
      dateFinal = `${date.year}-${date.month}-${date.day}`;
    } else {
      dateFinal = null;
    }

    return dateFinal;
  }

  private patchValue(data) {
    this.addForm.patchValue({
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
      state: data?.state,
      statusVehicle: data?.statusVehicle,
      techReview: data?.techReview,
      tonnage: data?.tonnage,
      transitAgency: data?.transitAgency,
      typeService: data?.typeService,
      typeVehicle: data?.typeVehicle,
    });
  }
}
