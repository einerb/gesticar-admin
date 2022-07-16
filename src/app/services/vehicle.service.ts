import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

import { Api } from "../shared/api";

@Injectable({
  providedIn: "root",
})
export class VehicleService {
  private httpOptions;

  constructor(private http: HttpClient) {
    this.httpOptions = new HttpHeaders().set("Authorization", Api.tokenVerifk);
  }

  public getVehicle(
    documentType: string,
    documentNumber: string,
    plate: string
  ) {
    return this.http
      .get(Api.Endpoints.CAR.BASE(documentType, documentNumber, plate), {
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
}
