import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { GlobalService, UserService } from "src/app/services";

@Component({
  selector: "app-modal-assign-admin",
  templateUrl: "./modal-assign-admin.component.html",
  styleUrls: ["./modal-assign-admin.component.scss"],
})
export class ModalAssignAdminComponent implements OnInit {
  @Input() title;
  @Input() data;
  @Input() admin;
  public addForm: FormGroup;
  public model: NgbDateStruct;
  public maxDate = {
    year: parseInt(moment(new Date()).add(-18, "years").format("YYYY")),
    month: parseInt(moment(new Date().getMonth()).format("MM")),
    day: parseInt(moment(new Date().getDay()).format("DD")),
  };

  constructor(
    private readonly userService: UserService,
    public readonly globalService: GlobalService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    public resultOp: NgbActiveModal
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

    let birthdateFormatted =
      this.addForm.get("birthdate").value?.year +
      "-" +
      this.addForm.get("birthdate").value?.month +
      "-" +
      this.addForm.get("birthdate").value?.day;

    const data: any = {
      identification: this.addForm.get("identification").value,
      name: this.addForm.get("name").value,
      lastname: this.addForm.get("lastname").value,
      role_id: this.admin.role.role === "ADMIN" ? 3 : 2,
      occupation: this.addForm.get("occupation").value,
      city: this.addForm.get("city").value,
      address: this.addForm.get("address").value,
      birthdate: birthdateFormatted,
      phone: this.addForm.get("phone").value,
      email: this.addForm.get("email").value,
      password: this.addForm.get("password").value,
      state: true,
      gender: this.addForm.get("gender").value === "true" ? true : false,
      workshopId: this.data,
    };

    this.userService.create(data).subscribe((res) => {
      if (res.code > 1000) {
        this.globalService.onSuccess(res.message);
        this.resultOp.close({ state: "success", data: res.data });
      } else {
        this.globalService.onFailure(res.error);
      }
    });
  }

  private createForm() {
    this.addForm = this.formBuilder.group({
      identification: [
        "",
        [
          Validators.required,
          Validators.compose([
            Validators.required,
            Validators.minLength(7),
            Validators.maxLength(10),
          ]),
        ],
      ],
      name: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      occupation: [""],
      city: ["Barranquilla"],
      address: [""],
      birthdate: [""],
      phone: [""],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      gender: ["", [Validators.required]],
    });
  }
}
