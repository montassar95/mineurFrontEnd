import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";

@Component({
  selector: "app-modifier-mutaion",
  templateUrl: "./modifier-mutaion.component.html",
  styleUrls: ["./modifier-mutaion.component.css"],
})
export class ModifierMutaionComponent implements OnInit {
  currentUser: any;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private token: TokenStorageService
  ) {
    this.breadcrumbService.setItems([
      { label: "الإستقبال", routerLink: ["/"] },

      { label: "ملف الطفل" },
      { label: " تحيين معطيات نقلة طفل" },
    ]);
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
  }
}
