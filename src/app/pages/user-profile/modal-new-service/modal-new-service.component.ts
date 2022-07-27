import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { GlobalService, ServicesService } from "src/app/services/index";

@Component({
  selector: "app-modal-new-service",
  templateUrl: "./modal-new-service.component.html",
  styleUrls: ["./modal-new-service.component.scss"],
})
export class ModalNewServiceComponent implements OnInit {
  @Input() data;
  public addForm: FormGroup;
  public contador = 120;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private readonly serviceService: ServicesService,
    public readonly globalService: GlobalService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  get g() {
    return this.addForm.controls;
  }

  public create() {
    if (this.addForm.invalid) {
      return;
    }

    const data = {
      title: this.addForm.get("title").value,
      description: this.addForm.get("description").value,
    };

    this.serviceService.create(data, this.data.user.id).subscribe((res) => {
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
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });
  }
}
