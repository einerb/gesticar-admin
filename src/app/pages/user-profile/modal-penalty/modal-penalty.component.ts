import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-modal-penalty",
  templateUrl: "./modal-penalty.component.html",
  styleUrls: ["./modal-penalty.component.scss"],
})
export class ModalPenaltyComponent implements OnInit {
  @Input() title;
  @Input() data;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
  }
}
