import { DatePipe } from "@angular/common";
import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService, SelectItem } from "primeng/api";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { EventService } from "src/app/demo/service/eventservice";
import { NodeService } from "src/app/demo/service/nodeservice";
import { Affaire } from "src/app/domain/affaire";
import { AffaireId } from "src/app/domain/affaireId";

import { DocumentId } from "src/app/domain/documentId";
import { Enfant } from "src/app/domain/enfant";
import { Gouvernorat } from "src/app/domain/gouvernorat";
import { Residence } from "src/app/domain/residence";
import { Revue } from "src/app/domain/revue";

import { Tribunal } from "src/app/domain/tribunal";
import { TypeAffaire } from "src/app/domain/typeAffaire";
import { TypeTribunal } from "src/app/domain/typeTribunal";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { AppConfigService } from "../app-config.service";
import { DocumentService } from "src/app/demo/service/document.service";
import { AffaireService } from "src/app/demo/service/affaire.service";
import { DetentionService } from "src/app/demo/service/detention.service";

@Component({
  selector: "app-add-revue",
  templateUrl: "./add-revue.component.html",
  styleUrls: ["./add-revue.component.css"],
  providers: [MessageService],
})
export class AddRevueComponent implements OnInit {
  refuse: boolean = false;
  displayTribunalTransfere = false;
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
  typeTribunalSwich: SelectItem[];
  gouvernoratSwich: SelectItem[];
  entitiesTribunal: Tribunal[];
  displayImg: boolean;
  displayAffaire = false;
  entitiesAffaire: Affaire[];
  isExist = false;
  isSaved = false;
  showRevue = false;
  showRefuseRevue = false;
  update = false;
  msg = "";
  arrestation: any;
  affaireIdOrigine: AffaireId;
  affaireOrigine: Affaire;
  numOrdinalDoc: number;
  numOrdinalDocByAffaire: number;
  dateEmission;
  dateDepotCarte;
  documentId: DocumentId;
  years = "";
  calendar_ar: any;
  @Input()
  revue: Revue;
  textJugement: any;
  statEchappesOrlibre: number;

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
    this.breadcrumbService.setItems([
      { label: "الإستقبال", routerLink: ["/"] },

      { label: "إجراءات الطعن ", routerLink: ["/mineur/ProcedureAppel"] },
      { label: " مراجعة" },
      { label: "إدراج" },
    ]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.documentService
      .trouverDocumentJudiciaireParId(this.revue.documentId)
      .subscribe((data) => {
        console.log(
          "======================================================================================="
        );
        console.log(data.result);

        console.log(
          "======================================================================================="
        );

        this.revue = data.result;

        this.dateDepotCarte = this.revue.dateDepotCarte;

        this.codeTribunal = this.revue.affaire.tribunal.id;

        this.tribunal = this.revue.affaire.tribunal.nom_tribunal;
        this.numAffaireT = this.revue.affaire.tribunal.id;

        this.numOrdinalDoc = this.revue.documentId.numOrdinalDoc;
        this.numOrdinalDocByAffaire =
          this.revue.documentId.numOrdinalDocByAffaire;

        this.textJugement = this.revue.textJugement;

        this.update = true;
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

    this.crudservice.getlistEntity("tribunal").subscribe((data) => {
      console.log(data);
      this.entitiesTribunal = data.result;
    });

    this.showAllGouvernorat();
    this.showAllTypeTribunal();

    this.calendar_ar = this.calendar_ar = this.appConfigService.calendarConfig;
  }
  reload() {
    this.enfantLocal = null;
    this.isExist = false;
    this.msg = "";

    //window.location.reload();
  }
  showRefus() {
    if (this.refuse) {
      this.codeTribunalTransfere = "";
      this.tribunalTransfere = "";
      this.tribunalTransfereObjet = null;
      this.numAffaireTransfere = null;
    }
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
              "appelerOuReviser",
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
  // search(id: String) {
  //   this.crudservice.getLigneById("enfant", id)
  //     .subscribe(data => {

  //         this.enfantLocal = data.result;
  //         this.years= this.years + (new Date(this.enfantLocal?.dateNaissance).getFullYear()+13)+':'+(new Date().getFullYear());
  //         this.crudservice.getLigneById("deces",this.enfantLocal.id)
  //         .subscribe(data => {

  //          if (data.result == null) {
  //           this.crudservice.trouverEchappeNonApprehende("echappes", id)
  //           .subscribe(data => {

  //             if (data.result == null) {
  //             this.crudservice.trouverDerniereDetentionParIdDetenu("arrestation", id)
  //             .subscribe(data => {
  //               this.arrestation = data.result;
  //             this.crudservice.getLiberationById("liberation", this.arrestation.arrestationId.idEnfant,this.arrestation.arrestationId.numOrdinale)
  //             .subscribe(data => {
  //                         if (data.result != null) {

  //                 this.isExist = false;
  //                 this.msg = ' طفل  في حالـــة ســراح ';
  //                 this.statEchappesOrlibre=1;
  //               } else {

  //                 this.crudservice.findResidenceByIdEnfantAndStatut0("residence",this.arrestation.arrestationId.idEnfant,this.arrestation.arrestationId.numOrdinale)
  //                 .subscribe(data => {

  //                         this.residence = data.result ;
  //                         this.crudservice.findByIdEnfantAndStatutEnCour("residence",this.arrestation.arrestationId.idEnfant,this.arrestation.arrestationId.numOrdinale)
  //                         .subscribe(data => {

  //                       if(data.result != null){

  //                       this.isExist = false;
  //                       this.statEchappesOrlibre=2;
  //                       this.msg ="      نقلـــة جـــارية إلـــى مركــز    "+ data.result.etablissement.libelle_etablissement ;

  //                       }

  //                         });
  //                         if(data.result.etablissement.id != this.token.getUser().personelle.etablissement.id){

  //                           this.isExist = false;
  //                           this.statEchappesOrlibre=3;
  //                           this.msg ="      طفــل مقيــم بمركــز     "+ data.result.etablissement.libelle_etablissement ;

  //                         }
  //                 });

  //                 this.crudservice.getDocumentByArrestation(this.arrestation.arrestationId.idEnfant, this.arrestation.arrestationId.numOrdinale)
  //                   .subscribe(data => {

  //                     if(this.numOrdinalDoc){

  //                       this.numOrdinalDoc = this.numOrdinalDoc;
  //                       }
  //                     else{
  //                       this.numOrdinalDoc = data.result + 1;
  //                     }

  //                   });

  //           this.crudservice.findByArrestationByCJorCR("affaire", this.arrestation.arrestationId.idEnfant, this.arrestation.arrestationId.numOrdinale )
  //           .subscribe(data => {
  //             if (data.result == null) {
  //               console.log(data.result);

  //             } else {
  //               console.log(data.result);
  //               this.entitiesAffaire = data.result;

  //             }

  //           });

  //                 this.isExist = true;
  //               }

  //             });
  //             });

  //           }
  //           else {
  //             this.msg = "طفل في حالــــــة فـــرار";
  //             this.statEchappesOrlibre=0;

  //             }
  //           });
  //          } else {

  //            this.statEchappesOrlibre=4;

  //            this.msg = "طفل فــي ذمــــــة اللـــه";
  //          }

  //         });

  //     });
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

  //--------------------------------------------------------------------------------------------------------------------------

  onSubmit() {
    // this.dateEmission = this.datepipe.transform(this.dateDepotCarte, 'yyyy-MM-dd');
    // this.dateDepotCarte = this.datepipe.transform(this.dateDepotCarte, 'yyyy-MM-dd');

    if (
      !this.dateDepotCarte ||
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
      this.affaireIdOrigine = new AffaireId();
      this.affaireOrigine = new Affaire();

      this.revue = new Revue();
      this.documentId = new DocumentId();

      this.documentId.idEnfant = this.enfantLocal.id;
      this.documentId.numOrdinalArrestation =
        this.arrestation.arrestationId.numOrdinale;

      if (this.tribunalTransfereObjet) {
        this.affaireIdOrigine.idEnfant = this.enfantLocal.id;
        this.affaireIdOrigine.idTribunal = this.tribunalTransfereObjet.id;
        this.affaireIdOrigine.numAffaire = this.numAffaireTransfere;

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
          this.revue.affaire = this.affaireOrigine;
          this.revue.affaire.typeAffaire = this.affaireObjet.typeAffaire;
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

              this.documentId.numOrdinalAffaire =
                this.affaireOrigine.numOrdinalAffaire;
              this.revue.documentId = this.documentId;
              this.revue.typeDocument = "CR";

              this.revue.textJugement = this.textJugement;

              this.revue.dateDepotCarte = this.datepipe.transform(
                this.dateDepotCarte,
                "yyyy-MM-dd"
              );
              this.revue.dateEmission = this.datepipe.transform(
                this.dateDepotCarte,
                "yyyy-MM-dd"
              );

              // this.revue.dateDepotCarte = this.dateDepotCarte;
              // this.revue.dateEmission = this.dateEmission;

              this.revue.numArrestation = this.residence.numArrestation;
              this.revue.etablissement = this.residence.etablissement;
              //this.revue.user = this.token.getUser();
              this.revue.dateInsertion = this.datepipe.transform(
                new Date(),
                "yyyy-MM-dd"
              );
              this.showRevue = true;
            });
        });
    }
  }

  showListTribunalTransfere() {
    this.displayTribunalTransfere = true;
  }
  confirmer() {
    console.log(this.refuse);
    if (!this.refuse) {
      this.crudservice.createLigne("revue", this.revue).subscribe((data) => {
        console.log(data.result);
      });

      this.isSaved = true;
      this.isExist = false;
      this.showRevue = false;
    } else {
      this.revue.typeDocument = "CRR";
      this.crudservice
        .createLigne("refuseRevue", this.revue)
        .subscribe((data) => {
          console.log(data.result);
        });

      this.isSaved = true;
      this.isExist = false;
      this.showRevue = false;
    }
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

  tribunalTransfere = "";
  codeTribunalTransfere = "";

  numAffaireTransfere: number;
  tribunalTransfereObjet: Tribunal;
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

  saveTribunalTransfere(tribunal) {
    this.tribunalTransfere = tribunal.nom_tribunal;
    this.codeTribunalTransfere = tribunal.id;
    this.tribunalTransfereObjet = tribunal;
    this.displayTribunalTransfere = false;
  }
  // reglerDate(date){
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
