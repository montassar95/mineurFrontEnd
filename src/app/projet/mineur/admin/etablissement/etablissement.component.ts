import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService, SelectItem } from "primeng/api";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { Etablissement } from "src/app/domain/etablissement";
import { Gouvernorat } from "src/app/domain/gouvernorat";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";

@Component({
  selector: "app-etablissement",
  templateUrl: "./etablissement.component.html",
  styleUrls: ["./etablissement.component.css"],
  providers: [MessageService],
})
export class EtablissementComponent implements OnInit {
  display = false;
  etablissements: Etablissement[] = [];
  gouvernorats: SelectItem[];
  gouvernoratSwich: SelectItem[];
  gouvernoratLocal: Gouvernorat;
  etablissement: Etablissement;
  id;
  nom;
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

      { label: "رموز التغيرات" },
      { label: "قائمة  المؤسسات" },
    ]);
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
    this.showAllEtablissement();
    this.showAllGouvernorat();
  }

  showAllEtablissement() {
    this.crudservice.getlistEntity("etablissement").subscribe((data) => {
      if (data.result) {
        this.etablissements = data.result;
      } else {
        this.etablissements = [];
      }
    });
  }

  onChangGouv(event) {
    this.gouvernoratLocal = event.value;
  }

  showAllGouvernorat() {
    this.crudservice.getlistEntity("gouvernorat").subscribe((data) => {
      if (data.result) {
        console.log(data.result);
        this.gouvernorats = [];
        this.gouvernoratSwich = [];
        data.result.forEach((gouvernorat: Gouvernorat, value: any) => {
          this.gouvernoratSwich.push({
            label: gouvernorat.libelle_gouvernorat,
            value: gouvernorat.libelle_gouvernorat,
          });

          this.gouvernorats.push({
            label: gouvernorat.libelle_gouvernorat,
            value: gouvernorat,
          });
        });
      } else {
        this.gouvernorats = [];
      }
    });
  }

  addEtab() {
    this.etablissement = new Etablissement();
    this.etablissement.id = this.id;
    this.etablissement.libelle_etablissement = this.nom;

    this.etablissement.gouvernorat = this.gouvernoratLocal;

    this.crudservice
      .createLigne("etablissement", this.etablissement)
      .subscribe((data) => {
        if (data.result) {
          console.log(data.result);
          this.showAllEtablissement();
        }
      });
    this.display = false;
  }

  delete(etablissement: Etablissement) {
    this.crudservice
      .deleteLigne("etablissement", etablissement.id)
      .subscribe((data) => {
        if (data.status == 417) {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: " عليك تثبت     ",
          });
        } else {
          this.showAllEtablissement();
        }
      });
  }

  add() {
    this.id = "";
    this.nom = "";
    this.display = true;
  }
  update() {
    this.display = true;
  }
}
