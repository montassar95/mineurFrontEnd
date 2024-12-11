import { DatePipe } from "@angular/common";
import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { EventService } from "src/app/demo/service/eventservice";
import { NodeService } from "src/app/demo/service/nodeservice";
import { Affaire } from "src/app/domain/affaire";
import { AffaireId } from "src/app/domain/affaireId";
import { AppelEnfant } from "src/app/domain/appelEnfant";
import { CartePropagation } from "src/app/domain/cartePropagation";
import { DocumentId } from "src/app/domain/documentId";
import { Enfant } from "src/app/domain/enfant";
import { Residence } from "src/app/domain/residence";
import { Tribunal } from "src/app/domain/tribunal";
import { TypeAffaire } from "src/app/domain/typeAffaire";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { AppConfigService } from "../app-config.service";
import { DocumentService } from "src/app/demo/service/document.service";
import { DetentionService } from "src/app/demo/service/detention.service";
import { AffaireService } from "src/app/demo/service/affaire.service";

@Component({
  selector: "app-add-propagation",
  templateUrl: "./add-propagation.component.html",
  styleUrls: ["./add-propagation.component.css"],
  providers: [MessageService],
})
export class AddPropagationComponent implements OnInit {
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

  entitiesTribunal: Tribunal[];
  entitiesTypeAffaire: TypeAffaire[];
  displayImg: boolean;
  displayAffaire = false;
  entitiesAffaire: Affaire[];
  isExist = false;
  isSaved = false;
  update = false;
  showCartePropagation = false;
  msg = "";
  arrestation: any;

  affaireIdOrigine: AffaireId;
  affaireOrigine: Affaire;
  numOrdinalDoc: number;
  numOrdinalDocByAffaire: number;
  dateEmission;
  dateDepotCarte;
  documentId: DocumentId;
  @Input()
  cartePropagation: CartePropagation;
  residence: Residence;
  statEchappesOrlibre: number;
  jour: any;
  mois: any;
  annee: any;
  years = "";
  calendar_ar: any;
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
    { label: " مراجعة     ", value: "/mineur/Revue" },
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
    private detentionService: DetentionService,
    private affaireService: AffaireService,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private token: TokenStorageService,
    private nodeService: NodeService,
    private service: MessageService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    public datepipe: DatePipe,
    private appConfigService: AppConfigService
  ) {
    // this.breadcrumbService.setItems([
    //   {label: 'الإستقبال', routerLink: ['/']},
    //   {label: 'إجراءات الطعن ' , routerLink: ['/mineur/ProcedureAppel']},
    //   {label: 'طعن الطفل بالاستئناف' },
    //   {label: 'إدراج' },
    // ]);
  }

  ngOnDestroy() {
    window.localStorage.removeItem("idValide");
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.documentService
      .trouverDocumentJudiciaireParId(this.cartePropagation.documentId)
      .subscribe((data) => {
        console.log(
          "======================================================================================="
        );
        console.log(data.result);

        console.log(
          "======================================================================================="
        );

        this.cartePropagation = data.result;

        this.dateDepotCarte = this.cartePropagation.dateDepotCarte;
        this.dateDepotCarte = new Date(this.dateDepotCarte);
        this.dateEmission = new Date(this.dateEmission);

        this.codeTribunal = this.cartePropagation.affaire.tribunal.id;

        this.tribunal = this.cartePropagation.affaire.tribunal.nom_tribunal;
        this.numAffaireT = this.cartePropagation.affaire.tribunal.id;

        this.numOrdinalDoc = this.cartePropagation.documentId.numOrdinalDoc;
        this.numOrdinalDocByAffaire =
          this.cartePropagation.documentId.numOrdinalDocByAffaire;

        this.update = true;
      });
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

    this.crudservice.getlistEntity("tribunal").subscribe((data) => {
      console.log(data);
      this.entitiesTribunal = data.result;
    });

    this.crudservice.getlistEntity("typeAffaire").subscribe((data) => {
      console.log(data);
      this.entitiesTypeAffaire = data.result;
    });

    this.calendar_ar = this.calendar_ar = this.appConfigService.calendarConfig;
  }
  reload() {
    this.enfantLocal = null;
    this.isExist = false;
    this.msg = "";
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
              "prolonger",
              this.arrestation.arrestationId.idEnfant,
              this.arrestation.arrestationId.numOrdinale
            )
            .subscribe((data) => {
              if (data.result == null) {
              } else {
                this.entitiesAffaire = data.result;
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
  //                             .findByArrestationToPropaga(
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
  showListAffaire() {
    this.displayAffaire = true;
  }

  onSubmit() {
    console.log(this.mois);
    if (
      !this.dateDepotCarte ||
      !this.dateEmission ||
      !this.affaireObjet ||
      (!this.jour && !this.mois && !this.annee)
    ) {
      this.service.add({
        key: "tst",
        severity: "error",
        summary: ".   خطأ    ",
        detail: " عليك تثبت     ",
      });
    } else {
      this.affaireOrigine = new Affaire();
      this.affaireOrigine = this.affaireObjet;

      this.cartePropagation = new CartePropagation();
      this.documentId = new DocumentId();

      this.documentId.idEnfant = this.enfantLocal.id;
      this.documentId.numOrdinalArrestation =
        this.arrestation.arrestationId.numOrdinale;

      this.cartePropagation.affaire = this.affaireOrigine;
      this.documentId.numOrdinalAffaire = this.affaireOrigine.numOrdinalAffaire;
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

          this.documentId.numOrdinalAffaire =
            this.affaireOrigine.numOrdinalAffaire;
          this.cartePropagation.documentId = this.documentId;
          this.cartePropagation.typeDocument = "CP";

          this.cartePropagation.jour = this.jour;
          this.cartePropagation.mois = this.mois;
          this.cartePropagation.annee = this.annee;

          this.cartePropagation.dateDepotCarte = this.datepipe.transform(
            this.dateDepotCarte,
            "yyyy-MM-dd"
          );
          this.cartePropagation.dateEmission = this.datepipe.transform(
            this.dateEmission,
            "yyyy-MM-dd"
          );

          this.cartePropagation.numArrestation = this.residence.numArrestation;
          this.cartePropagation.etablissement = this.residence.etablissement;
          // this.cartePropagation.user = this.token.getUser();
          this.cartePropagation.dateInsertion = this.datepipe.transform(
            new Date(),
            "yyyy-MM-dd"
          );
          this.showCartePropagation = true;
        });
    }
  }

  confirmer() {
    this.crudservice
      .createLigne("cartePropagation", this.cartePropagation)
      .subscribe((data) => {
        console.log(data.result);
      });

    this.isSaved = true;
    this.isExist = false;
    this.showCartePropagation = false;
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
