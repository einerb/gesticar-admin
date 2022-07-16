import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { BlockUI, NgBlockUI } from "ng-block-ui";

import { UserService } from "src/app/services/";
import { User } from "src/app/entities/user.entity";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  public users: User[] = [];
  public totalPages: number;
  public page: number = 1;
  public elementsPerPage: number;
  public currentElements: number = 3;
  public disabledPrevious: boolean = true;
  public disabledNext: boolean = false;

  constructor(private readonly userService: UserService) {
    this.blockUI.start();
  }

  ngOnInit(): void {
    this.getAllUser(this.page);
  }

  private getAllUser(page: number) {
    this.users = [];

    let start = moment().add(-1, "years").format("YYYY-MM-DD");
    let end = moment().add(1, "month").format("YYYY-MM-DD");

    this.userService
      .getAll(page, this.currentElements, start, end)
      .subscribe((res) => {
        this.blockUI.stop();
        res.data.records.forEach((element) => {
          this.users.push({
            identification: element.identification,
            name: element.name,
            lastname: element.lastname,
            gender: element.gender,
            avatar: element.avatar,
            role: element.role.role,
            occupation: element.occupation,
            city: element.city,
            address: element.address,
            birthdate: element.birthdate,
            phone: element.phone,
            email: element.email,
            state: element.state,
            createdAt: moment(element.createdAt).format("LLL"),
          });
        });

        this.totalPages = res.data.totalPages;
        this.elementsPerPage = res.data.elementsPerPage;
      });
  }

  public next() {
    this.disabledPrevious = false;

    if (this.page < this.totalPages) {
      this.page++;
      this.getAllUser(this.page);
    }

    if (this.page === this.totalPages) {
      this.disabledNext = true;
    } else {
      this.disabledNext = false;
    }
  }

  public previous() {
    this.disabledNext = false;

    if (this.page > 1) {
      this.page--;
      this.getAllUser(this.page);
    }

    if (this.page === 1) {
      this.disabledPrevious = true;
    } else {
      this.disabledPrevious = false;
    }
  }
}
