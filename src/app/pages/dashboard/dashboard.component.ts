import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public vehicleLength: number = 4;
  public serviceLength: number = 3;
  public userLength: number = 2;
  public workshopLength: number = 1;

  constructor() {}

  ngOnInit() {}
}
