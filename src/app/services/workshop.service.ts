import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Workshop } from "../entities/workshop.entity";

import { Api } from "../shared/api";
import { GlobalService } from "./global.service";

@Injectable({
  providedIn: "root",
})
export class WorkshopService {
  constructor(private readonly globalService: GlobalService) {}

  public getAll(
    pageNumber: number,
    pageElements: number,
    start: string,
    end: string
  ): Observable<any> {
    return this.globalService
      .get(Api.Endpoints.WORKSHOP.ALL(pageNumber, pageElements, start, end))
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public getByNit(nit: string) {
    return this.globalService
      .post(Api.Endpoints.WORKSHOP.BASE + "/nit", { nit: nit })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public create(workshop: Workshop) {
    return this.globalService.post(Api.Endpoints.WORKSHOP.BASE, workshop).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public update(id: string, workshop: Workshop) {
    return this.globalService
      .put(Api.Endpoints.WORKSHOP.BASE + `/${id}`, workshop)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public delete(workshop: number) {
    return this.globalService
      .delete(Api.Endpoints.WORKSHOP.BASE + "/" + workshop)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
