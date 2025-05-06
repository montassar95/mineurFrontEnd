import { DatePipe } from "@angular/common";
import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService, SelectItem } from "primeng/api";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { EventService } from "src/app/demo/service/eventservice";
import { NodeService } from "src/app/demo/service/nodeservice";
import { Affaire } from "src/app/domain/affaire";
import { AffaireId } from "src/app/domain/affaireId";
import { Arreterlexecution } from "src/app/domain/arreterlexecution";
import { DocumentId } from "src/app/domain/documentId";
import { Enfant } from "src/app/domain/enfant";
import { Gouvernorat } from "src/app/domain/gouvernorat";
import { MotifArreterlexecution } from "src/app/domain/motifArreterlexecution";
import { Residence } from "src/app/domain/residence";
import { Transfert } from "src/app/domain/transfert";
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
  selector: "app-add-arreter-lexecution",
  templateUrl: "./add-arreter-lexecution.component.html",
  styleUrls: ["./add-arreter-lexecution.component.css"],
  providers: [MessageService],
})
export class AddArreterLexecutionComponent implements OnInit {
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
  displayMotifArreterlexecution = false;
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
  arreterlexecution: Arreterlexecution;
  entitiesMotifArreterlexecution: MotifArreterlexecution[];
  statEchappesOrlibre: number;
  update = false;

  years = "";
  calendar_ar: any;
  @Input()
  numOrdinalDocByAffaire: number;
  typeTribunalSwich: SelectItem[];
  gouvernoratSwich: SelectItem[];

  types: SelectItem[];

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
        label: "     إحالة",
      },
      {
        label: "إدراج إحالة",
      },
    ]);
  }

  ngOnDestroy() {
    window.localStorage.removeItem("idValide");
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.documentService
      .trouverDocumentJudiciaireParId(this.arreterlexecution.documentId)
      .subscribe((data) => {
        console.log(
          "======================================================================================="
        );
        console.log(data.result);

        console.log(
          "======================================================================================="
        );

        this.arreterlexecution = data.result;

        this.numOrdinalDoc = this.arreterlexecution.documentId.numOrdinalDoc;

        this.dateDepotCarte = new Date(this.arreterlexecution.dateDepotCarte);
        this.dateEmission = new Date(this.arreterlexecution.dateDepotCarte);
        this.numOrdinalDocByAffaire =
          this.arreterlexecution.documentId.numOrdinalDocByAffaire;

        this.tribunal = this.arreterlexecution.affaire.tribunal.nom_tribunal;
        this.codeTribunal = this.arreterlexecution.affaire.tribunal.id;
        this.numAffaireT = this.arreterlexecution.affaire.affaireId.numAffaire;

        this.tribunalTransfereObjet = this.arreterlexecution.affaire.tribunal;

        this.codeMotif = this.arreterlexecution.motifArreterlexecution.id;
        this.motif =
          this.arreterlexecution.motifArreterlexecution.libelleMotifArretere;

        this.motifObjet = this.arreterlexecution.motifArreterlexecution;

        this.tribunalTransfere =
          this.arreterlexecution.affaire.affaireLien.tribunal.nom_tribunal;
        this.codeTribunalTransfere =
          this.arreterlexecution.affaire.affaireLien.tribunal.id;
        this.tribunalTransfereObjet =
          this.arreterlexecution.affaire.affaireLien.tribunal;

        this.numAffaireTransfere =
          this.arreterlexecution.affaire.affaireLien.affaireId.numAffaire;

        this.update = true;
      });
  }
  ngOnInit() {
    this.types = [];
    this.types.push({ label: "إيقاف تنفيذ الحكم ", value: "ArretEx" });
    this.types.push({ label: "ســــــــــــراح", value: "L" });

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

    this.listeMotif();
    this.showAllGouvernorat();
    this.showAllTypeTribunal();
    this.calendar_ar = this.appConfigService.calendarConfig;
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

  motif = "";
  codeMotif = "";

  motifObjet: MotifArreterlexecution;

  saveMotifArreterlexecution(motifArreterlexecution: MotifArreterlexecution) {
    this.codeMotif = motifArreterlexecution.id;
    this.motif = motifArreterlexecution.libelleMotifArretere;

    this.motifObjet = motifArreterlexecution;
    this.displayMotifArreterlexecution = false;
  }

  getMotifArreterlexecution() {
    this.crudservice
      .getLigneById("motifArreterlexecution", this.codeMotif)
      .subscribe((data) => {
        if (data.result != null) {
          this.motifObjet = data.result;

          this.motif = data.result.libelleMotifArretere;
        } else {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: "تثبت من رمز    ",
          });
          this.motif = "";
          this.motifObjet = null;
        }
      });
  }

  showListAffaire() {
    this.displayAffaire = true;
  }

  showListMotifArreterlexecution() {
    this.displayMotifArreterlexecution = true;
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
    // this.dateEmission = this.datepipe.transform(this.dateDepotCarte, 'yyyy-MM-dd');
    // this.dateDepotCarte = this.datepipe.transform(this.dateDepotCarte, 'yyyy-MM-dd');

    if (
      !this.selectedType ||
      !this.dateDepotCarte ||
      !this.motifObjet ||
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
      this.arreterlexecution = new Arreterlexecution();
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
          console.log("hihi");
          console.log(data.result);

          this.affaireOrigine = data.result;
          this.arreterlexecution.affaire = this.affaireOrigine;
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

              this.arreterlexecution.documentId = this.documentId;
              this.arreterlexecution.typeDocument = "ArretEx";
              this.arreterlexecution.typeFile = this.selectedType;

              this.arreterlexecution.dateDepotCarte = this.datepipe.transform(
                this.dateDepotCarte,
                "yyyy-MM-dd"
              );
              this.arreterlexecution.dateEmission = this.datepipe.transform(
                this.dateDepotCarte,
                "yyyy-MM-dd"
              );

              // this.arreterlexecution.dateDepotCarte = this.dateDepotCarte;
              // this.arreterlexecution.dateEmission = this.dateEmission;

              this.arreterlexecution.motifArreterlexecution = this.motifObjet;

              this.arreterlexecution.numArrestation =
                this.residence.numArrestation;
              this.arreterlexecution.etablissement =
                this.residence.etablissement;
              // this.arreterlexecution.user = this.token.getUser();
              this.arreterlexecution.dateInsertion = this.datepipe.transform(
                new Date(),
                "yyyy-MM-dd"
              );

              console.log(
                "------------------------------------------------------------------"
              );
              console.log(this.arreterlexecution);
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
      .createLigne("arreterlexecution", this.arreterlexecution)
      .subscribe((data) => {
        console.log(data.result);
      });

    this.isSaved = true;
    this.isExist = false;
    this.showTransfert = false;
  }

  listeMotif() {
    this.crudservice
      .getlistEntity("motifArreterlexecution")
      .subscribe((data) => {
        if (data.result == null) {
          console.log(data.result);
        } else {
          console.log(data.result);
          this.entitiesMotifArreterlexecution = data.result;
        }
      });
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
  selectedType: string;
  typeFile() {
    console.log(this.selectedType);
  }

  //   reglerDate(date){
  // 	const words =  date.split('/');
  // 	const x =  "/";
  // 	return  date =words[2]+x+words[1]+x+words[0];
  //   }
  //   reglerDateSql(date){
  // 	const words =  date.split('-');
  // 	const x =  "-";
  // 	return  date =words[2]+x+words[1]+x+words[0];
  //   }
}
