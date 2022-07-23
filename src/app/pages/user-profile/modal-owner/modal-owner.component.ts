import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-modal-owner",
  templateUrl: "./modal-owner.component.html",
  styleUrls: ["./modal-owner.component.scss"],
})
export class ModalOwnerComponent implements OnInit {
  @Input() title;
  @Input() data;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
