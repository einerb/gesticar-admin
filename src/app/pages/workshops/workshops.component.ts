import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { Workshop } from "src/app/entities/workshop.entity";
import { WorkshopService } from "src/app/services/workshop.service";

@Component({
  selector: "app-workshops",
  templateUrl: "./workshops.component.html",
  styleUrls: ["./workshops.component.scss"],
})
export class WorkshopsComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  public workshops: Workshop[] = [];

  constructor(private readonly workshopService: WorkshopService) {
    this.blockUI.start();
  }

  ngOnInit(): void {
    this.getAllWorkshop();
  }

  private getAllWorkshop() {
    let start = moment().add(-1, "years").format("YYYY-MM-DD");
    let end = moment().add(1, "month").format("YYYY-MM-DD");

    this.workshopService.getAll(1, 25, start, end).subscribe((res) => {
      this.blockUI.stop();
      res.data.records.forEach((element) => {
        let capacity = this.getCapacity(
          element.users.length,
          element.limit_users
        );
        this.workshops.push({
          address: element.address,
          id: element.id,
          capacity: capacity,
          limit: element.users.length,
          name: element.name,
          users: element.users,
          nit: element.nit,
          phone: element.phone,
          state: element.state,
        });
      });
    });
  }

  public delete(id: number) {
    console.log("id", id);
  }

  public edit(nit: string) {
    console.log("id", nit);
  }

  private getCapacity(limit: number, capacity: number) {
    let valor;
    if (capacity > 0) {
      valor = (limit / capacity) * 100;
      return valor;
    } else {
      valor = 0;
      return valor;
    }
  }
}
