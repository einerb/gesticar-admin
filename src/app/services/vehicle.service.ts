import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Car } from "../entities/car.entity";

import { Api } from "../shared/api";
import { GlobalService } from "./global.service";

@Injectable({
  providedIn: "root",
})
export class VehicleService {
  private httpOptions;

  constructor(private http: HttpClient, private readonly globalService: GlobalService) {
    this.httpOptions = new HttpHeaders().set("Authorization", Api.tokenVerifk);
  }

  public getVehicle(
    documentType: string,
    documentNumber: string,
    plate: string
  ) {
    return this.http
      .get(Api.Endpoints.CAR.BASEAPI(documentType, documentNumber, plate), {
        headers: this.httpOptions,
      })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public getOwner(plate: string) {
    return this.http
      .get(Api.Endpoints.CAR.OWNER(plate), { headers: this.httpOptions })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public getPenalty(documentType: string, documentNumber: number) {
    return this.http
      .get(Api.Endpoints.CAR.PENALTY(documentType, documentNumber), {
        headers: this.httpOptions,
      })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public create(car: Car) {
    return this.globalService.post(Api.Endpoints.CAR.BASE, car).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public update(plate: string, car: Car) {
    return this.globalService
      .put(Api.Endpoints.CAR.BASE + `/${plate}`, car)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public delete(car: number) {
    return this.globalService.delete(Api.Endpoints.CAR.BASE + "/" + car).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
