import { DatePipe } from "@angular/common";
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService, SelectItem } from "primeng/api";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { EventService } from "src/app/demo/service/eventservice";
import { NodeService } from "src/app/demo/service/nodeservice";
import { Accusation } from "src/app/domain/accusation";
import { AccusationCarteRecup } from "src/app/domain/accusationCarteRecup";
import { AccusationCarteRecupId } from "src/app/domain/accusationCarteRecupId";
import { Affaire } from "src/app/domain/affaire";
import { AffaireId } from "src/app/domain/affaireId";
import { Arrestation } from "src/app/domain/arrestation";
import { ArrestationId } from "src/app/domain/arrestationId";
import { ArretProvisoire } from "src/app/domain/arretProvisoire";
import { ArretProvisoireId } from "src/app/domain/arretProvisoireId";
import { CarteRecup } from "src/app/domain/carteRecup";
import { DocumentId } from "src/app/domain/documentId";
import { Enfant } from "src/app/domain/enfant";
import { Gouvernorat } from "src/app/domain/gouvernorat";
import { ResidenceId } from "src/app/domain/residanceId";
import { Residence } from "src/app/domain/residence";
import { TitreAccusation } from "src/app/domain/titreAccusation";
import { Tribunal } from "src/app/domain/tribunal";
import { TypeAffaire } from "src/app/domain/typeAffaire";
import { TypeJuge } from "src/app/domain/typeJuge";
import { TypeTribunal } from "src/app/domain/typeTribunal";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { VerifierAffaire } from "src/app/domain/verifierAffaire";
import { AffaireData } from "src/app/domain/affaireData";
import { AppConfigService } from "../app-config.service";
import { DocumentService } from "src/app/demo/service/document.service";
import { AffaireService } from "src/app/demo/service/affaire.service";
import { DetentionService } from "src/app/demo/service/detention.service";

@Component({
  selector: "app-carte-recup",
  templateUrl: "./carte-recup.component.html",
  styleUrls: ["./carte-recup.component.scss"],
  providers: [MessageService, ConfirmationService],
})
export class CarteRecupComponent implements OnInit, OnDestroy {
  alertTypeAffaire = "";

  refresh() {
    this.documentService
      .calculerNombreDocumentsJudiciairesParDetention(
        this.arrestation.arrestationId.idEnfant,
        this.arrestation.arrestationId.numOrdinale
      )
      .subscribe((data) => {
        this.numOrdinalDoc = data.result + 1;
      });
    this.nextBoolean = false;
  }
  typeAffaireSwich: SelectItem[];
  titreAccusationLocal: TitreAccusation;
  accusationForm: FormGroup;
  @Input()
  carteRecup: CarteRecup;

  arretProvisoireForm: FormGroup;

  enfantLocal: Enfant;

  residence: Residence;

  entitiesTribunal: Tribunal[];
  entitiesTribunalLien: Tribunal[];
  entitiesTribunalAff: Tribunal[];
  entitiesTypeAffaire: TypeAffaire[];
  entitiesTypeJuge: TypeJuge[];
  entitiesTitreAccusation: TitreAccusation[];
  affaires: Affaire[];
  @Input()
  dateDepotCarte;
  @Input()
  dateEmission;
  @Input()
  textJugement;
  @Input()
  numOrdinalDoc: number;
  @Input()
  numOrdinalDocByAffaire: number;

  @Input()
  update = true;
  @Input()
  isExist = false;
  @Input()
  isSaved = false;
  @Input()
  showCarteRecup = false;
  msg = "";
  msgAlert = "aaaa";

  displayAlertLienAutre: boolean;
  displayAlertLienMeme: boolean;
  displayAlertAffaireOrigineLier: boolean;
  displayAlertAffaireLienLier: boolean;
  displayAlertLienAutreArrestation: boolean;
  displayAlertOrigineExistAvecLien: boolean;
  displayAlertOrigineExistSansLien: boolean;

  position: string;
  @Input()
  typeAffaireObjet: TypeAffaire;
  @Input()
  typeJugeObjet: TypeJuge;
  arrestation: Arrestation;

  affaireOrigine: Affaire;
  affaireLien: Affaire;
  affaireJoin: Affaire;
  nextBoolean: boolean;
  affaireIdOrigine: AffaireId;
  affaireIdLien: AffaireId;
  documentId: DocumentId;
  displayNext: boolean;
  statEchappesOrlibre: number;

  residenceId: ResidenceId;
  arrestationId: ArrestationId;
  numArrestation = "";
  centre = "";
  numOrdinale = "";
  dateEntreLocal;
  accusationCarteRecupId: AccusationCarteRecupId;
  accusationCarteRecup: AccusationCarteRecup;
  displayAddArrestation: boolean;
  currentUser: any;
  nextAdd = false;

  @Input()
  jourArretProvisoire = 0;
  @Input()
  moisArretProvisoire = 0;
  @Input()
  anneeArretProvisoire = 0;
  @Input()
  daysDiffArretProvisoire = 0;

  jourJuge = 0;
  moisJuge = 0;
  anneeJuge = 0;
  @Input()
  daysDiffJuge = 0;

  @Input()
  jourPenal = 0;
  @Input()
  moisPenal = 0;
  @Input()
  anneePenal = 0;
  //  daysDiffPenal = 0;

  gouvernorats: SelectItem[];
  typeTribunals: SelectItem[];
  @Input()
  dateDebutGlobale: any;
  @Input()
  dateFinGlobale: any;
  idType = 0;
  idGouv = 0;

  arretProvisoireId: ArretProvisoireId;
  arretProvisoire: ArretProvisoire;

  calendar_ar: any;
  years = "";
  yearsPunition = "";
  affaireAffecter: Affaire;
  displayAfferAffecter = false;
  displayAfferOrigine = false;
  displayAfferLier = false;

  isLoading: boolean = false; // État pour désactiver le bouton

  //--------------------------------------------------------------------------------------------------------------------------
  constructor(
    private crudservice: CrudEnfantService,
    private documentService: DocumentService,
    private affaireService: AffaireService,
    private detentionService: DetentionService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private eventService: EventService,
    private service: MessageService,
    public datepipe: DatePipe,
    private token: TokenStorageService,
    private nodeService: NodeService,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private appConfigService: AppConfigService
  ) {
    this.breadcrumbService.setItems([
      {
        label: "الإستقبال",
        routerLink: ["/"],
      },

      {
        label: "القضايا ",
        routerLink: ["/mineur/Affaire"],
      },
      {
        label: "مضمون حكم",
      },
      {
        label: "إدراج",
      },
    ]);
  }

  //--------------------------------------------------------------------------------------------------------------------------

  ngOnDestroy() {
    window.localStorage.removeItem("idValide");
  }

  //--------------------------------------------------------------------------------------------------------------------------
  ngOnChanges(changes: SimpleChanges): void {
    this.isExist = true;

    this.isSaved = false;

    this.showCarteRecup = false;
    this.nextBoolean = false;

    this.entitiesTitreAccusation = [];
    this.crudservice.getlistEntity("titreAccusation").subscribe((data) => {
      this.entitiesTitreAccusation = data.result;

      if (this.accusationLocal) {
        this.entitiesTitreAccusation = this.entitiesTitreAccusation.filter(
          (u) => u.id !== this.accusationLocal.titreAccusation.id
        );
      }
    });

    this.documentService
      .trouverDocumentJudiciaireParId(this.carteRecup.documentId)
      .subscribe((data) => {
        console.log(
          "======================================================================================="
        );
        console.log(data.result);

        console.log(
          "======================================================================================="
        );

        this.carteRecup = data.result;

        this.numOrdinalDoc = this.carteRecup.documentId.numOrdinalDoc;

        this.numOrdinalDocByAffaire =
          this.carteRecup.documentId.numOrdinalDocByAffaire;

        this.dateDepotCarte = this.carteRecup.dateDepotCarte;
        this.dateDepotCarte = new Date(this.dateDepotCarte);

        this.dateEmission = this.carteRecup.dateEmission;
        this.dateEmission = new Date(this.dateEmission);

        this.textJugement = this.carteRecup.textJugement;

        this.codeTypeAffaire = this.carteRecup.typeAffaire.id;

        this.typeAffaire = this.carteRecup.typeAffaire.libelle_typeAffaire;

        this.typeAffaireObjet = this.carteRecup.typeAffaire;

        this.codeTypeJuge = this.carteRecup.typeJuge.id;

        this.typeJuge = this.carteRecup.typeJuge.libelle_typeJuge;

        this.typeJugeObjet = this.carteRecup.typeJuge;

        this.entitiesArretProvisoire = [];

        // this.entitiesArretProvisoire = this.carteRecup.entitiesArretProvisoire

        //  this.entitiesAccusation = this.carteRecup.entitiesAccusation

        this.accusationCarteRecups = this.carteRecup.accusationCarteRecups;

        this.dateDebutGlobale = this.carteRecup.dateDebutPunition;

        this.dateFinGlobale = this.carteRecup.dateFinPunition;

        this.daysDiffJuge = this.carteRecup.daysDiffJuge;

        this.jourPenal = this.carteRecup.jour;

        this.moisPenal = this.carteRecup.mois;

        this.anneePenal = this.carteRecup.annee;

        this.jourArretProvisoire = this.carteRecup.jourArretProvisoire;

        this.moisArretProvisoire = this.carteRecup.moisArretProvisoire;

        this.anneeArretProvisoire = this.carteRecup.anneeArretProvisoire;

        this.daysDiffArretProvisoire = this.carteRecup.daysDiffArretProvisoire;

        this.tribunal1 = this.carteRecup.affaire.tribunal.nom_tribunal;
        this.codeTribunal1 = this.carteRecup.affaire.tribunal.id;
        this.numAffaireT1 = this.carteRecup.affaire.affaireId.numAffaire;

        this.tribunal1Objet = this.carteRecup.affaire.tribunal;
      });
  }
  ngOnInit() {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
    let idValide = window.localStorage.getItem("idValide");
    let idValideNav = window.localStorage.getItem("idValideNav");
    console.log(idValide);
    if (idValide) {
      this.search(idValide);
    } else if (idValideNav) {
      this.search(idValideNav);
    }

    this.arretProvisoireForm = this.formBuilder.group({
      id: ["", Validators.required],

      dateDebut: ["", Validators.required],
      dateFin: ["", Validators.required],
    });

    this.accusationForm = this.formBuilder.group({
      id: ["", Validators.required],

      textAccusation: ["", Validators.required],
      jour: ["", Validators.required],
      mois: ["", Validators.required],
      annee: ["", Validators.required],
    });

    this.crudservice.getlistEntity("typeAffaire").subscribe((data) => {
      if (data.result) {
        this.entitiesTypeAffaire = data.result;
        console.log(data.result);

        this.typeAffaireSwich = [];

        data.result.forEach((typeAffaire: TypeAffaire, value: any) => {
          this.typeAffaireSwich.push({
            label: typeAffaire.libelle_typeAffaire,
            value: typeAffaire.libelle_typeAffaire,
          });
        });
      } else {
        this.typeAffaireSwich = [];
      }
    });

    this.crudservice.getlistEntity("typeJuge").subscribe((data) => {
      this.entitiesTypeJuge = data.result;
    });
    this.chargerDropDownListTribunal();
    this.chargerDropDownListGouv();
    this.chargerDropDownListTypeTribunal();
    this.currentUser = this.token.getUserFromTokenFromToken();
    this.accusationsToAdd = [];
    this.accusationsToAdd.push({ label: "empty", value: null });
    this.calendar_ar = this.appConfigService.calendarConfig;
  }

  //--------------------------------------------------------------------------------------------------------------------------

  reload() {
    this.enfantLocal = null;
    this.isExist = false;
    this.msg = "";

    //window.location.reload();
  }

  //------------------------------------------------------------begin trouverDetenuAvecSonStatutActuel-----------------------------------------------------------------------------------------------

  allowNewAddArrestation = false;
  allowNewCarte = false;
  alerte: boolean;
  search(id: String) {
    this.detentionService
      .trouverDetenuAvecSonStatutActuel(
        id,
        this.token.getUserFromTokenFromToken().etablissement.id
      )
      .subscribe((data) => {
        this.enfantLocal = data.result.enfant;
        this.msg = data.result.situation;
        this.years = "2022 : 2025";
        // this.years =
        //   this.years +
        //   (new Date(this.enfantLocal?.dateNaissance).getFullYear() + 13) +
        //   ":" +
        //   new Date().getFullYear();
        this.allowNewAddArrestation = data.result.allowNewAddArrestation;
        this.allowNewCarte = data.result.allowNewCarte;
        this.alerte = data.result.alerte;
        if (!this.alerte) {
          this.arrestation = data.result.arrestations[0];
          this.residence = data.result.residence;

          this.documentService
            .calculerNombreDocumentsJudiciairesParDetention(
              this.arrestation.arrestationId.idEnfant,
              this.arrestation.arrestationId.numOrdinale
            )
            .subscribe((data) => {
              if (this.numOrdinalDoc) {
                this.update = false;
                this.numOrdinalDoc = this.numOrdinalDoc;
              } else {
                this.numOrdinalDoc = data.result + 1;
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
              }
            });
        }
      });
  }
  accepter() {
    this.displayNext = false;
    this.nextBoolean = true;
  }
  //------------------------------------------------------------end trouverDetenuAvecSonStatutActuel-----------------------------------------------------------------------------------------------

  changeDate() {
    this.dateEntreLocal = this.datepipe.transform(
      this.dateEntreLocal,
      "yyyy-MM-dd"
    );
  }
  save() {
    if (this.dateEntreLocal && this.numArrestation) {
      this.arrestation = new Arrestation();
      this.arrestationId = new ArrestationId();
      this.residence = new Residence();
      this.residenceId = new ResidenceId();

      this.arrestation.arrestationId = this.arrestationId;

      this.arrestationId.numOrdinale = this.numOrdinale;
      this.arrestationId.idEnfant = this.enfantLocal.id;

      this.arrestation.date = this.dateEntreLocal;
      this.arrestation.enfant = this.enfantLocal;

      this.residence.etablissement = this.currentUser.etablissement;
      this.residence.numArrestation = this.numArrestation;
      this.residenceId.idEnfant = this.enfantLocal.id;

      this.crudservice
        .createLigne("arrestation", this.arrestation)
        .subscribe((data) => {
          this.residenceId.numOrdinaleArrestation =
            data.result.arrestationId.numOrdinale;
          this.residenceId.numOrdinaleResidence = 1;
          this.residence.residenceId = this.residenceId;
          this.residence.arrestation = data.result;
          this.residence.dateEntree = this.dateEntreLocal;
          this.dateEntreLocal = data.result.date;
          this.numOrdinale = data.result.arrestationId.numOrdinale;
          this.crudservice
            .createLigne("residence", this.residence)
            .subscribe((data) => {
              this.residence = data.result;
              this.centre = data.result.etablissement.libelle_etablissement;
              this.numArrestation = data.result.numArrestation;
              this.nextAdd = true;
              this.service.add({
                key: "tst",
                severity: "success",
                summary: "تم إدراج إيقاف جديد بنجاح    ",
                detail: "1",
              });
            });
        });
    } else {
      this.service.add({
        key: "tst",
        severity: "error",
        summary: ".   خطأ    ",
        detail: "تثبت من إدراج المعطيات ",
      });
    }
  }

  addArrestatione() {
    this.centre = this.currentUser.etablissement.libelle_etablissement;

    this.detentionService
      .calculerNombreDetentionsParIdDetenu("arrestation", this.enfantLocal.id)
      .subscribe((data) => {
        this.numOrdinale = data.result + 1;
      });

    this.displayAddArrestation = true;
  }

  nextAddOk() {
    this.search(this.residence.residenceId.idEnfant);
    this.displayAddArrestation = false;
  }

  //--------------------------------------------------------------------------------------------------------------------------

  //------------------------------------------------------------tribunal 1-----------------------------------------------------------------------------------------------

  displayTribunal1: boolean;

  @Input()
  tribunal1 = "";
  @Input()
  codeTribunal1 = "";
  @Input()
  numAffaireT1: number;
  @Input()
  tribunal1Objet: Tribunal;

  showListTribunal1() {
    if (this.update == true) {
      this.displayTribunal1 = true;
    }
  }
  saveTribunal1(tribunal) {
    this.tribunal1 = tribunal.nom_tribunal;
    this.codeTribunal1 = tribunal.id;
    this.tribunal1Objet = tribunal;
    this.displayTribunal1 = false;
  }
  getTribunal1() {
    this.crudservice
      .getLigneById("tribunal", this.codeTribunal1)
      .subscribe((data) => {
        if (data.result != null) {
          this.tribunal1Objet = data.result;

          this.tribunal1 = data.result.nom_tribunal;
        } else {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: "تثبت من رمز المحكمة  ",
          });
          this.tribunal1 = "";
          this.tribunal1Objet = undefined;
        }
      });
  }

  //--------------------------------------------------------------------------------------------------------------------------

  //------------------------------------------------------------tribunal 2-----------------------------------------------------------------------------------------------

  displayTribunal2: boolean;
  @Input()
  tribunal2 = "";
  @Input()
  codeTribunal2 = "";
  @Input()
  numAffaireT2: number;
  @Input()
  tribunal2Objet: Tribunal;

  showListTribunal2() {
    this.displayTribunal2 = true;
  }
  saveTribunal2(tribunal) {
    this.tribunal2 = tribunal.nom_tribunal;
    this.codeTribunal2 = tribunal.id;
    this.tribunal2Objet = tribunal;
    this.displayTribunal2 = false;
  }

  getTribunal2() {
    this.crudservice
      .getLigneById("tribunal", this.codeTribunal2)
      .subscribe((data) => {
        if (data.result != null) {
          this.tribunal2Objet = data.result;

          this.tribunal2 = data.result.nom_tribunal;
        } else {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: "تثبت من رمز المحكمة  ",
          });
          this.tribunal2 = "";
          this.tribunal2Objet = undefined;
        }
      });
  }

  //--------------------------------------------------------------------------------------------------------------------------

  //------------------------------------------------------------tribunal 3-----------------------------------------------------------------------------------------------

  displayTribunal3: boolean;
  tribunal3 = "";
  codeTribunal3 = "";

  numAffaireT3: number;
  tribunal3Objet: Tribunal;

  showListTribunal3() {
    this.displayTribunal3 = true;
  }
  saveTribunal3(tribunal) {
    this.tribunal3 = tribunal.nom_tribunal;
    this.codeTribunal3 = tribunal.id;
    this.tribunal3Objet = tribunal;
    this.displayTribunal3 = false;
  }
  getTribunal3() {
    this.crudservice
      .getLigneById("tribunal", this.codeTribunal3)
      .subscribe((data) => {
        if (data.result != null) {
          this.tribunal3 = data.result.nom_tribunal;
        } else {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: "تثبت من رمز المحكمة  ",
          });
          this.tribunal3 = "";
        }
      });
  }

  //--------------------------------------------------------------------------------------------------------------------------

  showListAffaireOrigine() {
    this.displayAfferOrigine = true;
  }

  saveAffaireOrigine(affaireOrigine: Affaire) {
    this.tribunal1 = affaireOrigine.tribunal.nom_tribunal;
    this.codeTribunal1 = affaireOrigine.tribunal.id;

    this.numAffaireT1 = affaireOrigine.affaireId.numAffaire;
    this.tribunal1Objet = affaireOrigine.tribunal;
    this.affaireOrigine = affaireOrigine;
    this.displayAfferOrigine = false;
  }

  deleteOrigine() {
    this.tribunal1 = "";
    this.codeTribunal1 = "";
    this.tribunal1Objet = null;
    this.numAffaireT1 = null;

    this.affaireOrigine = null;
  }

  showListAffaireLier() {
    this.displayAfferLier = true;
  }

  saveAffaireLier(affaireLien: Affaire) {
    this.tribunal2 = affaireLien.tribunal.nom_tribunal;
    this.codeTribunal2 = affaireLien.tribunal.id;

    this.numAffaireT2 = affaireLien.affaireId.numAffaire;
    this.tribunal2Objet = affaireLien.tribunal;
    this.affaireLien = affaireLien;
    this.displayAfferLier = false;
  }

  deleteLier() {
    this.tribunal2 = "";
    this.codeTribunal2 = "";
    this.tribunal2Objet = null;
    this.numAffaireT2 = null;

    this.affaireLien = null;
  }

  showListAffaireAffecter() {
    this.displayAfferAffecter = true;
  }

  saveAffaireAffecter(affaireAffecter: Affaire) {
    console.log(affaireAffecter);
    this.tribunal3 = affaireAffecter.tribunal.nom_tribunal;
    this.codeTribunal3 = affaireAffecter.tribunal.id;
    this.numAffaireT3 = affaireAffecter.affaireId.numAffaire;
    this.tribunal3Objet = affaireAffecter.tribunal;
    this.affaireAffecter = affaireAffecter;
    this.displayAfferAffecter = false;
  }

  deleteAffecter() {
    this.tribunal3 = "";
    this.codeTribunal3 = "";

    this.numAffaireT3 = null;

    this.affaireAffecter = null;
  }

  //------------------------------------------------------------type affaire-----------------------------------------------------------------------------------------------

  displayTypeAffaire: boolean;
  @Input()
  codeTypeAffaire = "";
  @Input()
  typeAffaire = "";

  findTitreAccusationByIdTypeAffaire(id: number) {
    this.entitiesTitreAccusation = [];
    this.crudservice
      .trouverTitresAccusationsParIdTypeAffaire(id)
      .subscribe((data) => {
        this.entitiesTitreAccusation = data.result;
      });
  }

  showListTypeAffaire() {
    this.displayTypeAffaire = true;
  }
  saveTypeAffaire(typeAffaire) {
    this.typeAffaire = typeAffaire.libelle_typeAffaire;
    this.codeTypeAffaire = typeAffaire.id;
    this.typeAffaireObjet = typeAffaire;
    this.displayTypeAffaire = false;
    this.findTitreAccusationByIdTypeAffaire(typeAffaire.id);
  }
  getTypeAffaire() {
    this.crudservice
      .getLigneById("typeAffaire", this.codeTypeAffaire)
      .subscribe((data) => {
        if (data.result != null) {
          this.typeAffaire = data.result.libelle_typeAffaire;
          this.typeAffaireObjet = data.result;
          this.findTitreAccusationByIdTypeAffaire(data.result.id);
        } else {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: "تثبت من رمز نوع القضية",
          });
          this.typeAffaire = "";
        }
      });
  }

  //-------------------------------------------------------------------------------------------------------------------------------------------------------------

  //------------------------------------------------------------type juge-----------------------------------------------------------------------------------------------
  displayTypeJuge: boolean;
  @Input()
  typeJuge = "";
  @Input()
  codeTypeJuge = "";

  showListTypeJuge() {
    this.displayTypeJuge = true;
  }
  saveTypeJuge(typeJuge) {
    this.typeJuge = typeJuge.libelle_typeJuge;
    this.codeTypeJuge = typeJuge.id;
    this.typeJugeObjet = typeJuge;
    this.displayTypeJuge = false;
  }
  getTypeJuge() {
    this.crudservice
      .getLigneById("typeJuge", this.codeTypeJuge)
      .subscribe((data) => {
        if (data.result != null) {
          this.typeJuge = data.result.libelle_typeJuge;
          this.typeJugeObjet = data.result;
        } else {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: "تثبت من رمز نوع الحكم",
          });
          this.typeJuge = "";
        }
      });
  }

  //--------------------------------------------------------------------------------------------------------------------------

  // ------------------------------------------------------------Arret Provisoire-----------------------------------------------------------------------------------------------
  displayArretProvisoire: boolean;
  @Input()
  entitiesArretProvisoire: ArretProvisoire[] = [];

  arretProvisoireLocal: ArretProvisoire;
  showArretProvisoire() {
    this.displayArretProvisoire = true;
  }

  onSubmitArretProvisoireForm(arretProvisoireForm: any) {
    this.displayArretProvisoire = false;
    this.arretProvisoireLocal = new ArretProvisoire();
    // Formater les dates
    this.arretProvisoireLocal.dateDebut = this.formatDate(
      arretProvisoireForm.dateDebut
    );
    this.arretProvisoireLocal.dateFin = this.formatDate(
      arretProvisoireForm.dateFin
    );

    const dateDebut = new Date(this.arretProvisoireLocal.dateDebut);
    const dateFin = new Date(this.arretProvisoireLocal.dateFin);

    // Validation des dates
    if (!this.validateDates(dateDebut, dateFin)) {
      return;
    }

    // Calculer la différence de dates
    this.calculateDateDiff(dateDebut, dateFin);
    this.entitiesArretProvisoire.push(this.arretProvisoireLocal);
    this.updateTotalDays();
    this.arretProvisoireForm.reset(); // Réinitialiser le formulaire
  }

  private formatDate(date: any): string {
    return this.datepipe.transform(date, "yyyy-MM-dd");
  }

  private validateDates(dateDebut: Date, dateFin: Date): boolean {
    if (dateFin < dateDebut) {
      this.showError("تاريخ النهاية أصغر من تاريخ البداية");
      return false;
    }

    if (
      this.entitiesArretProvisoire.length > 0 &&
      dateDebut <
        new Date(
          this.entitiesArretProvisoire[
            this.entitiesArretProvisoire.length - 1
          ].dateFin
        )
    ) {
      this.showError("تاريخ البداية أصغر من تاريخ النهاية");
      return false;
    }

    return true;
  }

  // private showError(detail: string) {
  //   this.service.add({
  //     key: "tst",
  //     severity: "error",
  //     summary: ".   خطأ    ",
  //     detail: detail,
  //   });
  // }

  private calculateDateDiff(dateDebut: Date, dateFin: Date) {
    const diffTime = dateFin.getTime() - dateDebut.getTime();
    const daysDiff = diffTime / (1000 * 3600 * 24) + 1;

    this.arretProvisoireLocal.jour = Math.floor(daysDiff % 30);
    this.arretProvisoireLocal.mois = Math.floor((daysDiff % 365) / 30);
    this.arretProvisoireLocal.annee = Math.floor(daysDiff / 365);
    this.arretProvisoireLocal.daysDiff = daysDiff;
  }

  private updateTotalDays() {
    this.daysDiffArretProvisoire += this.arretProvisoireLocal.daysDiff;

    this.anneeArretProvisoire = Math.floor(this.daysDiffArretProvisoire / 365);
    this.moisArretProvisoire = Math.floor(
      (this.daysDiffArretProvisoire % 365) / 30
    );
    this.jourArretProvisoire = Math.floor(
      (this.daysDiffArretProvisoire % 365) % 30
    );
  }

  deletArretProvisoire(row: ArretProvisoire) {
    this.entitiesArretProvisoire = this.entitiesArretProvisoire.filter(
      (u) => u !== row
    );
    this.daysDiffArretProvisoire = this.daysDiffArretProvisoire - row.daysDiff;

    this.anneeArretProvisoire = Math.floor(this.daysDiffArretProvisoire / 365);
    this.moisArretProvisoire = Math.floor(
      (this.daysDiffArretProvisoire % 365) / 30
    );
    this.jourArretProvisoire = Math.floor(
      (this.daysDiffArretProvisoire % 365) % 30
    );
  }
  //--------------------------------------------------------------------------------------------------------------------------

  //------------------------------------------------------------Accusation-----------------------------------------------------------------------------------------------

  displayAccusation: boolean;
  @Input()
  accusationCarteRecups: AccusationCarteRecup[] = [];
  accusationLocal: AccusationCarteRecup;
  accusationsToAdd: SelectItem[];
  accusationsToAddValue: any;

  showAccusation() {
    if (this.accusationCarteRecups) {
      if (this.accusationCarteRecups.length == 0) {
        this.dateDebutGlobale = null;
      }
    } else {
      this.accusationCarteRecups = [];
    }

    this.displayAccusation = true;
  }

  onSubmitAccusationForm(p: object) {
    this.accusationLocal = this.accusationForm.value;

    this.accusationLocal.numOridinel = this.accusationCarteRecups.length + 1;
    if (this.accusationsToAddValue) {
      this.accusationLocal.numOridinelLiee = this.accusationsToAddValue;
      this.accusationLocal.dateDebut = this.datepipe.transform(
        this.accusationCarteRecups[this.accusationCarteRecups.length - 1]
          .dateFin,
        "yyyy-MM-dd"
      );
      this.accusationLocal.dateFin = this.datepipe.transform(
        this.accusationCarteRecups[this.accusationCarteRecups.length - 1]
          .dateFin,
        "yyyy-MM-dd"
      );
    } else {
      // this.dateDebutGlobale =this.reglerDate(this.dateDebutGlobale);
      this.dateDebutGlobale = this.datepipe.transform(
        this.dateDebutGlobale,
        "yyyy-MM-dd"
      );
      if (!this.dateDebutGlobale) {
        this.dateFinGlobale = null;
      }

      //-----------------------------------------------------

      this.daysDiffJuge =
        this.daysDiffJuge +
        (this.accusationLocal.jour * 1 +
          this.accusationLocal.mois * 30 +
          this.accusationLocal.annee * 365);

      this.anneeJuge = Math.floor(this.daysDiffJuge / 365);
      this.moisJuge = Math.floor((this.daysDiffJuge % 365) / 30);
      this.jourJuge = Math.floor((this.daysDiffJuge % 365) % 30);

      this.jourPenal = this.jourPenal + this.accusationLocal.jour;

      this.moisPenal = this.moisPenal + this.accusationLocal.mois;
      this.moisPenal = this.moisPenal + Math.floor(this.jourPenal / 30) * 1;

      this.jourPenal =
        this.jourPenal - Math.floor((this.jourPenal % 365) / 30) * 30;
      this.jourPenal = this.jourPenal - Math.floor(this.jourPenal / 365) * 365;

      this.anneePenal =
        this.anneePenal + Math.floor(this.accusationLocal.annee);

      this.anneePenal = this.anneePenal + Math.floor(this.moisPenal / 12);
      this.moisPenal = this.moisPenal - Math.floor(this.moisPenal / 12) * 12;

      if (this.dateDebutGlobale) {
        if (this.accusationCarteRecups.length >= 1) {
          this.accusationLocal.dateDebut = this.datepipe.transform(
            this.accusationCarteRecups[this.accusationCarteRecups.length - 1]
              .dateFin,
            "yyyy-MM-dd"
          );
        } else {
          this.accusationLocal.dateDebut = this.datepipe.transform(
            this.dateDebutGlobale,
            "yyyy-MM-dd"
          );
        }

        this.affaireService
          .calculerDateFin(this.dateDebutGlobale + "", this.daysDiffJuge)
          .subscribe((data) => {
            if (data.result != null) {
              this.dateFinGlobale = data.result;
              this.accusationLocal.dateFin = this.datepipe.transform(
                this.dateFinGlobale,
                "yyyy-MM-dd"
              );
            } else {
              this.service.add({
                key: "tst",
                severity: "error",
                summary: ".   خطأ    ",
                detail: "تثبت        ",
              });
              this.typeAffaire = "";
            }
          });
      }
    }

    this.accusationLocal.titreAccusation = this.titreAccusationLocal;

    this.accusationCarteRecups.push(this.accusationLocal);
    if (!this.accusationLocal.numOridinelLiee) {
      this.accusationsToAdd.push({
        label:
          this.accusationCarteRecups.indexOf(this.accusationLocal) + 1 + "",
        value: this.accusationCarteRecups.indexOf(this.accusationLocal) + 1,
      });
    }
    this.accusationsToAddValue = null;

    if (this.accusationCarteRecups.length == 1) {
      this.entitiesTitreAccusation = [];
      this.crudservice.getlistEntity("titreAccusation").subscribe((data) => {
        this.entitiesTitreAccusation = data.result;

        this.entitiesTitreAccusation = this.entitiesTitreAccusation.filter(
          (u) => u.id !== this.accusationLocal.titreAccusation.id
        );
      });
    }

    this.entitiesTitreAccusation = this.entitiesTitreAccusation.filter(
      (u) => u.id !== this.titreAccusationLocal.id
    );
    this.titreAccusationLocal = null;

    this.displayAccusation = false;
    this.accusationForm.reset();
  }

  deletAccusation(row: Accusation) {
    this.accusationCarteRecups = this.accusationCarteRecups.filter(
      (u) => u !== row
    );
    if (!row.numOridinelLiee) {
      this.accusationsToAdd = this.accusationsToAdd.filter(
        (u) => u.value !== row.numOridinel
      );
    }

    if (this.entitiesTitreAccusation.length) {
      this.entitiesTitreAccusation.push(row.titreAccusation);
    }

    if (!row.numOridinelLiee) {
      this.daysDiffJuge =
        this.daysDiffJuge - (row.jour * 1 + row.mois * 30 + row.annee * 365);

      this.anneeJuge = Math.floor(this.daysDiffJuge / 365);
      this.moisJuge = Math.floor((this.daysDiffJuge % 365) / 30);
      this.jourJuge = Math.floor((this.daysDiffJuge % 365) % 30);

      this.jourPenal = this.jourPenal - row.jour;

      this.moisPenal = this.moisPenal - row.mois;
      this.moisPenal = this.moisPenal + Math.floor(this.jourPenal / 30) * 1;

      this.jourPenal =
        this.jourPenal - Math.floor((this.jourPenal % 365) / 30) * 30;
      this.jourPenal = this.jourPenal - Math.floor(this.jourPenal / 365) * 365;

      this.anneePenal = this.anneePenal - Math.floor(row.annee);

      this.anneePenal = this.anneePenal + Math.floor(this.moisPenal / 12);
      this.moisPenal = this.moisPenal - Math.floor(this.moisPenal / 12) * 12;

      this.affaireService
        .calculerDateFin(this.dateDebutGlobale + "", this.daysDiffJuge)
        .subscribe((data) => {
          if (data.result != null) {
            this.dateFinGlobale = data.result;
          } else {
            this.service.add({
              key: "tst",
              severity: "error",
              summary: ".   خطأ    ",
              detail: "تثبت        ",
            });
            this.typeAffaire = "";
          }
        });
    }

    // importanttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt
    //  if(this.typeAffaireObjet && this.entitiesAccusation.length==0){
    //   this.findTitreAccusationByIdTypeAffaire(this.typeAffaireObjet.id);
    //  }
  }

  // onSubmit() {
  //   this.alertTypeAffaire = "";
  //   if (this.typeJugeObjet.id == 12 && !this.affaireAffecter) {
  //     this.service.add({
  //       key: "tst",
  //       severity: "error",
  //       summary: ".   خطأ    ",
  //       detail: " عليك تثبت الرجاء إدراج قضية الضم     ",
  //     });
  //   } else {
  //     if (
  //       !this.dateEmission ||
  //       !this.dateDepotCarte ||
  //       !this.typeAffaireObjet ||
  //       !this.typeJugeObjet ||
  //       this.accusationCarteRecups.length == 0
  //     ) {
  //       this.service.add({
  //         key: "tst",
  //         severity: "error",
  //         summary: ".   خطأ    ",
  //         detail: " عليك تثبت     ",
  //       });
  //     } else {
  //       const found = this.accusationCarteRecups.some(
  //         (accusation) =>
  //           accusation.titreAccusation.typeAffaire.id ===
  //           this.typeAffaireObjet.id
  //       );

  //       if (found) {
  //         const maxObj = this.accusationCarteRecups.reduce((max, obj) =>
  //           max.titreAccusation.typeAffaire.statutException >
  //           obj.titreAccusation.typeAffaire.statutException
  //             ? max
  //             : obj
  //         );

  //         if (
  //           maxObj.titreAccusation.typeAffaire.id !== this.typeAffaireObjet.id
  //         ) {
  //           this.alertTypeAffaire = `ربما نوع القضية ${maxObj.titreAccusation.typeAffaire.libelle_typeAffaire}!!`;
  //         }

  //         this.dateDepotCarte = this.datepipe.transform(
  //           this.dateDepotCarte,
  //           "yyyy-MM-dd"
  //         );

  //         this.dateEmission = this.datepipe.transform(
  //           this.dateEmission,
  //           "yyyy-MM-dd"
  //         );

  //         this.documentId = new DocumentId();

  //         this.documentId.idEnfant = this.enfantLocal.id;

  //         this.documentId.numOrdinalArrestation =
  //           this.arrestation.arrestationId.numOrdinale;

  //         this.documentId.numOrdinalAffaire =
  //           this.affaireOrigine.numOrdinalAffaire;

  //         this.documentId.numOrdinalDoc = this.numOrdinalDoc;

  //         //cette contion utile dans update
  //         if (this.numOrdinalDocByAffaire) {
  //           this.documentId.numOrdinalDocByAffaire =
  //             this.numOrdinalDocByAffaire;
  //         }

  //         this.carteRecup = new CarteRecup();
  //         this.carteRecup.documentId = this.documentId;

  //         this.carteRecup.affaire = this.affaireOrigine;

  //         this.carteRecup.dateDepotCarte = this.dateDepotCarte;
  //         this.carteRecup.dateEmission = this.dateEmission;
  //         this.carteRecup.textJugement = this.textJugement;
  //         this.carteRecup.typeAffaire = this.typeAffaireObjet;
  //         this.carteRecup.typeJuge = this.typeJugeObjet;
  //         this.carteRecup.daysDiffJuge = this.daysDiffJuge;
  //         this.carteRecup.annee = this.anneePenal;
  //         this.carteRecup.mois = this.moisPenal;
  //         this.carteRecup.jour = this.jourPenal;
  //         this.carteRecup.daysDiffArretProvisoire =
  //           this.daysDiffArretProvisoire;
  //         this.carteRecup.anneeArretProvisoire = this.anneeArretProvisoire;
  //         this.carteRecup.moisArretProvisoire = this.moisArretProvisoire;
  //         this.carteRecup.jourArretProvisoire = this.jourArretProvisoire;
  //         this.carteRecup.numArrestation = this.residence.numArrestation;
  //         this.carteRecup.etablissement = this.residence.etablissement;
  //         this.carteRecup.personelle = this.token.getUserFromTokenFromToken().personelle;

  //         this.carteRecup.dateInsertion = this.datepipe.transform(
  //           new Date(),
  //           "yyyy-MM-dd"
  //         );

  //         this.carteRecup.dateDebutPunition = this.dateDebutGlobale;

  //         if (this.carteRecup.typeJuge.id == 4) {
  //           //-------------------------- adulte
  //           var dateAdulte = new Date(
  //             this.datepipe.transform(
  //               this.enfantLocal.dateNaissance,
  //               "yyyy-MM-dd"
  //             )
  //           );

  //           this.carteRecup.dateFinPunition = this.datepipe.transform(
  //             new Date(
  //               dateAdulte.getFullYear() + 18,
  //               dateAdulte.getMonth(),
  //               dateAdulte.getDate()
  //             ),
  //             "yyyy-MM-dd"
  //           );
  //           //-------------------------- adulte
  //         } else {
  //           //--------------------------no adulte

  //           this.affaireService
  //             .calculerDateFin(
  //               this.dateDebutGlobale + "",
  //               this.daysDiffJuge - this.daysDiffArretProvisoire
  //             )
  //             .subscribe((data) => {
  //               if (data.result != null) {
  //                 this.carteRecup.dateFinPunition = data.result;

  //                 if (this.carteRecup.typeJuge.situation == "nonCal") {
  //                   this.carteRecup.dateFinPunition =
  //                     this.carteRecup.dateDepotCarte;
  //                 } else {
  //                   if (
  //                     new Date(this.carteRecup.dateFinPunition) <=
  //                     new Date(this.carteRecup.dateDebutPunition)
  //                   ) {
  //                     if (
  //                       new Date(this.carteRecup.dateFinPunition) <
  //                       new Date(this.carteRecup.dateDepotCarte)
  //                     ) {
  //                       this.carteRecup.dateFinPunition =
  //                         this.carteRecup.dateDepotCarte;
  //                     } else {
  //                       this.carteRecup.dateFinPunition =
  //                         this.carteRecup.dateDebutPunition;
  //                     }
  //                   }
  //                 }
  //               } else {
  //                 this.service.add({
  //                   key: "tst",
  //                   severity: "error",
  //                   summary: ".   خطأ    ",
  //                   detail: "تثبت        ",
  //                 });
  //               }
  //             });
  //           //--------------------------no adulte
  //         }

  //         this.carteRecup.accusationCarteRecups = this.accusationCarteRecups;
  //         this.carteRecup.arretProvisoires = this.entitiesArretProvisoire;

  //         this.showCarteRecup = true;
  //         console.log(this.carteRecup);
  //       } else {
  //         this.service.add({
  //           key: "tst",
  //           severity: "error",
  //           summary: ".   خطأ    ",
  //           detail: "      نوع القضية مختلف عن التهم   ",
  //         });
  //       }
  //     }
  //   }
  // }

  // ------------------------ debut  code onSubmit -----------------
  onSubmit() {
    this.alertTypeAffaire = "";

    if (this.typeJugeObjet.id === 12 && !this.affaireAffecter) {
      this.showError("عليك تثبت الرجاء إدراج قضية الضم");
      return;
    }

    if (this.isAnyRequiredFieldEmpty()) {
      this.showError("عليك تثبت");
      return;
    }

    const found = this.accusationCarteRecups.some(
      (accusation) =>
        accusation.titreAccusation.typeAffaire.id === this.typeAffaireObjet.id
    );

    if (!found) {
      this.showError("نوع القضية مختلف عن التهم");
      return;
    }

    const maxObj = this.getMaxStatutException();
    if (maxObj.titreAccusation.typeAffaire.id !== this.typeAffaireObjet.id) {
      this.alertTypeAffaire = `ربما نوع القضية ${maxObj.titreAccusation.typeAffaire.libelle_typeAffaire}!!`;
    }

    this.prepareDates();

    this.documentId = this.createDocumentId();
    this.carteRecup = this.createCarteRecup();

    if (this.carteRecup.typeJuge.id === 4) {
      this.setDateFinPunitionForAdult();
    } else {
      this.calculateDateFinForNonAdult();
    }

    this.carteRecup.accusationCarteRecups = this.accusationCarteRecups;
    this.carteRecup.arretProvisoires = this.entitiesArretProvisoire;

    this.showCarteRecup = true;
    console.log(this.carteRecup);
  }

  private showError(message: string) {
    this.service.add({
      key: "tst",
      severity: "error",
      summary: ".   خطأ    " + message,
      detail: message,
    });
  }

  private isAnyRequiredFieldEmpty(): boolean {
    return (
      !this.dateEmission ||
      !this.dateDepotCarte ||
      !this.typeAffaireObjet ||
      !this.typeJugeObjet ||
      this.accusationCarteRecups.length === 0
    );
  }

  private getMaxStatutException() {
    return this.accusationCarteRecups.reduce((max, obj) =>
      max.titreAccusation.typeAffaire.statutException >
      obj.titreAccusation.typeAffaire.statutException
        ? max
        : obj
    );
  }

  private prepareDates() {
    this.dateDepotCarte = this.datepipe.transform(
      this.dateDepotCarte,
      "yyyy-MM-dd"
    );
    this.dateEmission = this.datepipe.transform(
      this.dateEmission,
      "yyyy-MM-dd"
    );
  }

  private createDocumentId(): DocumentId {
    const documentId = new DocumentId();
    documentId.idEnfant = this.enfantLocal.id;
    documentId.numOrdinalArrestation =
      this.arrestation.arrestationId.numOrdinale;
    documentId.numOrdinalAffaire = this.affaireOrigine.numOrdinalAffaire;
    documentId.numOrdinalDoc = this.numOrdinalDoc;

    if (this.numOrdinalDocByAffaire) {
      documentId.numOrdinalDocByAffaire = this.numOrdinalDocByAffaire;
    }

    return documentId;
  }

  private createCarteRecup(): CarteRecup {
    const carteRecup = new CarteRecup();
    carteRecup.documentId = this.documentId;
    carteRecup.affaire = this.affaireOrigine;
    carteRecup.dateDepotCarte = this.dateDepotCarte;
    carteRecup.dateEmission = this.dateEmission;
    carteRecup.textJugement = this.textJugement;
    carteRecup.typeAffaire = this.typeAffaireObjet;
    carteRecup.typeJuge = this.typeJugeObjet;
    carteRecup.daysDiffJuge = this.daysDiffJuge;
    carteRecup.annee = this.anneePenal;
    carteRecup.mois = this.moisPenal;
    carteRecup.jour = this.jourPenal;
    carteRecup.daysDiffArretProvisoire = this.daysDiffArretProvisoire;
    carteRecup.anneeArretProvisoire = this.anneeArretProvisoire;
    carteRecup.moisArretProvisoire = this.moisArretProvisoire;
    carteRecup.jourArretProvisoire = this.jourArretProvisoire;
    carteRecup.numArrestation = this.residence.numArrestation;
    carteRecup.etablissement = this.residence.etablissement;
    //carteRecup.user = this.token.getUserFromTokenFromToken();
    carteRecup.dateInsertion = this.datepipe.transform(
      new Date(),
      "yyyy-MM-dd"
    );
    carteRecup.dateDebutPunition = this.dateDebutGlobale;

    return carteRecup;
  }

  private setDateFinPunitionForAdult() {
    const dateAdulte = new Date(
      this.datepipe.transform(this.enfantLocal.dateNaissance, "yyyy-MM-dd")
    );
    this.carteRecup.dateFinPunition = this.datepipe.transform(
      new Date(
        dateAdulte.getFullYear() + 18,
        dateAdulte.getMonth(),
        dateAdulte.getDate()
      ),
      "yyyy-MM-dd"
    );
  }

  private calculateDateFinForNonAdult() {
    this.affaireService
      .calculerDateFin(
        this.dateDebutGlobale + "",
        this.daysDiffJuge - this.daysDiffArretProvisoire
      )
      .subscribe((data) => {
        if (data.result != null) {
          this.carteRecup.dateFinPunition = data.result;
          this.adjustDateFinPunition();
        } else {
          this.showError("تثبت");
        }
      });
  }

  private adjustDateFinPunition() {
    if (this.carteRecup.typeJuge.situation === "nonCal") {
      this.carteRecup.dateFinPunition = this.carteRecup.dateDepotCarte;
    } else if (
      new Date(this.carteRecup.dateFinPunition) <=
      new Date(this.carteRecup.dateDebutPunition)
    ) {
      this.carteRecup.dateFinPunition =
        new Date(this.carteRecup.dateFinPunition) <
        new Date(this.carteRecup.dateDepotCarte)
          ? this.carteRecup.dateDepotCarte
          : this.carteRecup.dateDebutPunition;
    }
  }

  //-------------------------- fin code onSubmit --------------------
  confirmer() {
    console.log("this.carteRecup = ");
    console.log(this.carteRecup);
    this.crudservice
      .createLigne("carteRecup", this.carteRecup)
      .subscribe((data) => {});

    this.isSaved = true;
    this.isExist = false;
    this.showCarteRecup = false;
  }
  next() {
    // this.carteRecup = new CarteRecup();
    if (this.isLoading) return; // Ne rien faire si déjà en cours

    this.isLoading = true; // Désactiver le bouton
    if (
      !this.tribunal1Objet ||
      !this.numAffaireT1 ||
      (!this.tribunal2Objet && this.numAffaireT2) ||
      (this.tribunal2Objet && !this.numAffaireT2)
    ) {
      this.service.add({
        key: "tst",
        severity: "error",
        summary: ".   خطأ    ",
        detail: " عليك تثبت     ",
      });
    } else {
      this.affaireIdOrigine = new AffaireId();
      this.affaireIdOrigine.idEnfant = this.enfantLocal.id;
      this.affaireIdOrigine.idTribunal = this.tribunal1Objet.id;
      this.affaireIdOrigine.numAffaire = this.numAffaireT1;

      this.affaireOrigine = new Affaire();
      this.affaireOrigine.arrestation = this.arrestation;
      this.affaireOrigine.tribunal = this.tribunal1Objet;
      this.affaireOrigine.affaireId = this.affaireIdOrigine;

      let affaireData = new AffaireData();
      let verifierAffaire: VerifierAffaire;
      affaireData.idEnfant = this.enfantLocal.id;
      affaireData.numAffaire1 = this.numAffaireT1;
      affaireData.tribunal1 = this.tribunal1Objet;
      affaireData.numAffaire2 = this.numAffaireT2;
      affaireData.tribunal2 = this.tribunal2Objet;
      affaireData.numAffaire3 = this.numAffaireT3;
      affaireData.tribunal3 = this.tribunal3Objet;
      affaireData.affaireOrigine = this.affaireOrigine;
      affaireData.arrestation = this.arrestation;
      console.log(affaireData);
      this.affaireService.validerAffaire(affaireData).subscribe((data) => {
        verifierAffaire = data.result;
        this.affaireOrigine = verifierAffaire.affaire;
        this.nextBoolean = verifierAffaire.nextBoolean;
        this.displayAlertAffaireOrigineLier =
          verifierAffaire.displayAlertAffaireOrigineLier;
        this.displayAlertLienAutre = verifierAffaire.displayAlertLienAutre;
        this.displayAlertLienMeme = verifierAffaire.displayAlertLienMeme;
        this.displayAlertOrigineExistAvecLien =
          verifierAffaire.displayAlertOrigineExistAvecLien;
        this.displayAlertOrigineExistSansLien =
          verifierAffaire.displayAlertOrigineExistSansLien;
        this.displayAlertAffaireLienLier =
          verifierAffaire.displayAlertAffaireLienLier;
        this.displayAlertLienAutreArrestation =
          verifierAffaire.displayAlertLienAutreArrestation;
        this.displayNext = verifierAffaire.displayNext;
        this.isLoading = false;

        //--------------- debut  traitement de affaire affecter ------------------//
        this.affaireOrigine;
        //--------------- debut  traitement de affaire affecter ------------------//
      });
    }
  }
  lienException() {
    this.tribunal2Objet = null;
    this.numAffaireT2 = null;
    this.tribunal2 = "";
    this.codeTribunal2 = "";
  }

  return() {
    this.nextBoolean = false;
  }
  chargerDropDownListGouv() {
    this.crudservice.getlistEntity("gouvernorat").subscribe((data) => {
      this.gouvernorats = [];
      data.result.forEach((gouvernorat: Gouvernorat, value: any) => {
        this.gouvernorats.push({
          label: gouvernorat.libelle_gouvernorat,
          value: gouvernorat,
        });
      });
    });
  }

  chargerDropDownListTypeTribunal() {
    this.crudservice.getlistEntity("typeTribunal").subscribe((data) => {
      this.typeTribunals = [];
      data.result.forEach((typeTribunal: TypeTribunal, value: any) => {
        this.typeTribunals.push({
          label: typeTribunal.libelleTypeTribunal,
          value: typeTribunal,
        });
      });
    });
  }
  chargerDropDownListTribunal() {
    this.crudservice.getlistEntity("tribunal").subscribe((data) => {
      this.entitiesTribunal = data.result;
      this.entitiesTribunalLien = data.result;
      this.entitiesTribunalAff = data.result;
    });
  }

  onChangeGouvernorat(gouvernort: Gouvernorat) {
    this.idGouv = gouvernort.id;
    this.crudservice
      .chercherTribunalParGouvernoratEtTypeTribunal(this.idGouv, this.idType)
      .subscribe((data) => {
        console.log(this.idGouv);
        console.log(this.idType);
        this.entitiesTribunal = [];
        if (data.result == null) {
          this.entitiesTribunal = [];
        } else {
          this.entitiesTribunal = data.result;
        }
        console.log(data.result);
      });
  }

  onChangeTypeTribunal(typeTribunal: TypeTribunal) {
    this.idType = typeTribunal.id;
    this.crudservice
      .chercherTribunalParGouvernoratEtTypeTribunal(this.idGouv, this.idType)
      .subscribe((data) => {
        console.log(this.idGouv);
        console.log(this.idType);
        this.entitiesTribunal = [];
        if (data.result == null) {
          this.entitiesTribunal = [];
        } else {
          this.entitiesTribunal = data.result;
        }

        console.log(data.result);
      });
  }
}
