import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { GlobalService, ServicesService } from "src/app/services";

@Component({
  selector: "app-modal-new-event",
  templateUrl: "./modal-new-event.component.html",
  styleUrls: ["./modal-new-event.component.scss"],
})
export class ModalNewEventComponent implements OnInit {
  @Input() data;
  public addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private readonly serviceService: ServicesService,
    public readonly globalService: GlobalService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  get g() {
    return this.addForm.controls;
  }

  public create() {
    if (this.addForm.invalid) {
      return;
    }

    const data = {
      name: this.addForm.get("name").value,
      description: this.addForm.get("description").value,
      price: this.addForm.get("price").value,
    };

    this.serviceService.createEvent(data, this.data.id).subscribe((res) => {
      if (res.code > 1000) {
        this.globalService.onSuccess(res.message);
        this.activeModal.close("success");
      } else {
        this.globalService.onFailure(res.error);
      }
    });
  }

  private createForm() {
    this.addForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      price: [0, [Validators.required]],
    });
  }
}
