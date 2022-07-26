import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { LicensesService, GlobalService } from "src/app/services";

@Component({
  selector: "app-modal-license",
  templateUrl: "./modal-license.component.html",
  styleUrls: ["./modal-license.component.scss"],
})
export class ModalLicenseComponent implements OnInit {
  @Input() data;
  public addForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private readonly licenseService: LicensesService,
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
      category: this.addForm.get("category").value,
      expeditionDate: this.formattedDateInv(
        this.addForm.get("expeditionDate").value
      ),
      dueDate: this.formattedDateInv(this.addForm.get("dueDate").value),
      statusLicense: "ACTIVO",
      state: true,
    };

    this.licenseService.create(data, this.data.id.id).subscribe((res) => {
      if (res.code > 1000) {
        this.globalService.onSuccess(res.message);
        this.activeModal.close("success");
      } else {
        this.globalService.onFailure(res.error);
      }
    });
  }

  public delete(license: number) {
    this.licenseService.delete(license).subscribe((res) => {
      if (res.code > 1000) {
        this.globalService.onSuccess(res.message);
        this.getAll(this.data.id.identification);
      } else {
        this.globalService.onFailure(res.error);
      }
    });
  }

  private createForm() {
    this.addForm = this.formBuilder.group({
      category: ["", [Validators.required]],
      expeditionDate: ["", [Validators.required]],
      dueDate: ["", [Validators.required]],
    });
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

  private getAll(id: number) {
    this.licenseService.getAll(id).subscribe((res) => {
      this.data.license = res.data;
    });
  }
}
