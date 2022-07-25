import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-modal-vehicle",
  templateUrl: "./modal-vehicle.component.html",
  styleUrls: ["./modal-vehicle.component.scss"],
})
export class ModalVehicleComponent implements OnInit {
  @Input() data;
  public searchForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      plate: [
        "",
        [
          Validators.pattern(
            /[a-zA-Z]{3}[0-9]{3}|[a-zA-Z]{3}[0-9]{2}[a-zA-Z]/g
          ),
          Validators.required,
        ],
      ],
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.searchForm.controls;
  }

  public create() {
    this.activeModal.close("success");
  }

  public searchPlate() {}
}
