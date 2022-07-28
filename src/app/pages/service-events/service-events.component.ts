import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { TimelineItem } from "ngx-vertical-timeline";
import { GlobalService, ServicesService } from "src/app/services";
import Swal from "sweetalert2";
import { ModalNewEventComponent } from "./modal-new-event/modal-new-event.component";

@Component({
  selector: "app-service-events",
  templateUrl: "./service-events.component.html",
  styleUrls: ["./service-events.component.scss"],
})
export class ServiceEventsComponent implements OnInit {
  public news: TimelineItem[] = [];
  public hash: string;
  public id: string;
  public idServicio: number;
  public state: string;
  public total: string;

  constructor(
    public readonly serviceService: ServicesService,
    public readonly globalService: GlobalService,
    private route: ActivatedRoute,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.hash = params["hash"];
      this.id = params["id"];
    });

    this.getNews(this.hash);
  }

  public completed(id: number) {
    Swal.fire({
      title: `Importante!`,
      text: "Al finalizar el servicio se generará el total de todos las novedades agregadas al servicio. Es un proceso que no tiene reversa. Desea completar/finalizar el servicio?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Finalizar servicio!",
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceService.completed(id).subscribe((res) => {
          if (res.code > 1000) {
            this.globalService.onSuccess(res.message);
            this.getNews(this.hash);
          } else {
            this.globalService.onFailure(res.error);
          }
        });
      }
    });
  }

  public openModalEvent(id?: any) {
    const modalRef = this.modalService.open(ModalNewEventComponent);
    const data = {
      title: `Crear Evento`,
      id: id,
    };
    modalRef.componentInstance.data = data;

    modalRef.result.then((result) => {
      if (result == "success") {
        this.getNews(this.hash);
      }
    });
  }

  private getNews(hash: string) {
    this.news = [];
    this.serviceService.getById(hash).subscribe((res) => {
      this.state = res.data.state;
      this.idServicio = res.data.id;
      let priceTotal = 0;
      if (res.data?.news.length > 0) {
        res.data.news.forEach((element) => {
          priceTotal += element.price;
          this.total = `$ ${priceTotal.toLocaleString("es-CO")}`;
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
