import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { SituationSocial } from "src/app/domain/situationSocial";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";

@Component({
  selector: "app-situation-social",
  templateUrl: "./situation-social.component.html",
  styleUrls: ["./situation-social.component.css"],
  providers: [MessageService],
})
export class SituationSocialComponent implements OnInit {
  id;
  nom;

  situationSocial: SituationSocial;
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
      { label: " الحالة  الإجتماعية" },
    ]);
  }
  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
    this.showAllSituationSocial();
  }

  situationSocials: SituationSocial[] = [];

  showAllSituationSocial() {
    this.crudservice.getlistEntity("situationSocial").subscribe((data) => {
      if (data.result) {
        this.situationSocials = data.result;
      } else {
        this.situationSocials = [];
      }
    });
  }

  addSiSo() {
    this.situationSocial = new SituationSocial();
    this.situationSocial.id = this.id;
    this.situationSocial.libelle_situation_social = this.nom;

    this.crudservice
      .createLigne("situationSocial", this.situationSocial)
      .subscribe((data) => {
        if (data.result) {
          console.log(data.result);
          this.showAllSituationSocial();
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
  delete(situationSocial: SituationSocial) {
    this.crudservice
      .deleteLigne("situationSocial", situationSocial.id)
      .subscribe((data) => {
        if (data.status == 417) {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: " عليك تثبت     ",
          });
        } else {
          this.showAllSituationSocial();
        }
      });
  }
}
