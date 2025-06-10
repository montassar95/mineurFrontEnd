import { DatePipe } from "@angular/common";
import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService, SelectItem } from "primeng";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { EventService } from "src/app/demo/service/eventservice";
import { NodeService } from "src/app/demo/service/nodeservice";
import { AccusationCarteHeber } from "src/app/domain/accusationCarteHebergement";
import { AccusationCarteHeberId } from "src/app/domain/accusationCarteHebergementId";
import { Affaire } from "src/app/domain/affaire";
import { AffaireId } from "src/app/domain/affaireId";
import { Arrestation } from "src/app/domain/arrestation";
import { ArrestationId } from "src/app/domain/arrestationId";
import { CarteHeber } from "src/app/domain/carteHebergement";
import { DocumentId } from "src/app/domain/documentId";
import { Enfant } from "src/app/domain/enfant";
import { Gouvernorat } from "src/app/domain/gouvernorat";
import { ResidenceId } from "src/app/domain/residanceId";
import { Residence } from "src/app/domain/residence";
import { TitreAccusation } from "src/app/domain/titreAccusation";
import { Tribunal } from "src/app/domain/tribunal";
import { TypeAffaire } from "src/app/domain/typeAffaire";
import { TypeTribunal } from "src/app/domain/typeTribunal";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { AffaireData } from "src/app/domain/affaireData";
import { VerifierAffaire } from "src/app/domain/verifierAffaire";
import { AppConfigService } from "../app-config.service";
import { DocumentService } from "src/app/demo/service/document.service";
import { AffaireService } from "src/app/demo/service/affaire.service";
import { DetentionService } from "src/app/demo/service/detention.service";

@Component({
  selector: "app-carte-hebergement",
  templateUrl: "./carte-hebergement.component.html",
  styleUrls: ["./carte-hebergement.component.css"],
  providers: [MessageService, ConfirmationService],
})
export class CarteHebergementComponent implements OnInit {
  alertTypeAffaire = "";
  affaires: Affaire[];
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

  enfantLocal: Enfant;
  nextBoolean: boolean;

  @Input()
  carteHeber: CarteHeber;

  entitiesTribunal: Tribunal[];
  entitiesTypeAffaire: TypeAffaire[];
  displayImg: boolean;

  @Input()
  entitiesTitreAccusation: TitreAccusation[];

  entitiesAllTitreAccusation: TitreAccusation[];
  displayAllTitreAccusation = false;

  showCarteHeber = false;

  @Input()
  update = true;
  isExist = false;
  isSaved = false;
  msg = "";
  arrestation: any;

  residence: Residence;

  numOrdinalDoc: number;

  msgAlert = "aaaa";
  displayAlertLienAutre: boolean;
  displayAlertLienMeme: boolean;
  displayAlertAffaireOrigineLier: boolean;
  displayAlertAffaireLienLier: boolean;
  displayAlertLienAutreArrestation: boolean;
  displayAlertOrigineExistAvecLien: boolean;
  displayAlertOrigineExistSansLien: boolean;
  position: string;

  faux = false;
  years = "";

  affaireOrigine: Affaire;
  affaireLien: Affaire;
  affaireJoin: Affaire;

  affaireIdOrigine: AffaireId;
  affaireIdLien: AffaireId;

  displayNext: boolean;

  dateEmission;
  dateDepotCarte;
  documentId: DocumentId;
  accusationCarteHeberId: AccusationCarteHeberId;
  accusationCarteHeber: AccusationCarteHeber;
  @Input()
  accusationCarteHeberes: AccusationCarteHeber[];
  textJugement;
  statEchappesOrlibre: number;
  residenceId: ResidenceId;
  arrestationId: ArrestationId;
  numArrestation = "";
  centre = "";
  numOrdinale = "";
  dateEntreLocal;

  displayAddArrestation: boolean;
  currentUser: any;
  nextAdd = false;

  numDocumentByAffaire: any;
  calendar_ar: any;

  showCarteRecup = false;
  typeTribunalSwich: SelectItem[];
  gouvernoratSwich: SelectItem[];
  typeAffaireSwich: SelectItem[];

  constructor(
    private crudservice: CrudEnfantService,
    private detentionService: DetentionService,
    private documentService: DocumentService,
    private affaireService: AffaireService,
    private formBuilder: FormBuilder,
    private router: Router,
    private eventService: EventService,
    public datepipe: DatePipe,
    private token: TokenStorageService,
    private nodeService: NodeService,
    private service: MessageService,
    private breadcrumbService: BreadcrumbService,
    private appConfigService: AppConfigService
  ) {
    this.breadcrumbService.setItems([
      { label: "الإستقبال", routerLink: ["/"] },

      { label: "القضايا ", routerLink: ["/mineur/Affaire"] },
      { label: "   بطاقات الإيواء" },
      { label: "إدراج" },
    ]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isExist = true;

    this.isSaved = false;

    this.showCarteRecup = false;
    this.nextBoolean = false;

    this.entitiesAllTitreAccusation = [];
    this.crudservice.getlistEntity("titreAccusation").subscribe((data) => {
      this.entitiesAllTitreAccusation = data.result;

      this.entitiesTitreAccusation.forEach((element) => {
        this.entitiesAllTitreAccusation =
          this.entitiesAllTitreAccusation.filter((u) => u.id !== element.id);
      });
    });

    this.documentService
      .trouverDocumentJudiciaireParId(this.carteHeber.documentId)
      .subscribe((data) => {
        this.carteHeber = data.result;
        this.entitiesTitreAccusation = this.carteHeber.titreAccusations;

        this.numOrdinalDoc = this.carteHeber.documentId.numOrdinalDoc;
        this.numDocumentByAffaire =
          this.carteHeber.documentId.numOrdinalDocByAffaire;
        this.textJugement = this.carteHeber.textJugement;
        this.dateEmission = this.carteHeber.dateEmission;
        this.dateEmission = new Date(this.dateEmission);
        this.dateDepotCarte = this.carteHeber.dateDepotCarte;
        this.dateDepotCarte = new Date(this.dateDepotCarte);
        this.codeTypeAffaire = this.carteHeber.typeAffaire.id;

        this.typeAffaire = this.carteHeber.typeAffaire.libelle_typeAffaire;

        this.typeAffaireObjet = this.carteHeber.typeAffaire;

        this.tribunal1 = this.carteHeber.affaire.tribunal.nom_tribunal;
        this.codeTribunal1 = this.carteHeber.affaire.tribunal.id;
        this.numAffaireT1 = this.carteHeber.affaire.affaireId.numAffaire;

        this.tribunal1Objet = this.carteHeber.affaire.tribunal;
      });
  }
  ngOnDestroy() {
    window.localStorage.removeItem("idValide");
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

    this.crudservice.getlistEntity("tribunal").subscribe((data) => {
      console.log(data);
      this.entitiesTribunal = data.result;
    });

    this.crudservice.getlistEntity("typeAffaire").subscribe((data) => {
      console.log(data);
      this.entitiesTypeAffaire = data.result;
    });

    this.crudservice.getlistEntity("titreAccusation").subscribe((data) => {
      this.entitiesAllTitreAccusation = data.result;
    });
    this.entitiesTitreAccusation = [];
    this.entitiesAllTitreAccusation = [];
    this.currentUser = this.token.getUserFromTokenFromToken();
    this.showAllGouvernorat();
    this.showAllTypeTribunal();
    this.showAllTypeAffaire();

    this.calendar_ar = this.appConfigService.calendarConfig;
  }
  saveTitreAccusation(titreAccusation: TitreAccusation) {
    this.entitiesAllTitreAccusation = this.entitiesAllTitreAccusation.filter(
      (u) => u !== titreAccusation
    );
    this.entitiesTitreAccusation.push(titreAccusation);
  }
  deletTitreAccusation(titreAccusation: TitreAccusation) {
    this.entitiesTitreAccusation = this.entitiesTitreAccusation.filter(
      (u) => u !== titreAccusation
    );
    this.entitiesAllTitreAccusation.push(titreAccusation);
  }

  reload() {
    this.enfantLocal = null;
    this.isExist = false;
    this.msg = "";

    //window.location.reload();
  }
  //------------------------------------------------------------enfant-----------------------------------------------------------------------------------------------

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
        this.years = "";
        this.years =
          this.years +
          (new Date(this.enfantLocal?.dateNaissance).getFullYear() + 13) +
          ":" +
          new Date().getFullYear();
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
  //------------------------------------------------------------enfant-----------------------------------------------------------------------------------------------

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

  //------------------------------------------------------------type affaire-----------------------------------------------------------------------------------------------

  displayTypeAffaire: boolean;
  codeTypeAffaire = "";
  typeAffaire = "";
  typeAffaireObjet: TypeAffaire;

  showListTypeAffaire() {
    this.displayTypeAffaire = true;
  }
  saveTypeAffaire(typeAffaire) {
    this.typeAffaire = typeAffaire.libelle_typeAffaire;
    this.codeTypeAffaire = typeAffaire.id;
    this.typeAffaireObjet = typeAffaire;
    this.displayTypeAffaire = false;
  }
  getTypeAffaire() {
    this.crudservice
      .getLigneById("typeAffaire", this.codeTypeAffaire)
      .subscribe((data) => {
        if (data.result != null) {
          console.log(
            "****************************************************************"
          );
          console.log(data.result);
          this.typeAffaireObjet = data.result;
          console.log(
            "****************************************************************"
          );
          console.log(this.typeAffaireObjet);
          this.typeAffaire = data.result.libelle_typeAffaire;
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
    this.displayTribunal1 = true;
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
          console.log(data.result);
          this.tribunal1 = data.result.nom_tribunal;
        } else {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: "تثبت من رمز المحكمة  ",
          });
          this.tribunal1 = "";
          this.tribunal1Objet = null;
        }
      });
  }

  //--------------------------------------------------------------------------------------------------------------------------

  //------------------------------------------------------------tribunal 2-----------------------------------------------------------------------------------------------

  displayTribunal2: boolean;
  tribunal2 = "";
  codeTribunal2 = "";

  numAffaireT2: number;
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
  next() {
    // this.carteRecup = new CarteRecup();

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
      affaireData.affaireOrigine = this.affaireOrigine;
      affaireData.arrestation = this.arrestation;

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
      });
    }
  }

  lienException() {
    this.tribunal2Objet = null;
    this.numAffaireT2 = null;
    this.tribunal2 = "";
    this.codeTribunal2 = "";
  }

  accepter() {
    this.affaireLien = new Affaire();

    this.affaireLien.tribunal = this.tribunal2Objet;
    this.affaireLien.affaireId = this.affaireIdLien;
    this.affaireLien.affaireId.numOrdinaleArrestation =
      this.arrestation.arrestationId.numOrdinale;

    this.affaireLien.arrestation = this.arrestation;
    this.affaireOrigine.affaireLien = this.affaireLien;

    this.affaireService
      .mettreAJourNumeroOrdinal(this.affaireOrigine)
      .subscribe((data) => {
        this.affaireOrigine = data.result;
      });
    this.displayNext = false;
    this.nextBoolean = true;
  }

  return() {
    this.nextBoolean = false;
  }
  showImg() {
    this.displayImg = true;
  }

  closeTitreAccusation() {
    this.displayAllTitreAccusation = false;
  }
  onSubmit() {
    this.alertTypeAffaire = "";

    if (
      !this.dateEmission ||
      !this.dateDepotCarte ||
      !this.typeAffaireObjet ||
      this.entitiesTitreAccusation.length == 0
    ) {
      this.service.add({
        key: "tst",
        severity: "error",
        summary: ".   خطأ    ",
        detail: " عليك تثبت     ",
      });
    } else {
      var found = false;
      for (var i = 0; i < this.entitiesTitreAccusation.length; i++) {
        if (
          this.entitiesTitreAccusation[i].typeAffaire.id ==
          this.typeAffaireObjet.id
        ) {
          found = true;
          break;
        }
      }

      if (found) {
        let maxObj = this.entitiesTitreAccusation.reduce((max, obj) =>
          max.typeAffaire.statutException > obj.typeAffaire.statutException
            ? max
            : obj
        );

        if (maxObj.typeAffaire.id != this.typeAffaireObjet.id) {
          this.alertTypeAffaire =
            " ربما نوع القضية" +
            " " +
            maxObj.typeAffaire.libelle_typeAffaire +
            "!!";
        }

        this.documentId = new DocumentId();
        this.documentId.idEnfant = this.enfantLocal.id;
        this.documentId.numOrdinalArrestation =
          this.arrestation.arrestationId.numOrdinale;
        this.documentId.numOrdinalAffaire =
          this.affaireOrigine.numOrdinalAffaire;
        this.documentId.numOrdinalDoc = this.numOrdinalDoc;

        this.documentService
          .calculerNombreDocumentsJudiciairesParAffaire(
            this.arrestation.arrestationId.idEnfant,
            this.arrestation.arrestationId.numOrdinale,
            this.affaireOrigine.numOrdinalAffaire
          )
          .subscribe((data) => {
            if (this.numDocumentByAffaire) {
              this.documentId.numOrdinalDocByAffaire =
                this.numDocumentByAffaire;
            } else {
              this.numDocumentByAffaire = data.result + 1;

              this.documentId.numOrdinalDocByAffaire = data.result + 1;
            }

            this.carteHeber = new CarteHeber();
            this.carteHeber.documentId = this.documentId;
            this.carteHeber.typeDocument = "CH";

            this.carteHeber.affaire = this.affaireOrigine;

            this.carteHeber.dateEmission = this.datepipe.transform(
              this.dateEmission,
              "yyyy-MM-dd"
            );
            this.carteHeber.dateDepotCarte = this.datepipe.transform(
              this.dateDepotCarte,
              "yyyy-MM-dd"
            );

            // this.carteHeber.dateDepotCarte = this.dateDepotCarte;
            // this.carteHeber.dateEmission = this.dateEmission;
            this.carteHeber.textJugement = this.textJugement;

            this.carteHeber.typeAffaire = this.typeAffaireObjet;

            this.carteHeber.numArrestation = this.residence.numArrestation;
            this.carteHeber.etablissement = this.residence.etablissement;
            this.carteHeber.user = this.token.getUserFromTokenFromToken();

            this.carteHeber.dateInsertion = this.datepipe.transform(
              new Date(),
              "yyyy-MM-dd"
            );
            this.carteHeber.titreAccusations = this.entitiesTitreAccusation;

            this.showCarteHeber = true;
          });
      } else {
        this.service.add({
          key: "tst",
          severity: "error",
          summary: ".   خطأ    ",
          detail: "      نوع القضية مختلف عن التهم   ",
        });
      }
    }
  }
  confirmer() {
    this.crudservice
      .createLigne("carteHeber", this.carteHeber)
      .subscribe((data) => {});

    this.showCarteHeber = false;
    this.isSaved = true;
    this.isExist = false;
  }
  showAllGouvernorat() {
    this.crudservice.getlistEntity("gouvernorat").subscribe((data) => {
      if (data.result) {
        console.log(data.result);

        this.gouvernoratSwich = [];
        data.result.forEach((gouvernorat: Gouvernorat, value: any) => {
          this.gouvernoratSwich.push({
            label: gouvernorat.libelle_gouvernorat,
            value: gouvernorat.libelle_gouvernorat,
          });
        });
      } else {
        this.gouvernoratSwich = [];
      }
    });
  }
  showAllTypeTribunal() {
    this.crudservice.getlistEntity("typeTribunal").subscribe((data) => {
      if (data.result) {
        console.log(data.result);

        this.typeTribunalSwich = [];
        data.result.forEach((typeTribunal: TypeTribunal, value: any) => {
          this.typeTribunalSwich.push({
            label: typeTribunal.libelleTypeTribunal,
            value: typeTribunal.libelleTypeTribunal,
          });
        });
      } else {
        this.typeTribunalSwich = [];
      }
    });
  }

  // nav;
  // onChangeDir(event) {
  //   this.nav = event.value;
  // }
  // goTO() {
  //   if (!this.nav) {
  //     console.error("La direction de navigation n'est pas définie");
  //     return;
  //   }
  //   window.localStorage.removeItem("idValideNav");

  //   window.localStorage.setItem("idValideNav", this.enfantLocal.id.toString());
  //   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  //   this.router.onSameUrlNavigation = "reload";
  //   this.router.navigate([this.nav]);
  // }
  // reglerDate(date){
  //   const words =  date.split('/');
  //   const x =  "/";
  //   return  date =words[2]+x+words[1]+x+words[0];
  // }
  // reglerDateSql(date){
  //   const words =  date.split('-');
  //   const x =  "-";
  //   return  date =words[2]+x+words[1]+x+words[0];
  // }

  showAllTypeAffaire() {
    this.crudservice.getlistEntity("typeAffaire").subscribe((data) => {
      if (data.result) {
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
  }
}
