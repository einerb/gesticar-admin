import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GlobalService, ServicesService, UserService } from "src/app/services";

@Component({
  selector: "app-service-profile",
  templateUrl: "./service-profile.component.html",
  styleUrls: ["./service-profile.component.scss"],
})
export class ServiceProfileComponent implements OnInit {
  public services: string[] = [];
  public identification: number;

  constructor(
    public readonly userService: UserService,
    public readonly serviceService: ServicesService,
    public readonly globalService: GlobalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.identification = params["id"];
    });

    this.getServices(this.identification);
  }

  public completed(id: number) {
    this.serviceService.completed(id).subscribe((res) => {
      if (res.code > 1000) {
        this.globalService.onSuccess(res.message);
        this.getServices(this.identification);
      } else {
        this.globalService.onFailure(res.error);
      }
    });
  }

  private getServices(identification: number) {
    this.userService.getById(identification).subscribe((res) => {
      if (res.data.services.length > 0) {
        this.services = res.data.services;
      }
    });
  }
}
