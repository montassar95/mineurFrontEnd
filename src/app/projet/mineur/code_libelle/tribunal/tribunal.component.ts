import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService, SelectItem } from "primeng/api";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { Gouvernorat } from "src/app/domain/gouvernorat";
import { Tribunal } from "src/app/domain/tribunal";
import { TypeTribunal } from "src/app/domain/typeTribunal";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";

@Component({
  selector: "app-tribunal",
  templateUrl: "./tribunal.component.html",
  styleUrls: ["./tribunal.component.css"],
  providers: [MessageService],
})
export class TribunalComponent implements OnInit {
  display = false;
  gouvernorats: SelectItem[];
  gouvernoratSwich: SelectItem[];
  gouvernoratLocal: Gouvernorat;

  typeTribunals: SelectItem[];
  typeTribunalSwich: SelectItem[];
  typeTribunalLocal: TypeTribunal;
  tribunal: Tribunal;

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

      { label: "رموز القضايا" },
      { label: " قائمة  المحاكم" },
    ]);
  }
  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
    this.showAllTribunal();
    this.showAllTypeTribunal();
    this.showAllGouvernorat();
  }
  tribunals: Tribunal[] = [];

  showAllTribunal() {
    this.crudservice.getlistEntity("tribunal").subscribe((data) => {
      if (data.result) {
        this.tribunals = data.result;
      } else {
        this.tribunals = [];
      }
    });
  }
  addTri() {
    this.tribunal = new Tribunal();
    this.tribunal.id = this.id;
    this.tribunal.nom_tribunal = this.nom;

    this.tribunal.gouvernorat = this.gouvernoratLocal;
    this.tribunal.typeTribunal = this.typeTribunalLocal;

    this.crudservice
      .createLigne("tribunal", this.tribunal)
      .subscribe((data) => {
        if (data.result) {
          console.log(data.result);
          this.showAllTribunal();
        }
      });
    this.display = false;
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
  showAllTypeTribunal() {
    this.crudservice.getlistEntity("typeTribunal").subscribe((data) => {
      if (data.result) {
        console.log(data.result);
        this.typeTribunals = [];
        this.typeTribunalSwich = [];
        data.result.forEach((typeTribunal: TypeTribunal, value: any) => {
          this.typeTribunalSwich.push({
            label: typeTribunal.libelleTypeTribunal,
            value: typeTribunal.libelleTypeTribunal,
          });

          this.typeTribunals.push({
            label: typeTribunal.libelleTypeTribunal,
            value: typeTribunal,
          });
        });
      } else {
        this.gouvernorats = [];
      }
    });
  }
  onChangeGouv(event) {
    this.gouvernoratLocal = event.value;
  }
  onChangeType(event) {
    this.typeTribunalLocal = event.value;
  }
  add() {
    this.id = "";
    this.nom = "";
    this.display = true;
  }

  update() {
    this.display = true;
  }
  delete(typeTribunal: TypeTribunal) {
    this.crudservice
      .deleteLigne("typeTribunal", typeTribunal.id)
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
