import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import * as moment from "moment";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import Swal from "sweetalert2";

import { Workshop } from "src/app/entities/workshop.entity";
import { WorkshopService } from "src/app/services/workshop.service";
import { GlobalService, HelpService } from "src/app/services";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { ModalNewWorkshopComponent } from "./modal-new-workshop/modal-new-workshop.component";

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
  public currentElements: number = 12;
  public disabledPrevious: boolean = true;
  public disabledNext: boolean = false;

  @Output() openModal = new EventEmitter();
  public opModal: boolean;

  constructor(
    private readonly workshopService: WorkshopService,
    public readonly globalService: GlobalService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = "static";
    config.keyboard = false;

    this.blockUI.start();
  }

  ngOnInit(): void {
    this.getAllWorkshop(this.page);
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
        title: "¿Está usted seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar!",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.workshopService.delete(id).subscribe((res) => {
            if (res.code > 1000) {
              this.globalService.onSuccess(res.message);
              this.getAllWorkshop(1);
            } else {
              this.globalService.onFailure(res.error);
            }
          });
        }
      });
  }

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

  public openModalNew() {
    const modalRef = this.modalService.open(ModalNewWorkshopComponent, {
      size: "lg",
    });
    modalRef.componentInstance.title = "Nuevo taller";
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

  private getAllWorkshop(page: number) {
    this.workshops = [];

    let start = moment().add(-1, "years").format("YYYY-MM-DD");
    let end = moment().add(1, "month").format("YYYY-MM-DD");

    this.workshopService
      .getAll(page, this.currentElements, start, end)
      .subscribe((res) => {
        this.blockUI.stop();
        if (res.code > 1000) {
          res.data?.records.forEach((element) => {
            let capacity = this.getCapacity(
              element.users.length,
              element.limit_users
            );
            let nameWorkshop = this.getName(element.name);
            this.workshops.push({
              initials: nameWorkshop,
              address: element.address,
              id: element.id,
              capacity: Math.round(capacity),
              limit: element.users.length,
              name: element.name,
              users: element.users,
              nit: element.nit,
              phone: element.phone,
              state: element.state,
              createdAt: element.createdAt,
              updatedAt: element.updatedAt,
            });
          });

          this.totalPages = res.data.totalPages;
          this.elementsPerPage = res.data.elementsPerPage;
        } else {
          this.globalService.onFailure(res.error, res.code);
        }
      });
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

  private getName(name: string) {
    let splitFormatted = name.split(" ");
    let firstName = splitFormatted[0].charAt(0).toUpperCase();
    let lastName =
      splitFormatted.length > 1
        ? splitFormatted[1].charAt(0).toUpperCase()
        : "";

    return firstName + lastName;
  }
}
