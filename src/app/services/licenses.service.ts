import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Car } from "../entities/car.entity";

import { Api } from "../shared/api";
import { GlobalService } from "./global.service";

@Injectable({
  providedIn: "root",
})
export class LicensesService {
  constructor(private readonly globalService: GlobalService) {}

  public getAll(id: number): Observable<any> {
    return this.globalService.get(Api.Endpoints.LICENSE.BASE + `/${id}`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public create(license: any, id: number) {
    return this.globalService
      .post(Api.Endpoints.LICENSE.BASE + `/${id}`, license)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public update(id: number, license: any) {
    return this.globalService
      .put(Api.Endpoints.LICENSE.BASE + `/${id}`, license)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public delete(id: number) {
    return this.globalService
      .delete(Api.Endpoints.LICENSE.BASE + "/" + id)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
