import { Component, NgZone, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { TokenStorageService } from "../_services/token-storage.service";
import { Router } from "@angular/router";

import { User } from "../domain/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;

  errorMessage = "";
  roles: string[] = [];
  currentUser: any;

  constructor(
    private zone: NgZone,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;

      this.redirectPage();
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.chekBlock(this.tokenStorage.getUser());
      },
      (err) => {
        this.errorMessage =
          "يرجــــى التحقــــق مــــن إســــم المستعمــــل و كلمــة الســــر أو الإتصــــــــال بمركــــــــز الإعلاميــــة ";
        this.isLoginFailed = true;
      }
    );
  }
  chekBlock(user: User) {
    if (user.block == 1) {
      this.router.navigate(["404"]);
      setTimeout(() => {
        this.router.navigate(["geo/logoutpage"]);
      }, 2000);
    } else {
      this.roles = this.tokenStorage.getUser().roles;

      this.redirectPage();
    }
  }
  redirectPage(): void {
    this.router.navigate(["mineur"]);
    //   if (this.roles.some((item) => item == ('ROLE_USER' || 'ROLE_MODERATOR'))) {
    //     this.router.navigate(['mineur']);
    // }
    //   else if (this.roles.some((item) => item == 'ROLE_MODERATOR')) {
    //     this.router.navigate(['geo/allreclamation']);
    // }
  }
  reloadPage(): void {
    window.location.reload();
  }
}
