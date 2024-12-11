import { DatePipe } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
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
import { FicheDeDetentionDto } from "src/app/domain/ficheDeDetentionDto";
import { ActivatedRoute } from "@angular/router";
import { DetentionService } from "src/app/demo/service/detention.service";
import { AffaireService } from "src/app/demo/service/affaire.service";
import { DocumentService } from "src/app/demo/service/document.service";
import { RapportService } from "src/app/demo/service/rapport.service";

@Component({
  selector: "app-more-informaton",
  templateUrl: "./more-informaton.component.html",
  styleUrls: ["./more-informaton.component.scss"],
})
export class MoreInformatonComponent implements OnInit {
  currentUser: any;
  constructor(
    private crudservice: CrudEnfantService,
    private detentionService: DetentionService,
    private documentService: DocumentService,
    private affaireService: AffaireService,
    private rapportService: RapportService,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private token: TokenStorageService,
    public datepipe: DatePipe,
    private nodeService: NodeService,
    private route: ActivatedRoute
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
  ficheDeDetentionDto: FicheDeDetentionDto;
  affairePrincipale: Affaire | undefined;
  photo = "";

  loading: boolean = true;
  source: string | null = null;
  ngOnDestroy() {
    window.localStorage.removeItem("idEnfantValide");
  }

  @Input()
  idEnfant: string;

  ngOnInit(): void {
    console.log(this.token.getUser());
    this.currentUser = this.token.getUser();
    if (this.idEnfant) {
      this.search(this.idEnfant);
    }
    // Récupérer les paramètres 'id' et 'source' de l'URL
    this.route.paramMap.subscribe((params) => {
      this.idEnfant = params.get("id"); // Récupération du paramètre 'id'
      this.source = params.get("source"); // Récupération du paramètre 'source'
      console.log(this.source);
      if (this.idEnfant && this.source == "Mineur") {
        this.search(this.idEnfant); // Appel de la méthode search avec les deux paramètres
      }
      else{
        alert("Penale")
      }
    });
  }
  // La variable qui contrôle l'affichage des informations supplémentaires
  showMoreInfo = false;

  // Fonction qui bascule la visibilité de la section
  toggleMoreInfo() {
    this.showMoreInfo = !this.showMoreInfo;
  }
  returnListAffaire() {
    this.displayAffaire = true;
    this.displayAffaireDetails = false;
  }

  search(id: String) {
    this.detentionService
      .trouverDetenuAvecSonStatutActuel(
        id,
        this.token.getUser().etablissement.id
      )
      .subscribe((data) => {
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
    this.detentionService
      .trouverPhotoByIdDetenuEtNumDetention(idEnfant, numArr)
      .subscribe((data) => {
        if (data.result == null) {
        } else {
          this.photo = data.result.img;
        }
      });
  }

  getDocuments(affaire: Affaire, isConsult: boolean = false) {
    this.affaireLocal = affaire;

    this.documentService
      .trouverDocumentsJudiciairesParDetentionEtAffaire(
        "document",
        affaire.arrestation.arrestationId.idEnfant,
        affaire.arrestation.arrestationId.numOrdinale,
        affaire.numOrdinalAffaire
      )
      .subscribe({
        next: (data) => {
          if (data.result) {
            this.documents = data.result;
            this.displayAffaire = isConsult;
            this.displayAffaireDetails = !isConsult;
            this.displayAffaireConsult = isConsult;
          }
        },
        error: (err) => {
          console.error("Error fetching documents:", err);
          // Optionally, you can add error handling logic here (e.g., show a notification)
        },
      });
  }

  // Usage
  getDocumentByAffaire(affaire: Affaire) {
    this.getDocuments(affaire);
  }

  getDocumentByAffaireConsult(affaire: Affaire) {
    this.getDocuments(affaire, true);
  }

  showArrestation(arrestation: Arrestation) {
    this.loading = true; // Début du chargement
    this.selectedIndex = 0;
    this.displayAllArrestation = false;
    this.arrestationLocal = arrestation;
    this.affaireService
      .obtenirInformationsDeDetentionParIdDetention(
        arrestation.arrestationId.idEnfant,
        arrestation.arrestationId.numOrdinale
      )
      .subscribe((data) => {
        console.log(data.result);
        this.ficheDeDetentionDto = data.result;

        this.affaires = this.ficheDeDetentionDto.affaires;
        this.arretProvisoires = this.ficheDeDetentionDto.arretProvisoires;
        this.affairePrincipale = this.trouverAffairePrincipale(this.affaires);
        this.residences = this.ficheDeDetentionDto.residences;
        this.getTitreAccusation(this.affairePrincipale);
        this.getRecidence(this.ficheDeDetentionDto.residences[0]);
        this.displayAffaire = true;

        console.log(
          " dateAppelEnfant " +
            this.ficheDeDetentionDto.dateAppelEnfant +
            "datDebut " +
            this.ficheDeDetentionDto.dateDebut
        );
        this.loading = false; // Fin du chargement
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

    this.rapportService
      .genererFicheDeDetentionPdf(this.pDFPenaleDTO)
      .subscribe((x) => {
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
    console.log("row");
    console.log(row);
    if (row.typeDocumentActuelle == "CHL") {
      this.changementLieu = row;
      this.showChangementLieu = true;
    } else if (row.typeDocument == "CJ") {
      this.carteRecup = row;
      console.log("this.carteRecup");
      console.log(this.carteRecup);

      this.showCarteRecup = true;
    } else if (row.typeDocument == "CD") {
      this.carteDepot = row;

      this.showCarteDepot = true;
    } else if (row.typeDocument == "CP") {
      this.cartePropagation = row;

      this.showCartePropagation = true;
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
    } else if (row.typeDocument == "AEX") {
      this.arreterlexecution = row;
      this.showArreterlexecution = true;
    }
  }
}
