import { DatePipe } from "@angular/common";
import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { SelectItem, MessageService } from "primeng/api";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { EventService } from "src/app/demo/service/eventservice";
import { NodeService } from "src/app/demo/service/nodeservice";
import { Affaire } from "src/app/domain/affaire";
import { AffaireId } from "src/app/domain/affaireId";
import { Arreterlexecution } from "src/app/domain/arreterlexecution";
import { ChangementLieu } from "src/app/domain/changementLieu";
import { DocumentId } from "src/app/domain/documentId";
import { Enfant } from "src/app/domain/enfant";
import { EtabChangeManiere } from "src/app/domain/etabChangeManiere";
import { Etablissement } from "src/app/domain/etablissement";
import { Gouvernorat } from "src/app/domain/gouvernorat";
import { MotifArreterlexecution } from "src/app/domain/motifArreterlexecution";
import { Residence } from "src/app/domain/residence";
import { Tribunal } from "src/app/domain/tribunal";
import { TypeAffaire } from "src/app/domain/typeAffaire";
import { TypeTribunal } from "src/app/domain/typeTribunal";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { AppConfigService } from "../app-config.service";
import { DocumentService } from "src/app/demo/service/document.service";
import { AffaireService } from "src/app/demo/service/affaire.service";
import { DetentionService } from "src/app/demo/service/detention.service";
import { Arrestation } from "src/app/domain/arrestation";

@Component({
  selector: "app-add-changement-lieu",
  templateUrl: "./add-changement-lieu.component.html",
  styleUrls: ["./add-changement-lieu.component.css"],
  providers: [MessageService],
})
export class AddChangementLieuComponent implements OnInit {
  currentUser: any;
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
  }

  enfantLocal: Enfant;
  residence: Residence;
  affaireIdOrigine: AffaireId;
  affaireOrigine: Affaire;
  numOrdinalDoc: number;
  entitiesTribunal: Tribunal[];
  entitiesTypeAffaire: TypeAffaire[];
  displayImg: boolean;
  displayAffaire = false;

  entitiesAffaire: Affaire[];
  isExist = false;
  isSaved = false;
  msg = "";
  arrestation: Arrestation;
  displayAlertOrigineExist = false;
  showTransfert = false;
  dateEmission;
  dateDepotCarte;
  documentId: DocumentId;
  @Input()
  changementLieu: ChangementLieu;

  entitesEtabChangeManiere: EtabChangeManiere[];
  cause_etabChangeManiere = "";
  displayEtabChangeManiere = false;
  etabChangeManiereLocal: EtabChangeManiere;

  entitesEtablissement: Etablissement[];
  centre = "";
  displayEtablissement = false;
  etablissementLocal: Etablissement;

  jour: any;
  mois: any;
  annee: any;

  statEchappesOrlibre: number;
  update = false;

  years = "";
  calendar_ar: any;
  @Input()
  numOrdinalDocByAffaire: number;
  typeTribunalSwich: SelectItem[];
  gouvernoratSwich: SelectItem[];

  radioValue: string;
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
  constructor(
    private crudservice: CrudEnfantService,
    private documentService: DocumentService,
    private affaireService: AffaireService,
    private detentionService: DetentionService,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private nodeService: NodeService,
    private service: MessageService,
    private breadcrumbService: BreadcrumbService,
    public datepipe: DatePipe,
    private token: TokenStorageService,
    private router: Router,
    private appConfigService: AppConfigService
  ) {
    // this.breadcrumbService.setItems([{
    // 		label: 'الإستقبال',
    // 		routerLink: ['/']
    // 	},
    // 	{
    // 		label: 'القضايا ',
    // 		routerLink: ['/mineur/Affaire']
    // 	},
    // 	{
    // 		label: '     إحالة'
    // 	},
    // 	{
    // 		label: 'إدراج إحالة'
    // 	},
    // ]);
  }

  ngOnDestroy() {
    window.localStorage.removeItem("idValide");
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.documentService
      .trouverDocumentJudiciaireParId(this.changementLieu.documentId)
      .subscribe((data) => {
        console.log(
          "======================================================================================="
        );
        console.log(data.result);

        console.log(
          "======================================================================================="
        );

        this.changementLieu = data.result;

        this.numOrdinalDoc = this.changementLieu.documentId.numOrdinalDoc;

        this.dateDepotCarte = new Date(this.changementLieu.dateDepotCarte);
        this.dateEmission = new Date(this.changementLieu.dateDepotCarte);
        this.numOrdinalDocByAffaire =
          this.changementLieu.documentId.numOrdinalDocByAffaire;

        this.tribunal = this.changementLieu.affaire.tribunal.nom_tribunal;
        this.codeTribunal = this.changementLieu.affaire.tribunal.id;
        this.numAffaireT = this.changementLieu.affaire.affaireId.numAffaire;

        this.tribunalTransfereObjet = this.changementLieu.affaire.tribunal;

        this.tribunalTransfere =
          this.changementLieu.affaire.affaireLien.tribunal.nom_tribunal;
        this.codeTribunalTransfere =
          this.changementLieu.affaire.affaireLien.tribunal.id;
        this.tribunalTransfereObjet =
          this.changementLieu.affaire.affaireLien.tribunal;

        this.numAffaireTransfere =
          this.changementLieu.affaire.affaireLien.affaireId.numAffaire;

        this.update = true;
      });
  }
  ngOnInit() {
    this.currentUser = this.token.getUser();
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

    this.showAllGouvernorat();
    this.showAllTypeTribunal();
    this.calendar_ar = this.calendar_ar = this.appConfigService.calendarConfig;

    this.getEtablissement();
    this.getEtabChangeManiere();
  }

  //------------------------------------------------------------enfant-----------------------------------------------------------------------------------------------

  allowNewAddArrestation = false;
  allowNewCarte = false;
  alerte: boolean;
  search(id: String) {
    this.detentionService
      .trouverDetenuAvecSonStatutActuel(
        id,
        this.token.getUser().etablissement.id
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
              "arreter",
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

  // search(id: String) {
  //   this.crudservice.getLigneById("enfant", id).subscribe((data) => {
  //     this.enfantLocal = data.result;
  //     this.years =
  //       this.years +
  //       (new Date(this.enfantLocal?.dateNaissance).getFullYear() + 13) +
  //       ":" +
  //       new Date().getFullYear();
  //     this.crudservice
  //       .getLigneById("deces", this.enfantLocal.id)
  //       .subscribe((data) => {
  //         if (data.result == null) {
  //           this.crudservice
  //             .trouverEchappeNonApprehende("echappes", id)
  //             .subscribe((data) => {
  //               if (data.result == null) {
  //                 this.crudservice
  //                   .trouverDerniereDetentionParIdDetenu("arrestation", id)
  //                   .subscribe((data) => {
  //                     this.arrestation = data.result;
  //                     this.crudservice
  //                       .getLiberationById(
  //                         "liberation",
  //                         this.arrestation.arrestationId.idEnfant,
  //                         this.arrestation.arrestationId.numOrdinale
  //                       )
  //                       .subscribe((data) => {
  //                         if (data.result != null) {
  //                           this.isExist = false;
  //                           this.msg = " طفل  في حالـــة ســراح ";
  //                           this.statEchappesOrlibre = 1;
  //                         } else {
  //                           this.crudservice
  //                             .findResidenceByIdEnfantAndStatut0(
  //                               "residence",
  //                               this.arrestation.arrestationId.idEnfant,
  //                               this.arrestation.arrestationId.numOrdinale
  //                             )
  //                             .subscribe((data) => {
  //                               this.residence = data.result;

  //                               this.crudservice
  //                                 .findByIdEnfantAndStatutEnCour(
  //                                   "residence",
  //                                   this.arrestation.arrestationId.idEnfant,
  //                                   this.arrestation.arrestationId.numOrdinale
  //                                 )
  //                                 .subscribe((data) => {
  //                                   if (data.result != null) {
  //                                     this.isExist = false;
  //                                     this.statEchappesOrlibre = 2;
  //                                     this.msg =
  //                                       "      نقلـــة جـــارية إلـــى مركــز    " +
  //                                       data.result.etablissement
  //                                         .libelle_etablissement;
  //                                   }
  //                                 });
  //                               if (
  //                                 data.result.etablissement.id !=
  //                                 this.token.getUser().personelle.etablissement
  //                                   .id
  //                               ) {
  //                                 this.isExist = false;
  //                                 this.statEchappesOrlibre = 3;
  //                                 this.msg =
  //                                   "      طفــل مقيــم بمركــز     " +
  //                                   data.result.etablissement
  //                                     .libelle_etablissement;
  //                               }
  //                             });

  //                           this.crudservice
  //                             .getDocumentByArrestation(
  //                               this.arrestation.arrestationId.idEnfant,
  //                               this.arrestation.arrestationId.numOrdinale
  //                             )
  //                             .subscribe((data) => {
  //                               if (this.numOrdinalDoc) {
  //                                 this.numOrdinalDoc = this.numOrdinalDoc;
  //                               } else {
  //                                 this.numOrdinalDoc = data.result + 1;
  //                               }
  //                             });

  //                           this.crudservice
  //                             .findByArrestationToArret(
  //                               "affaire",
  //                               this.arrestation.arrestationId.idEnfant,
  //                               this.arrestation.arrestationId.numOrdinale
  //                             )
  //                             .subscribe((data) => {
  //                               if (data.result == null) {
  //                                 console.log(data.result);
  //                                 // this.service.add({
  //                                 // 	key: 'tst',
  //                                 // 	severity: 'error',
  //                                 // 	summary: '.   خطأ    ',
  //                                 // 	detail: id + 'pas d'affaire dans cette arrestation  '
  //                                 // });
  //                               } else {
  //                                 console.log(data.result);
  //                                 this.entitiesAffaire = data.result;
  //                               }
  //                             });
  //                           this.isExist = true;
  //                         }
  //                       });
  //                   });
  //               } else {
  //                 this.msg = "طفل في حالــــــة فـــرار";
  //                 this.statEchappesOrlibre = 0;
  //               }
  //             });
  //         } else {
  //           this.statEchappesOrlibre = 4;

  //           this.msg = "طفل فــي ذمــــــة اللـــه";
  //         }
  //       });
  //   });
  // }

  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  reload() {
    this.enfantLocal = null;
    this.isExist = false;
    this.msg = "";

    //window.location.reload();
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  showImg() {
    this.displayImg = true;
  }
  //------------------------------------------------------------affaire-----------------------------------------------------------------------------------------------
  tribunal = "";
  codeTribunal = "";

  numAffaireT: number;
  affaireObjet: Affaire;

  saveAffaire(affaire: Affaire) {
    this.tribunal = affaire.tribunal.nom_tribunal;
    this.codeTribunal = affaire.affaireId.idTribunal;
    this.numAffaireT = affaire.affaireId.numAffaire;
    this.affaireObjet = affaire;
    this.displayAffaire = false;
  }

  //------------------------------------------------------------affaire-----------------------------------------------------------------------------------------------

  showListAffaire() {
    this.displayAffaire = true;
  }

  //------------------------------------------------------------tribunal transferé-----------------------------------------------------------------------------------------------

  displayTribunalTransfere: boolean;
  tribunalTransfere = "";
  codeTribunalTransfere = "";

  numAffaireTransfere: number;
  tribunalTransfereObjet: Tribunal;

  showListTribunalTransfere() {
    this.displayTribunalTransfere = true;
  }
  saveTribunalTransfere(tribunal) {
    this.tribunalTransfere = tribunal.nom_tribunal;
    this.codeTribunalTransfere = tribunal.id;
    this.tribunalTransfereObjet = tribunal;
    this.displayTribunalTransfere = false;
  }
  getTribunalTransfere() {
    if (!this.update) {
      if (this.codeTribunalTransfere) {
        this.crudservice
          .getLigneById("tribunal", this.codeTribunalTransfere)
          .subscribe((data) => {
            if (data.result != null) {
              this.tribunalTransfereObjet = data.result;

              this.tribunalTransfere = data.result.nom_tribunal;
            } else {
              this.service.add({
                key: "tst",
                severity: "error",
                summary: ".   خطأ    ",
                detail: "تثبت من رمز المحكمة  ",
              });
              this.tribunalTransfere = "";
            }
          });
      } else {
        this.tribunalTransfere = "";
        this.tribunalTransfereObjet = null;
      }
    }
  }

  //--------------------------------------------------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------------------------------------------------

  onSubmit() {
    //  ||   (!this.jour  && !this.mois  && !this.annee )
    if (
      !this.dateDepotCarte ||
      (!this.etabChangeManiereLocal && !this.etablissementLocal) ||
      !this.affaireObjet ||
      (this.numAffaireTransfere && !this.tribunalTransfere) ||
      (!this.numAffaireTransfere && this.tribunalTransfere) ||
      (this.affaireObjet.affaireId.numAffaire == this.numAffaireTransfere &&
        this.affaireObjet.affaireId.idTribunal ==
          this.tribunalTransfereObjet.id)
    ) {
      this.service.add({
        key: "tst",
        severity: "error",
        summary: ".   خطأ    ",
        detail: " عليك تثبت     ",
      });
    } else {
      this.changementLieu = new ChangementLieu();
      this.documentId = new DocumentId();

      this.documentId.idEnfant = this.enfantLocal.id;
      this.documentId.numOrdinalArrestation =
        this.arrestation.arrestationId.numOrdinale;
      this.affaireIdOrigine = new AffaireId();
      this.affaireOrigine = new Affaire();
      if (this.tribunalTransfereObjet) {
        this.affaireIdOrigine.idEnfant = this.enfantLocal.id;
        this.affaireIdOrigine.idTribunal = this.tribunalTransfereObjet.id;
        this.affaireIdOrigine.numAffaire = this.numAffaireTransfere;
        this.affaireIdOrigine.numOrdinaleArrestation =
          this.arrestation.arrestationId.numOrdinale;

        this.affaireOrigine.arrestation = this.arrestation;
        this.affaireOrigine.tribunal = this.tribunalTransfereObjet;
        this.affaireOrigine.affaireId = this.affaireIdOrigine;
        this.affaireOrigine.affaireLien = this.affaireObjet;
      } else {
        this.affaireOrigine = this.affaireObjet;
      }

      this.affaireService
        .mettreAJourNumeroOrdinal(this.affaireOrigine)
        .subscribe((data) => {
          this.affaireOrigine = data.result;
          this.changementLieu.affaire = this.affaireOrigine;
          this.documentId.numOrdinalAffaire =
            this.affaireOrigine.numOrdinalAffaire;
          this.documentService
            .calculerNombreDocumentsJudiciairesParAffaire(
              this.arrestation.arrestationId.idEnfant,
              this.arrestation.arrestationId.numOrdinale,
              this.affaireOrigine.numOrdinalAffaire
            )
            .subscribe((data) => {
              this.documentId.numOrdinalDoc = this.numOrdinalDoc;

              if (this.numOrdinalDocByAffaire) {
                this.documentId.numOrdinalDocByAffaire =
                  this.numOrdinalDocByAffaire;
              } else {
                this.documentId.numOrdinalDocByAffaire = data.result + 1;
              }

              this.changementLieu.documentId = this.documentId;
              // this.changementLieu.typeDocument = "CHL";

              this.changementLieu.typeDocument = this.affaireObjet.typeDocument;

              this.changementLieu.affaire.typeAffaire =
                this.affaireObjet.typeAffaire;
              this.changementLieu.jour = this.jour;
              this.changementLieu.mois = this.mois;
              this.changementLieu.annee = this.annee;
              this.changementLieu.etabChangeManiere =
                this.etabChangeManiereLocal;
              this.changementLieu.etablissementMutation =
                this.etablissementLocal;
              this.changementLieu.type = this.radioValue;

              this.changementLieu.dateDepotCarte = this.datepipe.transform(
                this.dateDepotCarte,
                "yyyy-MM-dd"
              );
              this.changementLieu.dateEmission = this.datepipe.transform(
                this.dateDepotCarte,
                "yyyy-MM-dd"
              );

              // this.arreterlexecution.dateDepotCarte = this.dateDepotCarte;
              // this.arreterlexecution.dateEmission = this.dateEmission;

              this.changementLieu.numArrestation =
                this.residence.numArrestation;
              this.changementLieu.etablissement = this.residence.etablissement;
              // this.changementLieu.user = this.token.getUser();
              this.changementLieu.etablissementMutation =
                this.etablissementLocal;
              this.changementLieu.dateInsertion = this.datepipe.transform(
                new Date(),
                "yyyy-MM-dd"
              );

              console.log(
                "------------------------------------------------------------------"
              );
              console.log(this.changementLieu);
              console.log(
                "------------------------------------------------------------------"
              );
              this.showTransfert = true;
            });
        });
    }
  }

  confirmer() {
    this.crudservice
      .createLigne("changementLieu", this.changementLieu)
      .subscribe((data) => {
        console.log(data.result);
      });

    this.isSaved = true;
    this.isExist = false;
    this.showTransfert = false;
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

  showListEtabChangeManiere() {
    this.displayEtabChangeManiere = true;
  }
  saveEtabChangeManiere(etabChangeManiere: EtabChangeManiere) {
    this.etabChangeManiereLocal = etabChangeManiere;
    this.cause_etabChangeManiere =
      this.etabChangeManiereLocal.libelle_etabChangeManiere;
    this.displayEtabChangeManiere = false;
  }

  getEtabChangeManiere() {
    this.crudservice.getlistEntity("etabChangeManiere").subscribe((data) => {
      console.log(data);
      this.entitesEtabChangeManiere = data.result;
    });
  }

  showListEtablissement() {
    this.displayEtablissement = true;
  }
  saveEtablissement(etablissement: Etablissement) {
    this.etablissementLocal = etablissement;
    this.centre = this.etablissementLocal.libelle_etablissement;
    this.displayEtablissement = false;
  }

  getEtablissement() {
    this.crudservice.getlistEntity("etablissement").subscribe((data) => {
      console.log(data);
      this.entitesEtablissement = data.result;
      this.entitesEtablissement = this.entitesEtablissement.filter(
        (s) => s.id !== this.currentUser.etablissement.id
      );
    });
  }

  typeChangement() {
    if (this.radioValue == "changementEtab") {
      this.etablissementLocal = null;
      this.centre = "";
    } else {
      this.etabChangeManiereLocal = null;
      this.cause_etabChangeManiere = "";
    }
  }
}
