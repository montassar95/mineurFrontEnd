import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { Nationalite } from "src/app/domain/nationalite";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";

@Component({
  selector: "app-nationalite",
  templateUrl: "./nationalite.component.html",
  styleUrls: ["./nationalite.component.css"],
  providers: [MessageService],
})
export class NationaliteComponent implements OnInit {
  display = false;
  id;
  nom;
  nationalite: Nationalite;
  currentUser: any;
  constructor(
    private crudservice: CrudEnfantService,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private service: MessageService,
    private token: TokenStorageService
  ) {
    this.breadcrumbService.setItems([
      { label: "الإستقبال", routerLink: ["/"] },

      { label: "رموز الهوية" },
      { label: "الجنسيات" },
    ]);
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
    this.showAllNationalite();
  }
  nationalites: Nationalite[] = [];

  showAllNationalite() {
    this.crudservice.getlistEntity("nationalite").subscribe((data) => {
      if (data.result) {
        this.nationalites = data.result;
      } else {
        this.nationalites = [];
      }
    });
  }

  addNat() {
    this.nationalite = new Nationalite();
    this.nationalite.id = this.id;
    this.nationalite.libelle_nationalite = this.nom;

    this.crudservice
      .createLigne("nationalite", this.nationalite)
      .subscribe((data) => {
        if (data.result) {
          console.log(data.result);
          this.showAllNationalite();
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
  delete(nationalite: Nationalite) {
    this.crudservice
      .deleteLigne("nationalite", nationalite.id)
      .subscribe((data) => {
        console.log(data.status);
        if (data.status == 417) {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: " عليك تثبت     ",
          });
        } else {
          this.showAllNationalite();
        }
      });
  }
}
