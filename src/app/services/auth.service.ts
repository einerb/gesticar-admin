import jwt_decode from "jwt-decode";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import Swal from "sweetalert2";

import { Api } from "../shared/api";
import { GlobalService } from "./global.service";
import { Login } from "../entities/login.entity";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public redirectUrl: string = "";
  private userInfo: any;

  constructor(
    private readonly globalService: GlobalService,
    private router: Router
  ) {}

  /**
   * @description realizar login
   * @returns Observable <any>
   */
  public login(data: Login): Observable<any> {
    return this.globalService
      .post(Api.Endpoints.AUTH.LOGIN, {
        email: data.email,
        password: data.password,
      })
      .pipe(
        map((res) => {
          this.userInfo = this.getDecodedAccessToken(res.data.accessToken);
          if (
            this.userInfo.role.role === "USER" ||
            this.userInfo.state === false
          ) {
            Swal.fire({
              title: `Fallo de operación`,
              text: "Usuario permitido solo para aplicación móvil",
              icon: "error",
              confirmButtonText: "Ok",
              allowOutsideClick: false,
            });
          } else {
            localStorage.setItem("accessToken", res.data["accessToken"]);

            return res.data;
          }
        })
      );
  }

  public isLoggedIn() {
    const token = localStorage.getItem("accessToken");
    if (token && token !== undefined) {
      return true;
    }
    return false;
  }

  public saveToken(token: any): any {
    localStorage.setItem("accessToken", token);
  }

  public getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  public logout() {
    localStorage.clear();

    this.router.navigate(["/"]);
  }
}
