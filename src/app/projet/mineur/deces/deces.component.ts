import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { Residence } from "src/app/domain/residence";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";

@Component({
  selector: "app-deces",
  templateUrl: "./deces.component.html",
  styleUrls: ["./deces.component.css"],
})
export class DecesComponent implements OnInit {
  idValide: number;

  residencs: Residence[] = [];
  documents: Document[] = [];
  currentUser: any;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private crudservice: CrudEnfantService,
    private router: Router,
    private token: TokenStorageService
  ) {
    this.breadcrumbService.setItems([
      { label: "الإستقبال", routerLink: ["/"] },
      { label: "التغيرات الطارئة  ", routerLink: ["/mineur/Changement"] },
      { label: "الوفاة" },
    ]);
  }

  ngOnDestroy() {
    window.localStorage.removeItem("idValide");
  }
  ngOnInit() {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
    let idValide = window.localStorage.getItem("idValide");
    console.log(idValide);
    if (idValide) {
      this.idValide = +idValide;
    }
  }
}
