import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Api } from "../shared/api";
import { GlobalService } from "./global.service";

@Injectable({
  providedIn: "root",
})
export class ServicesService {
  constructor(private readonly globalService: GlobalService) {}

  public getAll(id: number): Observable<any> {
    return this.globalService.get(Api.Endpoints.SERVICE.BASE + `/${id}`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public getById(hash: string) {
    return this.globalService.get(Api.Endpoints.SERVICE.BASE + "/" + hash).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public create(service: any, id: number) {
    return this.globalService
      .post(Api.Endpoints.SERVICE.BASE + `/${id}`, service)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public createEvent(evento: any, id: number) {
    return this.globalService
      .post(Api.Endpoints.NEWS.BASE + `/${id}`, evento)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public update(id: number, service: any) {
    return this.globalService
      .put(Api.Endpoints.SERVICE.BASE + `/${id}`, service)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public completed(id: number) {
    return this.globalService
      .put(Api.Endpoints.SERVICE.BASE + `/${id}/completed`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public delete(id: number) {
    return this.globalService
      .delete(Api.Endpoints.SERVICE.BASE + "/" + id)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
