import { DatePipe } from "@angular/common";
import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SelectItem, ConfirmationService, MessageService } from "primeng";
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
import { DocumentService } from "src/app/demo/service/document.service";
import { AffaireService } from "src/app/demo/service/affaire.service";
import { DetentionService } from "src/app/demo/service/detention.service";

@Component({
  selector: "app-edit-carte-recup",
  templateUrl: "./edit-carte-recup.component.html",
  styleUrls: ["./edit-carte-recup.component.scss"],
})
export class EditCarteRecupComponent implements OnInit {
  titreAccusationLocal: TitreAccusation;
  @Input()
  carteRecup: CarteRecup;

  hours: any;
  arretProvisoireForm: FormGroup;
  accusationForm: FormGroup;
  enfantLocal: Enfant;

  residence: Residence;

  displayImg: boolean;

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

  affaireAffecter: Affaire;
  displayAfferAffecter = false;
  displayAfferOrigine = false;
  displayAfferLier = false;

  directions = [
    { label: "  بطاقات الإيواء    ", value: "/mineur/docHeber" },
    { label: "    بطاقات الإيداع ", value: "/mineur/docDepot" },

    { label: "     مضامين الأحكام    ", value: "/mineur/docRecup" },
    { label: "     إحالة قضية    ", value: "/mineur/Transfert" },
    { label: "       إيقاف تنفيذ  ", value: "/mineur/ArreterLexecution" },

    {
      label: "      طعن النيابة بالاستئناف       ",
      value: "/mineur/AppelParquet",
    },
    { label: "         مراجعة     ", value: "/mineur/Revue" },
    {
      label: "          طعن الطفل بالاستئناف      ",
      value: "/mineur/AppelEnfant",
    },
    { label: "   الفرارات   ", value: "/mineur/echappes" },
    { label: "  النقل  ", value: "/mineur/mutation" },
    { label: "   إجراءات السراح  ", value: "/mineur/liberation" },

    { label: "  الوفاة  ", value: "/mineur/deces" },
  ];
  numOrd = 0;
  //--------------------------------------------------------------------------------------------------------------------------
  constructor(
    private crudservice: CrudEnfantService,
    private affaireService: AffaireService,
    private detentionService: DetentionService,
    private documentService: DocumentService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private eventService: EventService,
    private service: MessageService,
    public datepipe: DatePipe,
    private token: TokenStorageService,
    private nodeService: NodeService,
    private breadcrumbService: BreadcrumbService,
    private router: Router
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
  ngOnChanges(changes: SimpleChanges): void {
    this.isSaved = false;

    this.showCarteRecup = false;
    this.nextBoolean = false;

    this.entitiesTitreAccusation = [];
    this.crudservice.getlistEntity("titreAccusation").subscribe((data) => {
      this.entitiesTitreAccusation = data.result;

      // this.entitiesTitreAccusation = this.entitiesTitreAccusation.filter(
      //   (u) => u.id !== this.accusationLocal.titreAccusation.id
      // );
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
        this.numOrd = this.carteRecup.affaire.numOrdinalAffaire;
        this.numOrdinalDoc = this.carteRecup.documentId.numOrdinalDoc;

        this.numOrdinalDocByAffaire =
          this.carteRecup.documentId.numOrdinalDocByAffaire;

        this.dateDepotCarte = this.carteRecup.dateDepotCarte;
        this.dateDepotCarte = this.reglerDateSql(this.dateDepotCarte);

        this.dateEmission = this.carteRecup.dateEmission;
        this.dateEmission = this.reglerDateSql(this.dateEmission);

        this.textJugement = this.carteRecup.textJugement;

        this.codeTypeAffaire = this.carteRecup.typeAffaire.id;

        this.typeAffaire = this.carteRecup.typeAffaire.libelle_typeAffaire;

        this.typeAffaireObjet = this.carteRecup.typeAffaire;

        this.codeTypeJuge = this.carteRecup.typeJuge.id;

        this.typeJuge = this.carteRecup.typeJuge.libelle_typeJuge;

        this.typeJugeObjet = this.carteRecup.typeJuge;

        this.entitiesArretProvisoire = [];

        this.entitiesAccusation = [];

        // this.documentService
        //   .trouverArretsProvisoiresParContenuDeJugement(this.carteRecup)
        //   .subscribe((data) => {
        //     console.log("data.result");
        //     console.log(data.result);
        //     this.entitiesArretProvisoire = data.result;
        //   });

        // this.entitiesArretProvisoire = this.carteRecup.entitiesArretProvisoire

        //  this.entitiesAccusation = this.carteRecup.entitiesAccusation

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
        this.affaireOrigine = this.carteRecup.affaire;

        if (this.carteRecup?.affaire?.affaireLien) {
          this.tribunal2 =
            this.carteRecup.affaire.affaireLien.tribunal.nom_tribunal;
          this.codeTribunal2 = this.carteRecup.affaire.affaireLien.tribunal.id;
          this.numAffaireT2 =
            this.carteRecup.affaire.affaireLien.affaireId.numAffaire;
          this.tribunal2Objet = this.carteRecup.affaire.affaireLien.tribunal;
          this.affaireLien = this.carteRecup.affaire.affaireLien;
        }

        if (this.carteRecup?.affaire?.affaireAffecter) {
          this.tribunal3 =
            this.carteRecup.affaire.affaireAffecter.tribunal.nom_tribunal;
          this.codeTribunal3 =
            this.carteRecup.affaire.affaireAffecter.tribunal.id;
          this.numAffaireT3 =
            this.carteRecup.affaire.affaireAffecter.affaireId.numAffaire;
          this.tribunal3Objet =
            this.carteRecup.affaire.affaireAffecter.tribunal;
          this.affaireAffecter = this.carteRecup.affaire.affaireAffecter;
        }
      });
  }
  ngOnDestroy() {
    window.localStorage.removeItem("idValide");
  }
  ngOnInit() {
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
      // dateDebut: ["", Validators.required],
      // dateFin: ["", Validators.required],
    });

    this.crudservice.getlistEntity("typeAffaire").subscribe((data) => {
      this.entitiesTypeAffaire = data.result;
    });

    this.crudservice.getlistEntity("typeJuge").subscribe((data) => {
      this.entitiesTypeJuge = data.result;
    });
    this.chargerDropDownListTribunal();
    this.chargerDropDownListGouv();
    this.chargerDropDownListTypeTribunal();
    this.currentUser = this.token.getUser();
    this.accusationsToAdd = [];
    this.accusationsToAdd.push({ label: "empty", value: null });
  }

  //--------------------------------------------------------------------------------------------------------------------------

  reload() {
    this.enfantLocal = null;
    this.isExist = false;
    this.msg = "";

    //window.location.reload();
  }

  //------------------------------------------------------------enfant-----------------------------------------------------------------------------------------------

  search(id: String) {
    this.crudservice.getLigneById("enfant", id).subscribe((data) => {
      this.enfantLocal = data.result;
      // this.crudservice
      //   .getLigneById("deces", this.enfantLocal.id)
      //   .subscribe((data) => {
      //     if (data.result == null) {
      //       this.detentionService
      //         .trouverEchappeNonApprehende("echappes", id)
      //         .subscribe((data) => {
      //           if (data.result == null) {
      //             this.detentionService
      //               .trouverDerniereDetentionParIdDetenu("arrestation", id)
      //               .subscribe((data) => {
      //                 this.arrestation = data.result;
      //                 // this.detentionService
      //                 //   .getLiberationById(
      //                 //     "liberation",
      //                 //     this.arrestation.arrestationId.idEnfant,
      //                 //     this.arrestation.arrestationId.numOrdinale
      //                 //   )
      //                 //   .subscribe((data) => {
      //                 //     if (data.result != null) {
      //                 //       this.isExist = false;
      //                 //       this.msg = " طفل  في حالـــة ســراح ";
      //                 //       this.statEchappesOrlibre = 1;
      //                 //     } else {
      //                 //       this.detentionService
      //                 //         .trouverDerniereResidenceParNumDetentionEtIdDetenu(
      //                 //           "residence",
      //                 //           this.arrestation.arrestationId.idEnfant,
      //                 //           this.arrestation.arrestationId.numOrdinale
      //                 //         )
      //                 //         .subscribe((data) => {
      //                 //           this.residence = data.result;

      //                 //           // this.detentionService
      //                 //           //   .findByIdEnfantAndStatutEnCour(
      //                 //           //     "residence",
      //                 //           //     this.arrestation.arrestationId.idEnfant,
      //                 //           //     this.arrestation.arrestationId.numOrdinale
      //                 //           //   )
      //                 //           //   .subscribe((data) => {
      //                 //           //     if (data.result != null) {
      //                 //           //       this.isExist = false;
      //                 //           //       this.statEchappesOrlibre = 2;
      //                 //           //       this.msg =
      //                 //           //         "      نقلـــة جـــارية إلـــى مركــز    " +
      //                 //           //         data.result.etablissement
      //                 //           //           .libelle_etablissement;
      //                 //           //     }
      //                 //           //   });
      //                 //           if (
      //                 //             data.result.etablissement.id !=
      //                 //             this.token.getUser().personelle.etablissement
      //                 //               .id
      //                 //           ) {
      //                 //             this.isExist = false;
      //                 //             this.statEchappesOrlibre = 3;
      //                 //             this.msg =
      //                 //               "      طفــل مقيــم بمركــز     " +
      //                 //               data.result.etablissement
      //                 //                 .libelle_etablissement;
      //                 //           }
      //                 //         });

      //                 //       this.documentService
      //                 //         .getDocumentByArrestation(
      //                 //           this.arrestation.arrestationId.idEnfant,
      //                 //           this.arrestation.arrestationId.numOrdinale
      //                 //         )
      //                 //         .subscribe((data) => {
      //                 //           if (this.numOrdinalDoc) {
      //                 //             this.update = false;
      //                 //             this.numOrdinalDoc = this.numOrdinalDoc;
      //                 //           } else {
      //                 //             this.numOrdinalDoc = data.result + 1;
      //                 //           }
      //                 //         });

      //                 //       //-----------------------------------------ici -------------------------------------------------------------------------------------------------------
      //                 //       this.affaireService
      //                 //         .findByArrestation(
      //                 //           "affaire",
      //                 //           this.arrestation.arrestationId.idEnfant,
      //                 //           this.arrestation.arrestationId.numOrdinale
      //                 //         )
      //                 //         .subscribe((data) => {
      //                 //           if (data.result == null) {
      //                 //           } else {
      //                 //             this.affaires = data.result;
      //                 //             console.log("ici ");
      //                 //             console.log(this.affaires);
      //                 //           }
      //                 //         });

      //                 //       this.isExist = true;
      //                 //     }
      //                 //   });
      //               });
      //           } else {
      //             this.msg = "طفل في حالــــــة فـــرار";
      //             this.statEchappesOrlibre = 0;
      //           }
      //         });
      //     } else {
      //       this.statEchappesOrlibre = 4;

      //       this.msg = "طفل فــي ذمــــــة اللـــه";
      //     }
      // });
    });
  }
  changeDate() {
    this.dateEntreLocal = this.datepipe.transform(
      this.dateEntreLocal,
      "yyyy-MM-dd"
    );
  }

  showImg() {
    this.displayImg = true;
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
    this.tribunal3 = affaireAffecter.tribunal.nom_tribunal;
    this.codeTribunal3 = affaireAffecter.tribunal.id;

    this.numAffaireT3 = affaireAffecter.affaireId.numAffaire;

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

  onSubmitArretProvisoireForm(p: object) {
    this.displayArretProvisoire = false;

    this.arretProvisoireLocal = this.arretProvisoireForm.value;

    this.arretProvisoireLocal.dateDebut = this.reglerDate(
      this.arretProvisoireLocal.dateDebut
    );
    this.arretProvisoireLocal.dateDebut = this.datepipe.transform(
      this.arretProvisoireLocal.dateDebut,
      "yyyy-MM-dd"
    );
    this.arretProvisoireLocal.dateFin = this.reglerDate(
      this.arretProvisoireLocal.dateFin
    );
    this.arretProvisoireLocal.dateFin = this.datepipe.transform(
      this.arretProvisoireLocal.dateFin,
      "yyyy-MM-dd"
    );
    console.log(this.arretProvisoireLocal.dateDebut);
    console.log(this.arretProvisoireLocal.dateFin);

    let date1 = new Date(this.arretProvisoireLocal.dateDebut);
    let date2 = new Date(this.arretProvisoireLocal.dateFin);
    if (date2 < date1) {
      this.service.add({
        key: "tst",
        severity: "error",
        summary: ".   خطأ    ",

        detail: " تاريخ النهاية أصغر  من تاريخ البداية  ",
      });
    } else {
      if (this.entitiesArretProvisoire == null) {
        this.entitiesArretProvisoire = [];
      }

      if (this.entitiesArretProvisoire.length > 0) {
        if (
          date1 <
          new Date(
            this.entitiesArretProvisoire[
              this.entitiesArretProvisoire.length - 1
            ].dateFin
          )
        ) {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: " تاريخ البداية أصغر  من تاريخ النهاية  ",
          });
        } else {
          // calculate the time difference of two dates JavaScript
          var diffTime = date2.getTime() - date1.getTime();

          // calculate the number of days between two dates javascript
          var daysDiff = diffTime / (1000 * 3600 * 24);
          var years = Math.floor(daysDiff / 365);
          var months = Math.floor((daysDiff % 365) / 30);
          var days = Math.floor(((daysDiff % 365) % 30) + 1);

          this.arretProvisoireLocal.jour = days;
          this.arretProvisoireLocal.mois = months;
          this.arretProvisoireLocal.annee = years;
          this.arretProvisoireLocal.daysDiff = daysDiff;

          console.log(date1);
          console.log(date2);
          this.entitiesArretProvisoire.push(this.arretProvisoireLocal);
          this.daysDiffArretProvisoire =
            this.daysDiffArretProvisoire + daysDiff + 1;

          this.anneeArretProvisoire = Math.floor(
            this.daysDiffArretProvisoire / 365
          );
          this.moisArretProvisoire = Math.floor(
            (this.daysDiffArretProvisoire % 365) / 30
          );
          this.jourArretProvisoire = Math.floor(
            (this.daysDiffArretProvisoire % 365) % 30
          );
          console.log(this.daysDiffArretProvisoire);
          this.arretProvisoireForm.reset();
        }
      } else {
        // calculate the time difference of two dates JavaScript
        var diffTime = date2.getTime() - date1.getTime();

        // calculate the number of days between two dates javascript
        var daysDiff = diffTime / (1000 * 3600 * 24);
        var years = Math.floor(daysDiff / 365);
        var months = Math.floor((daysDiff % 365) / 30);
        var days = Math.floor(((daysDiff % 365) % 30) + 1);

        this.arretProvisoireLocal.jour = days;
        this.arretProvisoireLocal.mois = months;
        this.arretProvisoireLocal.annee = years;
        this.arretProvisoireLocal.daysDiff = daysDiff;

        console.log(date1);
        console.log(date2);
        this.entitiesArretProvisoire.push(this.arretProvisoireLocal);
        this.daysDiffArretProvisoire =
          this.daysDiffArretProvisoire + daysDiff + 1;

        this.anneeArretProvisoire = Math.floor(
          this.daysDiffArretProvisoire / 365
        );
        this.moisArretProvisoire = Math.floor(
          (this.daysDiffArretProvisoire % 365) / 30
        );
        this.jourArretProvisoire = Math.floor(
          (this.daysDiffArretProvisoire % 365) % 30
        );
        console.log(this.daysDiffArretProvisoire);
        this.arretProvisoireForm.reset();
      }
    }
  }
  deletArretProvisoire(row: ArretProvisoire) {
    this.entitiesArretProvisoire = this.entitiesArretProvisoire.filter(
      (u) => u !== row
    );
    this.daysDiffArretProvisoire =
      this.daysDiffArretProvisoire - row.daysDiff - 1;

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
  entitiesAccusation: Accusation[] = [];
  accusationLocal: AccusationCarteRecup;
  accusationsToAdd: SelectItem[];
  accusationsToAddValue: any;

  showAccusation() {
    if (this.entitiesAccusation.length == 0) {
      this.dateDebutGlobale = null;
    }
    this.displayAccusation = true;
  }

  onSubmitAccusationForm(p: object) {
    this.accusationLocal = this.accusationForm.value;

    this.accusationLocal.numOridinel = this.entitiesAccusation.length + 1;
    if (this.accusationsToAddValue) {
      this.accusationLocal.numOridinelLiee = this.accusationsToAddValue;
      this.accusationLocal.dateDebut = this.datepipe.transform(
        this.entitiesAccusation[this.entitiesAccusation.length - 1].dateFin,
        "yyyy-MM-dd"
      );
      this.accusationLocal.dateFin = this.datepipe.transform(
        this.entitiesAccusation[this.entitiesAccusation.length - 1].dateFin,
        "yyyy-MM-dd"
      );
    } else {
      this.dateDebutGlobale = this.reglerDate(this.dateDebutGlobale);
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
        if (this.entitiesAccusation.length >= 1) {
          this.accusationLocal.dateDebut = this.datepipe.transform(
            this.entitiesAccusation[this.entitiesAccusation.length - 1].dateFin,
            "yyyy-MM-dd"
          );
        } else {
          this.accusationLocal.dateDebut = this.datepipe.transform(
            this.reglerDate(this.dateDebutGlobale),
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

    this.entitiesAccusation.push(this.accusationLocal);
    if (!this.accusationLocal.numOridinelLiee) {
      this.accusationsToAdd.push({
        label: this.entitiesAccusation.indexOf(this.accusationLocal) + 1 + "",
        value: this.entitiesAccusation.indexOf(this.accusationLocal) + 1,
      });
    }
    this.accusationsToAddValue = null;

    if (this.entitiesAccusation.length == 1) {
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
    this.entitiesAccusation = this.entitiesAccusation.filter((u) => u !== row);
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
  }

  //--------------------------------------------------------------------------------------------------------------------------
  reglerDate(date) {
    const words = date.split("/");
    const x = "/";
    return (date = words[2] + x + words[1] + x + words[0]);
  }
  reglerDateSql(date) {
    const words = date.split("-");
    const x = "-";
    return (date = words[2] + x + words[1] + x + words[0]);
  }

  onSubmit() {
    // this.dateEmission = this.datepipe.transform(this.reglerDate(this.dateEmission), 'yyyy-MM-dd');
    // this.dateDepotCarte = this.datepipe.transform(this.reglerDate(this.dateDepotCarte), 'yyyy-MM-dd');

    this.documentId = new DocumentId();
    this.documentId.idEnfant = this.enfantLocal.id;
    this.documentId.numOrdinalArrestation =
      this.arrestation.arrestationId.numOrdinale;
    this.documentId.numOrdinalAffaire = this.affaireOrigine.numOrdinalAffaire;
    this.documentId.numOrdinalDoc = this.numOrdinalDoc;
    this.documentService
      .calculerNombreDocumentsJudiciairesParAffaire(
        this.arrestation.arrestationId.idEnfant,
        this.arrestation.arrestationId.numOrdinale,
        this.affaireOrigine.numOrdinalAffaire
      )
      .subscribe((data) => {
        if (this.numOrdinalDocByAffaire) {
          this.documentId.numOrdinalDocByAffaire = this.numOrdinalDocByAffaire;
        } else {
          this.documentId.numOrdinalDocByAffaire = data.result + 1;
        }

        this.carteRecup = new CarteRecup();
        this.carteRecup.documentId = this.documentId;
        this.carteRecup.typeDocument = "CJ";

        this.carteRecup.affaire = this.affaireOrigine;

        this.carteRecup.dateDepotCarte = this.datepipe.transform(
          this.reglerDateSql(this.dateDepotCarte),
          "yyyy-MM-dd"
        );
        this.carteRecup.dateEmission = this.datepipe.transform(
          this.reglerDateSql(this.dateEmission),
          "yyyy-MM-dd"
        );
        this.carteRecup.textJugement = this.textJugement;

        this.carteRecup.typeAffaire = this.typeAffaireObjet;
        this.carteRecup.typeJuge = this.typeJugeObjet;

        this.carteRecup.daysDiffJuge = this.daysDiffJuge;
        this.carteRecup.annee = this.anneePenal;
        this.carteRecup.mois = this.moisPenal;
        this.carteRecup.jour = this.jourPenal;

        this.carteRecup.daysDiffArretProvisoire = this.daysDiffArretProvisoire;
        this.carteRecup.anneeArretProvisoire = this.anneeArretProvisoire;
        this.carteRecup.moisArretProvisoire = this.moisArretProvisoire;
        this.carteRecup.jourArretProvisoire = this.jourArretProvisoire;

        this.carteRecup.numArrestation = this.residence.numArrestation;
        this.carteRecup.etablissement = this.residence.etablissement;
        this.carteRecup.user = this.token.getUser();

        this.carteRecup.dateInsertion = this.datepipe.transform(
          new Date(),
          "yyyy-MM-dd"
        );
        // this.carteRecup.entitiesArretProvisoire = this.entitiesArretProvisoire;
        this.carteRecup.entitiesAccusation = this.entitiesAccusation;

        this.carteRecup.dateDebutPunition = this.dateDebutGlobale;
        this.affaireService
          .calculerDateFin(
            this.dateDebutGlobale + "",
            this.daysDiffJuge - this.daysDiffArretProvisoire
          )
          .subscribe((data) => {
            if (data.result != null) {
              this.carteRecup.dateFinPunition = data.result;

              if (
                new Date(this.carteRecup.dateFinPunition) <=
                new Date(this.carteRecup.dateDebutPunition)
              ) {
                if (
                  new Date(this.carteRecup.dateFinPunition) <
                  new Date(this.carteRecup.dateDepotCarte)
                ) {
                  this.carteRecup.dateFinPunition =
                    this.carteRecup.dateDepotCarte;
                } else {
                  this.carteRecup.dateFinPunition =
                    this.carteRecup.dateDebutPunition;
                }
              }
            } else {
              this.service.add({
                key: "tst",
                severity: "error",
                summary: ".   خطأ    ",
                detail: "تثبت        ",
              });
            }
          });

        this.showCarteRecup = true;
      });
  }
  confirmer() {
    this.crudservice
      .delete("document", "CJ", this.carteRecup.documentId)
      .subscribe((data) => {
        console.log(data);
        console.log(data.result);
        if (data.result) {
          this.crudservice
            .createLigne("carteRecup", this.carteRecup)
            .subscribe((data) => {
              this.arretProvisoireId = new ArretProvisoireId();
              this.arretProvisoireId.idEnfant = this.documentId.idEnfant;
              this.arretProvisoireId.numOrdinalArrestation =
                this.documentId.numOrdinalArrestation;
              this.arretProvisoireId.numOrdinalAffaire = this.numOrd;
              //   this.documentId.numOrdinalAffaire;
              this.arretProvisoireId.numOrdinalDoc =
                this.documentId.numOrdinalDoc;
              this.arretProvisoireId.numOrdinalDocByAffaire =
                this.documentId.numOrdinalDocByAffaire;

              for (var i = 0; i < this.entitiesArretProvisoire.length; i++) {
                this.arretProvisoire = new ArretProvisoire();
                // this.arretProvisoire.arretProvisoireId =
                //   new ArretProvisoireId();
                // this.arretProvisoire.arretProvisoireId = this.arretProvisoireId;

                // this.arretProvisoire.arretProvisoireId.numOrdinalArret = i + 1;

                // this.arretProvisoire.carteRecup = this.carteRecup;

                this.arretProvisoire.jour =
                  this.entitiesArretProvisoire[i].jour;
                this.arretProvisoire.mois =
                  this.entitiesArretProvisoire[i].mois;
                this.arretProvisoire.annee =
                  this.entitiesArretProvisoire[i].annee;
                this.arretProvisoire.dateDebut =
                  this.entitiesArretProvisoire[i].dateDebut;
                this.arretProvisoire.dateFin =
                  this.entitiesArretProvisoire[i].dateFin;
                this.arretProvisoire.daysDiff =
                  this.entitiesArretProvisoire[i].daysDiff;
                this.crudservice
                  .createLigne("arretProvisoire", this.arretProvisoire)
                  .subscribe((data) => {
                    console.log(data);
                  });
              }

              this.accusationCarteRecupId = new AccusationCarteRecupId();
              this.accusationCarteRecupId.idEnfant = this.documentId.idEnfant;
              this.accusationCarteRecupId.numOrdinalArrestation =
                this.documentId.numOrdinalArrestation;
              this.accusationCarteRecupId.numOrdinalAffaire = this.numOrd;
              // this.documentId.numOrdinalAffaire;
              this.accusationCarteRecupId.numOrdinalDoc =
                this.documentId.numOrdinalDoc;
              this.accusationCarteRecupId.numOrdinalDocByAffaire =
                this.documentId.numOrdinalDocByAffaire;

              for (var i = 0; i < this.entitiesAccusation.length; i++) {
                this.accusationCarteRecup = new AccusationCarteRecup();
                this.accusationCarteRecup.accusationCarteRecupId =
                  new AccusationCarteRecupId();
                this.accusationCarteRecup.accusationCarteRecupId =
                  this.accusationCarteRecupId;

                this.accusationCarteRecup.accusationCarteRecupId.idTitreAccusation =
                  this.entitiesAccusation[i].titreAccusation.id;
                this.accusationCarteRecup.annee =
                  this.entitiesAccusation[i].annee;
                this.accusationCarteRecup.mois =
                  this.entitiesAccusation[i].mois;
                this.accusationCarteRecup.jour =
                  this.entitiesAccusation[i].jour;
                this.accusationCarteRecup.dateDebut =
                  this.entitiesAccusation[i].dateDebut;
                this.accusationCarteRecup.dateFin =
                  this.entitiesAccusation[i].dateFin;
                this.accusationCarteRecup.textAccusation =
                  this.entitiesAccusation[i].textAccusation;
                this.accusationCarteRecup.titreAccusation =
                  this.entitiesAccusation[i].titreAccusation;
                this.accusationCarteRecup.carteRecup = data.result;
                this.accusationCarteRecup.numOridinel =
                  this.entitiesAccusation[i].numOridinel;
                this.accusationCarteRecup.numOridinelLiee =
                  this.entitiesAccusation[i].numOridinelLiee;

                this.crudservice
                  .createLigne(
                    "accusationCarteRecup",
                    this.accusationCarteRecup
                  )
                  .subscribe((data) => {
                    console.log(data);
                  });
              }
            });

          this.isSaved = true;
          this.isExist = false;
          this.showCarteRecup = false;
        }
      });
  }
  next() {
    this.affaireIdOrigine = new AffaireId();
    this.affaireIdOrigine.idEnfant = this.enfantLocal.id;
    this.affaireIdOrigine.idTribunal = this.tribunal1Objet.id;
    this.affaireIdOrigine.numAffaire = this.numAffaireT1;

    this.affaireOrigine = new Affaire();
    this.affaireOrigine.arrestation = this.arrestation;
    this.affaireOrigine.tribunal = this.tribunal1Objet;
    this.affaireOrigine.affaireId = this.affaireIdOrigine;
    console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
    console.log(this.affaireAffecter);
    console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
    if (this.affaireAffecter) {
      this.affaireOrigine.affaireAffecter = this.affaireAffecter;
    }

    //---------------------------Chercher l'affaire origine existe  ou n'exist pas-------------------------------------------------------------------------------------
    // this.affaireService
    //   .trouverAffaireParId(
    //     this.affaireIdOrigine.idEnfant,
    //     this.affaireIdOrigine.numAffaire,
    //     this.affaireIdOrigine.idTribunal,
    //     this.arrestation.arrestationId.numOrdinale
    //   )
    //   .subscribe((data) => {
    //     if (data.result) {
    //       console.log(data.result);
    //       //------------------- l'affaire origine existe -----------------------------------------------------------------------------------------
    //       this.affaireOrigine = new Affaire();
    //       this.affaireOrigine = data.result;
    //       console.log("-------------------af----------------------");
    //       console.log(this.affaireOrigine);

    //       //--------------------deja update -------------------------------------------------------------------------------------

    //       if (this.update == false) {
    //         this.nextBoolean = true;
    //       } else {
    //         //--------------------Chercher si l'affaire origine est un lien d'autre affaire ou n'est pas un lien d'une aucune affaire -------------------------------------------------------------------------------------
    //         // this.affaireService
    //         //   .findAffaireByAffaireLien(
    //         //     this.affaireIdOrigine.idEnfant,
    //         //     this.affaireIdOrigine.numAffaire,
    //         //     this.affaireIdOrigine.idTribunal
    //         //   )
    //         //   .subscribe((data) => {
    //         //     //-------------------- l'affaire origine est un lien d'autre affaire ------------------------ -------------------------------------------------------------------------------------
    //         //     if (data.result) {
    //         //       this.displayAlertAffaireOrigineLier = true;
    //         //     }
    //         //     //-------------------- l'affaire origine n'est pas un lien d'une aucune affaire ------------------------ --------------------------------------------------------------------------------------------
    //         //     else {
    //         //       //-------------------- Tester si l'affaire d'origine avoir un lien avec un autre affaire ou n'avoir pas un lien avec un  affaire  ------------------------ --------------------------------------------------------------------------------------------
    //         //       //-------------------- l'affaire d'origine avoir un lien avec un autre affaire  ------------------------ --------------------------------------------------------------------------------------------
    //         //       if (this.affaireOrigine.affaireLien) {
    //         //         //-------------------- Tester si les champs d'affaire de lien sont  remplis ou ne sont pas remplis  ------------------------ --------------------------------------------------------------------------------------------
    //         //         if (this.tribunal2Objet && this.numAffaireT2) {
    //         //           //--------------------  les champs d'affaire de lien sont  remplis  et l'affaire d'origine avoir un lien avec un autre affaire------------------- ------------------------ --------------------------------------------------------------------------------------------
    //         //           //-------------------- Tester si les champs d'affaire de lien à saisir sont les memes que l'affaire  de lien reel ou nn ------------------------ --------------------------------------------------------------------------------------------
    //         //           if (
    //         //             this.affaireOrigine.affaireLien.affaireId.idTribunal !=
    //         //               this.tribunal2Objet.id ||
    //         //             this.affaireOrigine.affaireLien.affaireId.numAffaire !=
    //         //               this.numAffaireT2
    //         //           ) {
    //         //             //--------------------   les champs d'affaire de lien à saisir sont les memes que l'affaire  de lien reel  ------------------------ --------------------------------------------------------------------------------------------
    //         //             this.displayAlertLienAutre = true;
    //         //           } else {
    //         //             //--------------------   les champs d'affaire de lien à saisir ne sont pas les memes que l'affaire  de lien reel  ------------------------ --------------------------------------------------------------------------------------------
    //         //             this.displayAlertLienMeme = true;
    //         //           }
    //         //         } else {
    //         //           //--------------------  les champs d'affaire de lien ne sont pas  remplis et l'affaire d'origine avoir un lien avec un autre affaire------------------- ------------------------ --------------------------------------------------------------------------------------------
    //         //           this.displayAlertOrigineExistAvecLien = true;
    //         //           console.log("hhhhhhhhhhhhhhhhhhhhhh");
    //         //           console.log(this.affaireOrigine.affaireLien);
    //         //           //this.lien(); en view
    //         //         }
    //         //       }
    //         //       //-------------------- l'affaire d'origine n'avoir pas un lien avec un  affaire   ------------------------ --------------------------------------------------------------------------------------------
    //         //       else {
    //         //         this.displayAlertOrigineExistSansLien = true;
    //         //         if (this.tribunal2Objet && this.numAffaireT2) {
    //         //           this.lienException();
    //         //         } else {
    //         //           this.nextBoolean = true;
    //         //         }
    //         //         //this.lien(); en view
    //         //       }
    //         //     }
    //         //   });
    //       }
    //     } else {
    //       console.log(data.message);
    //       console.log(this.affaireLien);

    //       //------------------- l'affaire origine n'exist pas-------------------------------------------------------------------------
    //       if (this.affaireLien) {
    //         //par choix
    //         this.affaireOrigine.affaireLien = this.affaireLien;
    //         this.affaireService
    //           .mettreAJourNumeroOrdinal(
    //             this.affaireOrigine,
    //             this.arrestation.arrestationId.numOrdinale
    //           )
    //           .subscribe((data) => {
    //             this.affaireOrigine = data.result;

    //             console.log(this.arrestation.arrestationId.numOrdinale);

    //             this.nextBoolean = true;
    //           });
    //       } else {
    //         // sans choix

    //         this.lien();
    //       }
    //     }
    //   });
  }

  lienException() {
    this.tribunal2Objet = null;
    this.numAffaireT2 = null;
    this.tribunal2 = "";
    this.codeTribunal2 = "";
  }

  lien() {
    //-------------------- assuerer que l'affaire d'origine avoir l'arrestation actuel ------------------------ --------------------------------------------------------------------------------------------
    //this.affaireOrigine.arrestation = this.arrestation;

    //-------------------- Tester si les champs d'affaire de lien sont  remplis ou ne sont pas remplis  ------------------------ --------------------------------------------------------------------------------------------

    //-------------------- --les champs d'affaire de lien sont  remplis   ------------------------ --------------------------------------------------------------------------------------------

    if (this.tribunal2Objet && this.numAffaireT2) {
      this.affaireIdLien = new AffaireId();
      this.affaireIdLien.idEnfant = this.enfantLocal.id;
      this.affaireIdLien.idTribunal = this.tribunal2Objet.id;
      this.affaireIdLien.numAffaire = this.numAffaireT2;

      //-------------------- --Chercher l'affaire de lien exisit ou n'existe pas   ------------------------ --------------------------------------------------------------------------------------------
      // this.affaireService
      //   .trouverAffaireParId(
      //     this.affaireIdLien.idEnfant,
      //     this.affaireIdLien.numAffaire,
      //     this.affaireIdLien.idTribunal,
      //     this.arrestation.arrestationId.numOrdinale
      //   )
      //   .subscribe((data) => {
      //     //	this.affaireLien   = data.result[0];

      //     //-------------------- -l'affaire de lien exisit ------------------------ --------------------------------------------------------------------------------------------
      //     if (data.result) {
      //       this.affaireOrigine.affaireLien = data.result;

      //       //--------------------Chercher si l'affaire de lien est un lien d'autre affaire ou n'est pas un lien d'une aucune affaire -------------------------------------------------------------------------------------
      //       // this.affaireService
      //       //   .findAffaireByAffaireLien(
      //       //     this.affaireIdLien.idEnfant,
      //       //     this.affaireIdLien.numAffaire,
      //       //     this.affaireIdLien.idTribunal
      //       //   )
      //       //   .subscribe((data) => {
      //       //     //-------------------- l'affaire de lien est un lien d'autre affaire ------------------------ -------------------------------------------------------------------------------------

      //       //     if (data.result) {
      //       //       this.displayAlertAffaireLienLier = true;
      //       //     }

      //       //     //-------------------- l'affaire de lien n'est pas un lien d'autre affaire ------------------------ -------------------------------------------------------------------------------------
      //       //     else {
      //       //       this.affaireService
      //       //         .mettreAJourNumeroOrdinal(
      //       //           this.affaireOrigine,
      //       //           this.arrestation.arrestationId.numOrdinale
      //       //         )
      //       //         .subscribe((data) => {
      //       //           this.affaireOrigine = data.result;

      //       //           console.log(this.arrestation.arrestationId.numOrdinale);
      //       //           // if (this.affaireLien.arrestation.arrestationId.numOrdinale != this.arrestation.arrestationId.numOrdinale) {
      //       //           // 	this.displayAlertLienAutreArrestation = true;
      //       //           // }

      //       //           this.nextBoolean = true;
      //       //         });
      //       //     }
      //       //   });
      //     }
      //     //-------------------- --  l'affaire de lien  n'existe pas  ----------------------------------------------------------------------------------------------------------------------
      //     else {
      //       if (data.message == 1) {
      //         this.displayAlertLienAutreArrestation = true;
      //       } else {
      //         this.displayNext = true;
      //       }
      //       //this.accepter()  en view
      //     }
      //   });
    }

    //--------------------  les champs d'affaire de lien   ne sont pas remplis  ------------------------ --------------------------------------------------------------------------------------------
    else {
      this.affaireOrigine.affaireLien = null;

      this.affaireService
        .mettreAJourNumeroOrdinal(
          this.affaireOrigine 
        )
        .subscribe((data) => {
          this.affaireOrigine = data.result;
          this.affaireOrigine.numOrdinalAffaire = this.numOrd;
        });
      this.nextBoolean = true;
    }
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
      .mettreAJourNumeroOrdinal(
        this.affaireOrigine 
      )
      .subscribe((data) => {
        this.affaireOrigine = data.result;
      });
    this.displayNext = false;
    this.nextBoolean = true;
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

  nav;
  onChangeDir(event) {
    this.nav = event.value;
  }
  goTO() {
    window.localStorage.removeItem("idValideNav");

    window.localStorage.setItem("idValideNav", this.enfantLocal.id.toString());
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([this.nav]);
  }
}
