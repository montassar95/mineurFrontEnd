import { OnDestroy, ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { Affaire } from "src/app/domain/affaire";
import { AppelEnfant } from "src/app/domain/appelEnfant";
import { AppelParquet } from "src/app/domain/appelParquet";
import { CarteDepot } from "src/app/domain/carteDepot";
import { CarteRecup } from "src/app/domain/carteRecup";
import { Revue } from "src/app/domain/revue";
import { Document } from "src/app/domain/document";
import { Transfert } from "src/app/domain/transfert";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";
import { Arreterlexecution } from "src/app/domain/arreterlexecution";
import { DocumentId } from "src/app/domain/documentId";
import { Arrestation } from "src/app/domain/arrestation";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { AddLiberationComponent } from "../add-liberation/add-liberation.component";
import { DetentionService } from "src/app/demo/service/detention.service";

@Component({
  selector: "app-liberation",
  templateUrl: "./liberation.component.html",
  styleUrls: ["./liberation.component.css"],
  providers: [MessageService, ConfirmationService],
})
export class LiberationComponent implements OnInit {
  arrestationToDelet: Arrestation;
  isDelet = false;
  autorise = false;
  arrestations: Arrestation[] = [];
  currentUser: any;
  totalArrestation = 0;
  idValide: string;

  @ViewChild(AddLiberationComponent)
  private addLiberationComponent: AddLiberationComponent;

  constructor(
    private crudservice: CrudEnfantService,
    private detentionService: DetentionService,
    private service: MessageService,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private token: TokenStorageService
  ) {
    this.breadcrumbService.setItems([
      { label: "الإستقبال", routerLink: ["/"] },

      { label: "التغيرات الطارئة  " },
      { label: "إجراءات السراح" },
    ]);
  }

  ngOnDestroy() {
    window.localStorage.removeItem("idValide");
  }
  ngOnInit() {
    this.idValide = window.localStorage.getItem("idValide");

    this.refrech();
  }
  refrech() {
 
    this.detentionService
      .trouverDetenuAvecSonStatutActuel(
        this.idValide,
        this.token.getUser().etablissement.id
      )
      .subscribe((data) => {
        if (data.result == null) {
        } else {
          this.arrestations = data.result.arrestations;
          this.totalArrestation = this.arrestations.length;
          this.detentionService
            .trouverDerniereResidenceParNumDetentionEtIdDetenu(
              "residence",
              this.arrestations[0].arrestationId.idEnfant,
              this.arrestations[0].arrestationId.numOrdinale
            )
            .subscribe((data) => {
              if (
                data.result?.etablissement?.id ==
                this.token?.getUser()?.personelle?.etablissement?.id
              ) {
                this.autorise = true;
              }
            });
        }
      });
     
      
  }
  delete(arrestation: Arrestation) {
    this.isDelet = true;
    this.arrestationToDelet = arrestation;
  }
  yesDelet() {
    this.detentionService
      .supprimerLiberation(this.arrestationToDelet)
      .subscribe((data) => {
        this.isDelet = false;
        this.addLiberationComponent.refresh();
        console.log(data.result);
        this.service.add({
          key: "tst",
          severity: "success",
          summary: "تمت عملية حذف     بنجاح    ",
          detail: "1",
        });

        this.refrech();
      });
  }

  onTabChanged(event) {
    if (event.index == 0) {
    } else {
      console.log("aaaaaaa");
      this.refrech();
    }
  }
}
