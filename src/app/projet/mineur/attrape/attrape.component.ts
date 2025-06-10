import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";

@Component({
  selector: "app-attrape",
  templateUrl: "./attrape.component.html",
  styleUrls: ["./attrape.component.css"],
})
export class AttrapeComponent implements OnInit {
  currentUser: any;
  constructor(
    private breadcrumbService: BreadcrumbService,
    private routerSec: Router,
    private token: TokenStorageService
  ) {
    this.breadcrumbService.setItems([
      { label: "الإستقبال", routerLink: ["/"] },

      { label: "ملف الطفل" },
      { label: "  إجراءات إلقاء القبض علي طفل فار" },
    ]);
  }
  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.routerSec.navigate(["/logoutpage"]);
    }
  }
}
