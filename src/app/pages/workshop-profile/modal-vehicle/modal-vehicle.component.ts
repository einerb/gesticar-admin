import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
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
  public result: Car;
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

  ngOnInit(): void {}

  get f() {
    return this.searchForm.controls;
  }

  get g() {
    return this.addForm.controls;
  }

  public create() {
    if (this.searchForm.invalid) {
      return;
    }

    const data: Car = {
      plate: this.addForm.get("plate").value,
      bodywork: this.addForm.get("bodywork").value,
      brand: this.addForm.get("brand").value,
      color: this.addForm.get("color").value,
      countryOrigin: this.addForm.get("countryOrigin").value,
      cylinder: this.addForm.get("cylinder").value,
      dateShielding: this.addForm.get("dateShielding").value,
      divipola: this.addForm.get("divipola").value,
      dueDateSoat: this.addForm.get("dueDateSoat").value,
      enrollmentDate: this.addForm.get("enrollmentDate").value,
      expeditionDateSoat: this.addForm.get("expeditionDateSoat").value,
      fuel: this.addForm.get("fuel").value,
      identificationOwner: this.data.id,
      isShielding: this.addForm.get("isShielding").value,
      levelShielding: this.addForm.get("levelShielding").value,
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
        this.loading = false;
        if (res.data?.mensaje !== undefined && res.data?.mensaje !== "") {
          this.globalService.onFailure(res.data.mensaje);
        } else {
          this.result = res.data;
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
      dateShielding: ["", [Validators.required]],
      divipola: ["", [Validators.required]],
      dueDateSoat: ["", [Validators.required]],
      enrollmentDate: ["", [Validators.required]],
      expeditionDateSoat: ["", [Validators.required]],
      fuel: ["", [Validators.required]],
      identificationOwner: ["", [Validators.required]],
      isShielding: ["", [Validators.required]],
      levelShielding: ["", [Validators.required]],
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
      state: ["", [Validators.required]],
      statusVehicle: ["", [Validators.required]],
      techReview: ["", [Validators.required]],
      tonnage: ["", [Validators.required]],
      transitAgency: ["", [Validators.required]],
      typeService: ["", [Validators.required]],
      typeVehicle: ["", [Validators.required]],
    });
  }
}
