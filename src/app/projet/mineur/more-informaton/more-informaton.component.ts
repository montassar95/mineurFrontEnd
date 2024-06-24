import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MessageService } from "primeng/api";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { EventService } from "src/app/demo/service/eventservice";
import { NodeService } from "src/app/demo/service/nodeservice";
import { Document } from "src/app/domain/document";
import { Affaire } from "src/app/domain/affaire";
import { Arrestation } from "src/app/domain/arrestation";
import { Enfant } from "src/app/domain/enfant";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { Residence } from "src/app/domain/residence";
import { TitreAccusation } from "src/app/domain/titreAccusation";
import { ArretProvisoire } from "src/app/domain/arretProvisoire";
import { CarteRecup } from "src/app/domain/carteRecup";
import { CarteDepot } from "src/app/domain/carteDepot";
import { Transfert } from "src/app/domain/transfert";
import { AppelEnfant } from "src/app/domain/appelEnfant";
import { AppelParquet } from "src/app/domain/appelParquet";
import { Revue } from "src/app/domain/revue";
import { Arreterlexecution } from "src/app/domain/arreterlexecution";
import { PDFPenaleDTO } from "src/app/domain/pDFPenaleDTO";
import { CarteHeber } from "src/app/domain/carteHebergement";
import { RefuseRevue } from "src/app/domain/refuseRevue";
import { CartePropagation } from "src/app/domain/cartePropagation";
import { ChangementLieu } from "src/app/domain/changementLieu";
import { CalculeAffaireDto } from "src/app/domain/calculeAffaireDto";

@Component({
  selector: "app-more-informaton",
  templateUrl: "./more-informaton.component.html",
  styleUrls: ["./more-informaton.component.scss"],
})
export class MoreInformatonComponent implements OnInit {
  constructor(
    private crudservice: CrudEnfantService,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private token: TokenStorageService,
    public datepipe: DatePipe,
    private nodeService: NodeService
  ) {}

  swipe() {
    var image = new Image();
    image.src = this.enfantLocal?.img;

    var w = window.open("", "_blank");
    w.document.write(image.outerHTML);
  }

  enfantLocal: Enfant;
  arrestations: Arrestation[];
  titreAccusations: TitreAccusation[];
  arretProvisoires: ArretProvisoire[];
  arrestationLocal: Arrestation;
  affaireLocal: Affaire;
  affaires: Affaire[] = [];
  documents: Document[] = [];
  sansDetail = false;
  sansImage = false;
  displayAffaire: boolean;
  displayAffaireConsult: boolean;
  displayAffaireDetails: boolean;
  hasChangementLieu: ChangementLieu;
  displayAllArrestation = false;
  residences: Residence[] = [];
  selectedIndex;
  pDFPenaleDTO: PDFPenaleDTO;
  centre = "";
  numArrestation = "";
  titreAcc = "";
  showArreterlexecution = false;
  showCarteRecup = false;
  showCarteDepot = false;
  showCartePropagation = false;
  showCarteHeber = false;
  showTransfert = false;
  showAppelEnfant = false;
  showAppelParquet = false;
  showRevue = false;
  showRefuseRevue = false;
  showChangementLieu = false;
  carteRecup: CarteRecup;
  carteDepot: CarteDepot;
  cartePropagation: CartePropagation;
  carteHeber: CarteHeber;
  transfert: Transfert;
  arreterlexecution: Arreterlexecution;
  appelEnfant: AppelEnfant;
  appelParquet: AppelParquet;
  revue: Revue;
  refuseRevue: RefuseRevue;
  changementLieu: ChangementLieu;
  arrestationMSg: Arrestation;
  residenceMSg: Residence;
  msg = "";
  myImgUrl: string = "assets/layout/images//inconnu.png";
  ageEnfant = "";
  ageCon = "";
  calculeAffaireDto: CalculeAffaireDto;
  affairePrincipale: Affaire | undefined;
  photo = "";
  ngOnDestroy() {
    window.localStorage.removeItem("idEnfantValide");
  }

  ngOnInit(): void {
    let idEnfantValide = window.localStorage.getItem("idEnfantValide");

    if (idEnfantValide) {
      this.search(idEnfantValide);
    }
  }

  returnListAffaire() {
    this.displayAffaire = true;
    this.displayAffaireDetails = false;
  }

  search(id: String) {
    this.crudservice.chercherEnfantAvecVerification(id).subscribe((data) => {
      this.enfantLocal = data.result.enfant;
      this.msg = data.result.situation;
      this.ageEnfant = " " + data.result.age + " ";
      this.ageCon = data.result.adultDate;
      this.arrestations = data.result.arrestations;

      this.showArrestation(this.arrestations[0]);

      console.log(this.arrestations[0]);
    });
  }
  getPhotoById(idEnfant: any, numArr: any) {
    this.photo = "";
    this.crudservice.getPhotoById(idEnfant, numArr).subscribe((data) => {
      if (data.result == null) {
      } else {
        this.photo = data.result.img;
      }
    });
  }

  getDocumentByAffaire(affaire: Affaire) {
    this.affaireLocal = affaire;
    this.crudservice
      .getDocumentByAffaire(
        "document",
        affaire.arrestation.arrestationId.idEnfant,
        affaire.arrestation.arrestationId.numOrdinale,
        affaire.numOrdinalAffaire
      )
      .subscribe((data) => {
        if (data.result == null) {
        } else {
          this.documents = data.result;
          this.displayAffaire = false;
          this.displayAffaireDetails = true;
        }
      });
  }

  getDocumentByAffaireConsult(affaire: Affaire) {
    this.affaireLocal = affaire;
    this.crudservice
      .getDocumentByAffaire(
        "document",
        affaire.arrestation.arrestationId.idEnfant,
        affaire.arrestation.arrestationId.numOrdinale,
        affaire.numOrdinalAffaire
      )
      .subscribe((data) => {
        if (data.result == null) {
        } else {
          this.documents = data.result;
          this.displayAffaireConsult = true;
        }
      });
  }

  showArrestation(arrestation: Arrestation) {
    this.selectedIndex = 0;
    this.displayAllArrestation = false;
    this.arrestationLocal = arrestation;
    this.crudservice
      .calculerAffaire(
        "affaire",
        arrestation.arrestationId.idEnfant,
        arrestation.arrestationId.numOrdinale
      )
      .subscribe((data) => {
        this.calculeAffaireDto = data.result;
        this.affaires = this.calculeAffaireDto.affaires;
        this.arretProvisoires = this.calculeAffaireDto.arretProvisoires;
        this.affairePrincipale = this.trouverAffairePrincipale(this.affaires);
        this.residences = this.calculeAffaireDto.residences;
        this.getTitreAccusation(this.affairePrincipale);
        this.getRecidence(this.calculeAffaireDto.residences[0]);
        this.displayAffaire = true;

        console.log(
          " dateAppelEnfant " +
            this.calculeAffaireDto.dateAppelEnfant +
            "datDebut " +
            this.calculeAffaireDto.dateDebut
        );
      });

    this.getPhotoById(
      arrestation.arrestationId.idEnfant,
      arrestation.arrestationId.numOrdinale
    );
  }

  private trouverAffairePrincipale(liste: Affaire[]): Affaire | undefined {
    return liste.find((affaire) => affaire.affairePrincipale === true);
  }

  private getRecidence(residence: Residence) {
    if (residence.statut == 2) {
      this.numArrestation = "نقلة جارية";
      this.centre =
        "نحو " + " " + residence.etablissement.libelle_etablissement;
    } else {
      this.numArrestation = residence.numArrestation;
      this.centre = residence.etablissement.libelle_etablissement;
    }
  }

  private getTitreAccusation(affaire: Affaire) {
    if (affaire == null) {
    } else {
      this.titreAccusations = affaire.titreAccusations;
      this.titreAcc = " ";
      for (var i = 0; i < this.titreAccusations.length; i++) {
        this.titreAcc =
          " " + this.titreAcc + this.titreAccusations[i].titreAccusation;
        if (i != this.titreAccusations.length - 1) {
          this.titreAcc = this.titreAcc + " و ";
        }
      }
    }
  }

  zoomIn = true;
  zoomOut = false;

  print() {
    this.pDFPenaleDTO = new PDFPenaleDTO();
    this.pDFPenaleDTO.sansDetail = this.sansDetail;
    this.pDFPenaleDTO.sansImage = this.sansImage;
    this.pDFPenaleDTO.idEnfant = this.arrestationLocal.arrestationId.idEnfant;
    this.pDFPenaleDTO.numOrdinale =
      this.arrestationLocal.arrestationId.numOrdinale;

    this.crudservice.exportPdf(this.pDFPenaleDTO).subscribe((x) => {
      const blob = new Blob([x], { type: "application/pdf" });
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = data;
      link.download = "enfant.pdf";

      window.open(
        data,
        "_blank",
        "top=0,left=0,bottom= 0, right= 0,height=100%,width=auto"
      );
    });
  }

  showCarte(row) {
    if (row.typeDocumentActuelle == "CHL") {
      this.changementLieu = row;
      this.showChangementLieu = true;
    } else if (row.typeDocument == "CJ") {
      this.carteRecup = row;
      this.crudservice.findByCarteRecup(this.carteRecup).subscribe((data) => {
        this.carteRecup.entitiesAccusation = data.result;
      });
      this.crudservice
        .findArretProvisoireByCarteRecup(this.carteRecup)
        .subscribe((data) => {
          this.carteRecup.entitiesArretProvisoire = data.result;
        });
      this.showCarteRecup = true;
    } else if (row.typeDocument == "CD") {
      this.carteDepot = row;
      this.crudservice
        .findTitreAccusationbyCarteDepot(this.carteDepot)
        .subscribe((data) => {
          this.carteDepot.entitiesTitreAccusation = data.result;
        });
      this.showCarteDepot = true;
    } else if (row.typeDocument == "CP") {
      this.cartePropagation = row;
      this.showCartePropagation = true;
    } else if (row.typeDocument == "CH") {
      this.carteHeber = row;
      this.crudservice
        .findTitreAccusationbyCarteHeber(this.carteHeber)
        .subscribe((data) => {
          this.carteHeber.entitiesTitreAccusation = data.result;
        });
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
    } else if (row.typeDocument == "AEX") {
      this.arreterlexecution = row;
      this.showArreterlexecution = true;
    }
  }
}
