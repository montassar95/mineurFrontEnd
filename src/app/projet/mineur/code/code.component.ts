import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";

@Component({
  selector: "app-code",
  templateUrl: "./code.component.html",
  styleUrls: ["./code.component.css"],
})
export class CodeComponent implements OnInit {
  codes: { nom: string }[];
  currentUser: any;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private token: TokenStorageService
  ) {
    this.breadcrumbService.setItems([
      { label: "الإستقبال", routerLink: ["/"] },

      { label: "الرموز" },
    ]);
  }
  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
    this.codes = [
      { nom: "رموز القضايا" },
      { nom: "رموز القضايا" },
      { nom: "رموز القضايا" },
      { nom: "رموز القضايا" },
      { nom: "رموز القضايا" },
      { nom: "رموز القضايا" },
    ];
  }
}
