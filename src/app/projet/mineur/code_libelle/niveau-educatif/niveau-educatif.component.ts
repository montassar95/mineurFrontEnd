import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { NiveauEducatif } from "src/app/domain/niveauEducatif";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";

@Component({
  selector: "app-niveau-educatif",
  templateUrl: "./niveau-educatif.component.html",
  styleUrls: ["./niveau-educatif.component.css"],
  providers: [MessageService],
})
export class NiveauEducatifComponent implements OnInit {
  id;
  nom;
  display = false;
  niveauEducatif: NiveauEducatif;
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
      { label: "المستوى الدراسي" },
    ]);
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
    this.showAllNiveauEducatif();
  }

  niveauEducatifs: NiveauEducatif[] = [];

  showAllNiveauEducatif() {
    this.crudservice.getlistEntity("niveauEducatif").subscribe((data) => {
      if (data.result) {
        this.niveauEducatifs = data.result;
      } else {
        this.niveauEducatifs = [];
      }
    });
  }
  addNiEd() {
    this.niveauEducatif = new NiveauEducatif();
    this.niveauEducatif.id = this.id;
    this.niveauEducatif.libelle_niveau_educatif = this.nom;

    this.crudservice
      .createLigne("niveauEducatif", this.niveauEducatif)
      .subscribe((data) => {
        if (data.result) {
          console.log(data.result);
          this.showAllNiveauEducatif();
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

  delete(niveauEducatif: NiveauEducatif) {
    this.crudservice
      .deleteLigne("niveauEducatif", niveauEducatif.id)
      .subscribe((data) => {
        if (data.status == 417) {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: " عليك تثبت     ",
          });
        } else {
          this.showAllNiveauEducatif();
        }
      });
  }
}
