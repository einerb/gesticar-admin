import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import Swal from "sweetalert2";

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
  public totalPages: number;
  public page: number = 1;
  public elementsPerPage: number;
  public currentElements: number = 1;
  public disabledPrevious: boolean = true;
  public disabledNext: boolean = false;

  constructor(private readonly workshopService: WorkshopService) {
    this.blockUI.start();
  }

  ngOnInit(): void {
    this.getAllWorkshop(this.page);
  }

  private getAllWorkshop(page: number) {
    this.workshops = [];

    let start = moment().add(-1, "years").format("YYYY-MM-DD");
    let end = moment().add(1, "month").format("YYYY-MM-DD");

    this.workshopService
      .getAll(page, this.currentElements, start, end)
      .subscribe((res) => {
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

        this.totalPages = res.data.totalPages;
        this.elementsPerPage = res.data.elementsPerPage;
      });
  }

  public delete(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-default",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar!",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Eliminado!",
            "Your file has been deleted.",
            "success"
          );
        }
      });
  }

  public edit(nit: string) {}

  public next() {
    this.disabledPrevious = false;
    if (this.page < this.totalPages) {
      this.page++;
      this.getAllWorkshop(this.page);
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
      this.getAllWorkshop(this.page);
    }

    if (this.page === 1) {
      this.disabledPrevious = true;
    } else {
      this.disabledPrevious = false;
    }
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
