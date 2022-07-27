import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";
import { TimelineItem } from "ngx-vertical-timeline";
import { ServicesService } from "src/app/services";

@Component({
  selector: "app-service-events",
  templateUrl: "./service-events.component.html",
  styleUrls: ["./service-events.component.scss"],
})
export class ServiceEventsComponent implements OnInit {
  public news: TimelineItem[] = [];
  public hash: string;
  public id: string;
  public state: string;

  constructor(
    public readonly serviceService: ServicesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.hash = params["hash"];
      this.id = params["id"];
    });

    this.getNews(this.hash);
  }

  private getNews(hash: string) {
    this.serviceService.getById(hash).subscribe((res) => {
      if (res.data?.news.length > 0) {
        this.state = res.data.state;
        res.data.news.forEach((element) => {
          this.news.push({
            icon: "fas fa-calendar-alt",
            styleClass: "",
            content: `Se realiza ${element.name}, descripción: ${
              element.description
            }, valor $ ${parseInt(element.price).toLocaleString("es-CO")}`,
            title: moment(element.createdAt).format("llll"),
          });
        });
      }
    });
  }
}
