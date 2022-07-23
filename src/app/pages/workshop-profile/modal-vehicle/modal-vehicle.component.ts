import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-modal-vehicle",
  templateUrl: "./modal-vehicle.component.html",
  styleUrls: ["./modal-vehicle.component.scss"],
})
export class ModalVehicleComponent implements OnInit {
  @Input() title;
  @Input() data;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    console.log(this.data);
  }
}
