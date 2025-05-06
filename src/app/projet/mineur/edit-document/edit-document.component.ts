import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { Router } from "@angular/router";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { Affaire } from "src/app/domain/affaire";
import { AppelEnfant } from "src/app/domain/appelEnfant";
import { AppelParquet } from "src/app/domain/appelParquet";
import { Arrestation } from "src/app/domain/arrestation";
import { Arreterlexecution } from "src/app/domain/arreterlexecution";
import { CarteDepot } from "src/app/domain/carteDepot";
import { CarteRecup } from "src/app/domain/carteRecup";
import { DocumentId } from "src/app/domain/documentId";
import { Document } from "src/app/domain/document";
import { Revue } from "src/app/domain/revue";
import { Transfert } from "src/app/domain/transfert";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { CarteHeber } from "src/app/domain/carteHebergement";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { RefuseRevue } from "src/app/domain/refuseRevue";
import { CartePropagation } from "src/app/domain/cartePropagation";
import { ChangementLieu } from "src/app/domain/changementLieu";
import { DocumentService } from "src/app/demo/service/document.service";
import { DetentionService } from "src/app/demo/service/detention.service";
import { AffaireService } from "src/app/demo/service/affaire.service";

@Component({
  selector: "app-edit-document",
  templateUrl: "./edit-document.component.html",
  styleUrls: ["./edit-document.component.css"],
  providers: [MessageService, ConfirmationService],
})
export class EditDocumentComponent implements OnInit {
  isDelet = false;
  showDelet = false;

  showCarteRecup = false;

  editCarteRecup = false;
  editCarteDepot = false;
  editCarteHeber = false;
  editTransfert = false;
  editAppelEnfant = false;
  editAppelParquet = false;
  editRevue = false;
  editRefuseRevue = false;
  editArreterlexecution = false;
  editChangementLieu = false;

  showCarteHeber = false;
  showCarteDepot = false;
  showTransfert = false;
  showAppelEnfant = false;
  showAppelParquet = false;
  showRevue = false;
  showRefuseRevue = false;
  showArreterlexecution = false;
  showPropagation = false;

  showChangementLieu = false;
  revue: Revue;
  refuseRevue: RefuseRevue;
  arreterlexecution: Arreterlexecution;
  carteRecup: CarteRecup;
  carteDepot: CarteDepot;
  carteHeber: CarteHeber;
  transfert: Transfert;
  cartePropagation: CartePropagation;
  appelEnfant: AppelEnfant;
  appelParquet: AppelParquet;
  changementLieu: ChangementLieu;

  @Input()
  idValide: string;
  documentId: DocumentId;
  document: Document;
  documents: Document[] = [];
  affaires: Affaire[] = [];
  affaire: Affaire;
  arrestation: Arrestation;
  autorise = false;

  constructor(
    private crudservice: CrudEnfantService,
    private documentService: DocumentService,
    private detentionService: DetentionService,
    private affaireService: AffaireService,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private token: TokenStorageService
  ) {
    //   this.breadcrumbService.setItems([
    //     {label: 'الإستقبال', routerLink: ['/']},
    //     {label: 'القضايا ' , routerLink: ['/Affaire']},
    //     {label: 'مضمون حكم' },
    // ]);
  }

  ngOnDestroy() {
    window.localStorage.removeItem("idValide");
  }

  refresh() {
    if (this.idValide) {
      this.charge();
    }
    console.log("xxxxxx");
  }
  ngOnInit() {
    // let idValide = window.localStorage.getItem("idValide");
    // console.log(idValide);
    // if (idValide) {
    //   this.idValide=idValide;
    //   this.charge();

    // }

    if (this.idValide) {
      this.charge();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {}

  charge() {
    this.detentionService
      .trouverDerniereDetentionParIdDetenu("arrestation", this.idValide)
      .subscribe((data) => {
        if (data.result == null) {
          console.log("1111111");
        } else {
          console.log("2222222");
          this.arrestation = data.result;
          this.detentionService
            .trouverDerniereResidenceParNumDetentionEtIdDetenu(
              "residence",
              this.arrestation.arrestationId.idEnfant,
              this.arrestation.arrestationId.numOrdinale
            )
            .subscribe((data) => {
              if (
                data.result?.etablissement?.id ==
                this.token?.getUser()?.etablissement?.id
              ) {
                this.autorise = true;
              }
            });

          this.affaireService
            .trouverAffairesParAction(
              "general",
              this.arrestation.arrestationId.idEnfant,
              this.arrestation.arrestationId.numOrdinale
            )
            .subscribe((data) => {
              if (data.result == null) {
              } else {
                this.affaires = data.result;

                this.affaires.forEach((element) => {
                  this.getDocumentByAffaire(element);
                });
              }
            });
        }
      });
  }

  getDocumentByAffaire(affaire: Affaire) {
    this.documentService
      .trouverDocumentsJudiciairesParDetentionEtAffaire(
        "document",
        affaire.arrestation.arrestationId.idEnfant,
        affaire.arrestation.arrestationId.numOrdinale,
        affaire.numOrdinalAffaire
      )
      .subscribe((data) => {
        console.log("---------------------------------------------");
        console.log(data.result);
        console.log("---------------------------------------------");
        if (data.result == null) {
        } else {
          affaire.documents = data.result;
        }
      });
  }

  showCarte(row, index, affaire) {
    this.affaire = affaire;
    this.document = row;
    console.log(index);
    console.log(this.document);
    this.showDelet = false;
    if (row.documentId.numOrdinalDocByAffaire == index) {
      this.showDelet = true;
    }

    if (row.typeDocumentActuelle == "CHL") {
      this.changementLieu = row;

      this.showChangementLieu = true;
    } else if (row.typeDocument == "CJ" || row.typeDocument == "CJA") {
      this.carteRecup = row;
      this.showCarteRecup = true;
    } else if (row.typeDocument == "CD") {
      this.carteDepot = row;

      this.showCarteDepot = true;
    } else if (row.typeDocument == "CH") {
      this.carteHeber = row;

      this.showCarteHeber = true;
    } else if (row.typeDocument == "T") {
      this.transfert = row;

      this.showTransfert = true;
    } else if (row.typeDocument == "AE") {
      this.appelEnfant = row;

      this.showAppelEnfant = true;
    } else if (row.typeDocument == "AP") {
      this.appelParquet = row;

      this.showAppelParquet = true;
    } else if (row.typeDocument == "CR") {
      this.revue = row;

      this.showRevue = true;
    } else if (row.typeDocument == "CRR") {
      this.refuseRevue = row;

      this.showRefuseRevue = true;
    } else if (row.typeDocument == "ArretEx") {
      this.arreterlexecution = row;

      this.showArreterlexecution = true;
    } else if (row.typeDocument == "CP") {
      this.cartePropagation = row;

      this.showPropagation = true;
    } else {
      alert("erruer");
    }
  }

  closeShow() {
    this.isDelet = false;
    this.showDelet = false;

    if (this.document.typeDocument == "CJ") {
      this.showCarteRecup = false;
    } else if (this.document.typeDocument == "CD") {
      this.showCarteDepot = false;
    } else if (this.document.typeDocument == "CH") {
      this.showCarteHeber = false;
    } else if (this.document.typeDocument == "T") {
      this.showTransfert = false;
    } else if (this.document.typeDocument == "AE") {
      this.showAppelEnfant = false;
    } else if (this.document.typeDocument == "AP") {
      this.showAppelParquet = false;
    } else if (this.document.typeDocument == "CR") {
      this.showRevue = false;
    } else if (this.document.typeDocument == "ArretEx") {
      this.showArreterlexecution = false;
    }
  }

  editCarte(row) {
    this.documentService
      .trouverDocumentJudiciaireParId(row.documentId)
      .subscribe((data) => {
        row = data.result;
        if (row.typeDocumentActuelle == "CHL") {
          this.changementLieu = row;

          this.showChangementLieu = true;
        } else if (row.typeDocument == "CJ") {
          this.carteRecup = row;

          this.editCarteRecup = true;
        } else if (row.typeDocument == "T") {
          this.transfert = row;

          this.editTransfert = true;
        } else if (row.typeDocument == "CH") {
          this.carteHeber = row;

          this.editCarteHeber = true;
        } else if (row.typeDocument == "CD") {
          this.carteDepot = row;

          this.editCarteDepot = true;
        } else if (row.typeDocument == "ArretEx") {
          this.arreterlexecution = row;

          this.editArreterlexecution = true;
        } else if (row.typeDocument == "AE") {
          this.appelEnfant = row;

          this.editAppelEnfant = true;
        } else if (row.typeDocument == "AP") {
          this.appelParquet = row;

          this.editAppelParquet = true;
        } else if (row.typeDocument == "CR") {
          this.revue = row;

          this.editRevue = true;
        }
      });
  }

  yesDelet() {
    console.log(this.document.documentId);
    // this.documentId = this.document.documentId;
    this.crudservice
      .delete("document", this.document.typeDocument, this.document.documentId)
      .subscribe((data) => {
        if (data.result == 0) {
          this.closeShow();

          this.affaire.documents = this.affaire.documents.filter(
            (u) => u !== this.document
          );
        } else {
          this.affaireService
            .trouverAffairesParAction(
              "general",
              this.arrestation.arrestationId.idEnfant,
              this.arrestation.arrestationId.numOrdinale
            )
            .subscribe((data) => {
              if (data.result == null) {
              } else {
                this.closeShow();
                this.affaires = [];
                this.affaires = data.result;

                this.affaires.forEach((element) => {
                  this.getDocumentByAffaire(element);
                });
              }
            });
        }
      });
  }
}
