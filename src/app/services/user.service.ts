import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../entities/user.entity";

import { Api } from "../shared/api";
import { GlobalService } from "./global.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private readonly globalService: GlobalService) {}

  public getAll(
    pageNumber: number,
    pageElements: number,
    start: string,
    end: string
  ): Observable<any> {
    return this.globalService
      .get(Api.Endpoints.USER.ALL(pageNumber, pageElements, start, end))
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public getById(id: number) {
    return this.globalService.get(Api.Endpoints.USER.BASE + "/" + id).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public create(user: User) {
    return this.globalService.post(Api.Endpoints.USER.BASE, user).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public update(id: number, user: User) {
    return this.globalService
      .put(Api.Endpoints.USER.BASE + `/${id}`, user)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public delete(user: number) {
    return this.globalService.delete(Api.Endpoints.USER.BASE + "/" + user).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
