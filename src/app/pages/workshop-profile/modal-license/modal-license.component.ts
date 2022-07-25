import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-modal-license",
  templateUrl: "./modal-license.component.html",
  styleUrls: ["./modal-license.component.scss"],
})
export class ModalLicenseComponent implements OnInit {
  @Input() data;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
