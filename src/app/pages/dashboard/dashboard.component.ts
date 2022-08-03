import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";
import { User } from "src/app/entities/user.entity";
import { AuthService, GlobalService } from "src/app/services";
import { WorkshopService } from "src/app/services/workshop.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public userInfo: User;
  public vehicleLength: number;
  public serviceLength: number;
  public userLength: number;
  public workshopLength: number;

  constructor(
    private readonly workshopService: WorkshopService,
    private readonly globalService: GlobalService,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    const token: any = this.globalService.getToken();
    this.userInfo = this.authService.getDecodedAccessToken(token);

    if (this.userInfo.role.role === "ROOT") {
      this.getDataInfoRoot();
    } else {
      this.getDataInfoAdmin(this.userInfo.workshops[0]?.nit);
    }
  }

  private getDataInfoAdmin(nit: string) {
    this.workshopLength = 1;
    this.serviceLength = 0;
    this.vehicleLength = 0;
    let users: User[] = [];
    this.workshopService.getByNit(nit).subscribe((res) => {
      users = res.data?.users.filter((user) => user.role.role === "USER");

      this.userLength = users?.length;
      if (users?.length > 0) {
        users.forEach((element) => {
          element.services?.filter(() => (this.serviceLength += 1));

          if (element.car !== null) {
            this.vehicleLength += 1;
          }
        });
      }
    });
  }

  private getDataInfoRoot() {
    let start = moment().add(-1, "years").format("YYYY-MM-DD");
    let end = moment().add(1, "month").format("YYYY-MM-DD");

    this.serviceLength = 0;
    this.vehicleLength = 0;
    let users: User[] = [];
    this.workshopService.getAll(1, 100, start, end).subscribe((res) => {
      this.workshopLength = res.data.records?.length;
      res.data.records.forEach((resData) => {
        users = resData?.users.filter((user) => user.role.role === "USER");

        this.userLength = users?.length;
        if (users?.length > 0) {
          users.forEach((element) => {
            element.services?.filter(() => (this.serviceLength += 1));

            if (element.car !== null) {
              this.vehicleLength += 1;
            }
          });
        }
      });
    });
  }
}
