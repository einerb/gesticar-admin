import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { delay, first } from "rxjs/operators";

import { AuthService, GlobalService } from "src/app/services";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loading = false;
  public loginForm!: FormGroup;
  public userInfo: any;

  constructor(
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly globalService: GlobalService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.logout();
  }

  get f() {
    return this.loginForm.controls;
  }

  public onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .login(this.loginForm.value)
      .pipe(first())
      .pipe(delay(1500))
      .subscribe(
        () => {
          this.loading = false;
          this.router.navigateByUrl("/dashboard");
        },
        (err: any) => {
          this.globalService.onFailure(err.error.error);
          this.loading = false;
        }
      );
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  private logout() {
    this.authService.logout();
  }

  ngOnDestroy() {}
}
