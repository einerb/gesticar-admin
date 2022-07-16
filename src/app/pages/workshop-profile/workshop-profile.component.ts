import { ActivatedRoute } from "@angular/router";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { Component, OnInit } from "@angular/core";

import { WorkshopService } from "src/app/services/workshop.service";
import { Workshop } from "src/app/entities/workshop.entity";

@Component({
  selector: "app-workshop-profile",
  templateUrl: "./workshop-profile.component.html",
  styleUrls: ["./workshop-profile.component.scss"],
})
export class WorkshopProfileComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  public infoFullWorkshop: Workshop;

  constructor(
    private readonly workshopService: WorkshopService,
    private route: ActivatedRoute
  ) {
    this.blockUI.start();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      let nit = params["id"];
      this.getWokshopInfo(nit);
    });
  }

  private getWokshopInfo(nit: any) {
    this.workshopService.getByNit(nit).subscribe((res) => {
      this.blockUI.stop();
      this.infoFullWorkshop = res.data;
    });
  }
}
