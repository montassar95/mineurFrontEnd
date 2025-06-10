import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService, SelectItem } from "primeng/api";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { TitreAccusation } from "src/app/domain/titreAccusation";
import { TypeAffaire } from "src/app/domain/typeAffaire";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";

@Component({
  selector: "app-titre-accusation",
  templateUrl: "./titre-accusation.component.html",
  styleUrls: ["./titre-accusation.component.css"],
  providers: [MessageService],
})
export class TitreAccusationComponent implements OnInit {
  display = false;

  typeAffaires: SelectItem[];
  typeAffaireSwich: SelectItem[];
  typeAffaireLocal: TypeAffaire;

  titreAccusation: TitreAccusation;

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
      { label: " قائمة  التهم" },
    ]);
  }
  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
    this.showAllTitreAccusation();
    this.showAllTypeAffaire();
  }

  titreAccusations: TitreAccusation[] = [];

  showAllTitreAccusation() {
    this.crudservice.getlistEntity("titreAccusation").subscribe((data) => {
      if (data.result) {
        this.titreAccusations = data.result;

        this.showAllTitreAccusation();
      } else {
        this.titreAccusations = [];
      }
    });
  }
  showAllTypeAffaire() {
    this.crudservice.getlistEntity("typeAffaire").subscribe((data) => {
      if (data.result) {
        console.log(data.result);
        this.typeAffaires = [];
        this.typeAffaireSwich = [];

        data.result.forEach((typeAffaire: TypeAffaire, value: any) => {
          this.typeAffaireSwich.push({
            label: typeAffaire.libelle_typeAffaire,
            value: typeAffaire.libelle_typeAffaire,
          });

          this.typeAffaires.push({
            label: typeAffaire.libelle_typeAffaire,
            value: typeAffaire,
          });
        });
      } else {
        this.typeAffaires = [];
      }
    });
  }

  addTit() {
    this.titreAccusation = new TitreAccusation();
    this.titreAccusation.id = this.id;
    this.titreAccusation.titreAccusation = this.nom;

    this.titreAccusation.typeAffaire = this.typeAffaireLocal;

    this.crudservice
      .createLigne("titreAccusation", this.titreAccusation)
      .subscribe((data) => {
        if (data.result) {
          console.log(data.result);
          this.showAllTypeAffaire();
        }
      });
    this.display = false;
  }
  onChangeType(event) {
    this.typeAffaireLocal = event.value;
  }
  add() {
    this.id = "";
    this.nom = "";
    this.display = true;
  }

  update() {
    this.display = true;
  }

  delete(titreAccusation: TitreAccusation) {
    this.crudservice
      .deleteLigne("titreAccusation", titreAccusation.id)
      .subscribe((data) => {
        if (data.status == 417) {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: " عليك تثبت     ",
          });
        } else {
          this.showAllTypeAffaire();
        }
      });
  }
}
