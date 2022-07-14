import * as moment from "moment";
import { ActivatedRoute } from "@angular/router";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { Component, OnInit } from "@angular/core";

import { User } from "src/app/entities/user.entity";
import { AuthService, GlobalService, UserService } from "src/app/services";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  public role: string;
  public infoFullUser: User;
  public age: number;
  public createdAt: string;
  public allowEdit: boolean = false;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly globalService: GlobalService,
    private route: ActivatedRoute
  ) {
    this.blockUI.start();
  }

  ngOnInit() {
    const token: any = this.globalService.getToken();
    let userInfo = this.authService.getDecodedAccessToken(token);

    this.route.params.subscribe((params) => {
      let id = params["id"];
      this.getUserInfo(id);

      userInfo.identification.toString() === id
        ? (this.allowEdit = true)
        : (this.allowEdit = false);
    });
  }

private getCreatedAt(date: string){
this.createdAt = moment(date).format("ll");
}

  private getAge(birthdate: string) {
    this.age = moment(new Date()).diff(birthdate, "years");
  }

  private getRole(role: string) {
    switch (role) {
      case "ROOT":
        this.role = "Super Root";
        break;
      case "ADMIN":
        this.role = "Administrador";
        break;
      default:
        this.role = "Propietario";
    }
  }

  private getUserInfo(identification: number) {
    this.userService.getById(identification).subscribe((res) => {
      this.blockUI.stop();
      res.data.forEach((element) => {
        this.infoFullUser = element;
        this.getRole(element.role.role);
        this.getAge(element.birthdate);
        this.getCreatedAt(element.createdAt);
      });
    });
  }
}
