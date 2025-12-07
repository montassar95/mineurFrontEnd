import { Component, NgZone, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { TokenStorageService } from "../_services/token-storage.service";
import { Router } from "@angular/router";

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
  warningMessages: string[] = [];

  constructor(
    private zone: NgZone,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.tokenStorage.getToken();
    if (token) {
      this.isLoggedIn = true;
      // Récupère les rôles directement depuis le token décodé (méthode dans TokenStorageService)
      const user = this.tokenStorage.getUserFromToken();
      if (user && user.roles) {
        this.roles = user.roles;
      }
      this.redirectPage();
    }
  }
  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      (data) => {
        // Enregistre le token et l'utilisateur
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;

        const user = this.tokenStorage.getUserFromTokenFromToken();
        this.roles = user?.roles || [];

        // 👉 Affiche les warnings s'ils existent
        // if (data.warnings && data.warnings.length > 0) {
        //   this.warningMessages = data.warnings;
        // } else {
          this.redirectPage();
        // }
        
      },
      (err) => {
        this.errorMessage =
          "يرجــــى التحقــــق مــــن إســــم المستعمــــل و كلمــة الســــر أو الإتصــــــــال بمركــــــــز الإعلاميــــة ";
        this.isLoginFailed = true;
      }
    );
  }

  redirectPage(): void {
    this.router.navigate(["mineur"]);
  }
}
