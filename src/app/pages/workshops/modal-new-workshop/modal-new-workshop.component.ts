import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { GlobalService, HelpService } from "src/app/services";
import { WorkshopService } from "src/app/services/workshop.service";

@Component({
  selector: "app-modal-new-workshop",
  templateUrl: "./modal-new-workshop.component.html",
  styleUrls: ["./modal-new-workshop.component.scss"],
})
export class ModalNewWorkshopComponent implements OnInit {
  @Input() title;
  public addForm: FormGroup;

  constructor(
    private readonly workshopService: WorkshopService,
    public readonly globalService: GlobalService,
    private readonly helpService: HelpService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  get f() {
    return this.addForm.controls;
  }

  public create() {
    if (this.addForm.invalid) {
      return;
    }

    this.workshopService.create(this.addForm.value).subscribe(
      (res) => {
        if (res.code > 1000) {
          this.activeModal.close();
          Swal.fire({
            title: `Operación exitosa`,
            text: res.message,
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate([
                "/workshop-profile",
                res.data.workshop.nit,
              ]);

              Swal.fire({
                title: "Pasos iniciales",
                text: "Asigne administradores al nuevo taller. Desea realizar esta operación?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Si!",
                cancelButtonText: "No, después!",
              }).then((resultIn) => {
                if (resultIn.isConfirmed) {
                  this.helpService.modal$.emit(true);
                } else {
                  this.helpService.modal$.emit(false);
                }
              });
            }
          });
        } else {
          this.globalService.onFailure(res.error);
        }
      },
      (resError) => this.globalService.onFailure(resError.error)
    );
  }

  private createForm() {
    this.addForm = this.formBuilder.group({
      address: ["", [Validators.required]],
      limit_users: [0, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      name: ["", [Validators.required]],
      nit: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      state: [true, [Validators.required]],
    });
  }
}
