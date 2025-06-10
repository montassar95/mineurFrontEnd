import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { SituationFamiliale } from "src/app/domain/situationFamiliale";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";

@Component({
  selector: "app-situation-familiale",
  templateUrl: "./situation-familiale.component.html",
  styleUrls: ["./situation-familiale.component.css"],
  providers: [MessageService],
})
export class SituationFamilialeComponent implements OnInit {
  id;
  nom;

  situationFamiliale: SituationFamiliale;
  display = false;
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

      { label: "رموز الهوية" },
      { label: " الحالة العائلية" },
    ]);
  }
  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
    this.showAllSituationFamiliale();
  }

  situationFamiliales: SituationFamiliale[] = [];

  showAllSituationFamiliale() {
    this.crudservice.getlistEntity("situationFamiliale").subscribe((data) => {
      if (data.result) {
        this.situationFamiliales = data.result;
      } else {
        this.situationFamiliales = [];
      }
    });
  }

  addSiFa() {
    this.situationFamiliale = new SituationFamiliale();
    this.situationFamiliale.id = this.id;
    this.situationFamiliale.libelle_situation_familiale = this.nom;

    this.crudservice
      .createLigne("situationFamiliale", this.situationFamiliale)
      .subscribe((data) => {
        if (data.result) {
          console.log(data.result);
          this.showAllSituationFamiliale();
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
  delete(situationFamiliale: SituationFamiliale) {
    this.crudservice
      .deleteLigne("situationFamiliale", situationFamiliale.id)
      .subscribe((data) => {
        if (data.status == 417) {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: " عليك تثبت     ",
          });
        } else {
          this.showAllSituationFamiliale();
        }
      });
  }
}
