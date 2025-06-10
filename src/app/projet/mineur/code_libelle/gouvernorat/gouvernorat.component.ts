import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { Delegation } from "src/app/domain/delegation";
import { Gouvernorat } from "src/app/domain/gouvernorat";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";

@Component({
  selector: "app-gouvernorat",
  templateUrl: "./gouvernorat.component.html",
  styleUrls: ["./gouvernorat.component.css"],
  providers: [MessageService],
})
export class GouvernoratComponent implements OnInit {
  display = false;

  id;
  nom;
  gouvernorat: Gouvernorat;
  currentUser: any;
  constructor(
    private crudservice: CrudEnfantService,
    private service: MessageService,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private token: TokenStorageService
  ) {
    this.breadcrumbService.setItems([
      { label: "الإستقبال", routerLink: ["/"] },

      { label: "رموز الهوية " },
      { label: " الولايات   " },
    ]);
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
    this.showAllGouvernorat();
  }

  gouvernorats: Gouvernorat[] = [];

  showAllGouvernorat() {
    this.crudservice.getlistEntity("gouvernorat").subscribe((data) => {
      if (data.result) {
        this.gouvernorats = data.result;
      } else {
        this.gouvernorats = [];
      }
    });
  }

  addGouv() {
    this.gouvernorat = new Gouvernorat();
    this.gouvernorat.id = this.id;
    this.gouvernorat.libelle_gouvernorat = this.nom;

    this.crudservice
      .createLigne("gouvernorat", this.gouvernorat)
      .subscribe((data) => {
        if (data.result) {
          console.log(data.result);
          this.showAllGouvernorat();
        }
      });
    this.display = false;
  }

  add() {
    this.id = "";
    this.nom = "";
    this.display = true;
  }

  update() {
    this.display = true;
  }

  delete(gouvernorat: Gouvernorat) {
    this.crudservice
      .deleteLigne("gouvernorat", gouvernorat.id)
      .subscribe((data) => {
        if (data.status == 417) {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: " عليك تثبت     ",
          });
        } else {
          this.showAllGouvernorat();
        }
      });
  }
}
