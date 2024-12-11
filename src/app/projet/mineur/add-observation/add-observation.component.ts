import { DatePipe } from "@angular/common";
import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { AffaireService } from "src/app/demo/service/affaire.service";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { DetentionService } from "src/app/demo/service/detention.service";
import { DocumentService } from "src/app/demo/service/document.service";
import { EventService } from "src/app/demo/service/eventservice";
import { NodeService } from "src/app/demo/service/nodeservice";
import { Affaire } from "src/app/domain/affaire";
import { AffaireId } from "src/app/domain/affaireId";
import { DocumentId } from "src/app/domain/documentId";
import { Enfant } from "src/app/domain/enfant";
import { Observation } from "src/app/domain/observation";
import { Residence } from "src/app/domain/residence";
import { Tribunal } from "src/app/domain/tribunal";
import { TypeAffaire } from "src/app/domain/typeAffaire";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";
import { AppConfigService } from "../app-config.service";

@Component({
  selector: "app-add-observation",
  templateUrl: "./add-observation.component.html",
  styleUrls: ["./add-observation.component.css"],
  providers: [MessageService],
})
export class AddObservationComponent implements OnInit {
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

  isExist: boolean = false;

  isSaved = false;
  update = false;
  showObservation = false;
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
  observation: Observation;
  residence: Residence;
  statEchappesOrlibre: number;

  years = "";
  calendar_ar: any;

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
      { label: " طعن الطفل بالتعقيب "},
      { label: "إدراج" },
    ]);
  }

  ngOnDestroy() {
    window.localStorage.removeItem("idValide");
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.documentService
      .trouverDocumentJudiciaireParId(this.observation.documentId)
      .subscribe((data) => {
        console.log(
          "======================================================================================="
        );
        console.log(data.result);

        console.log(
          "======================================================================================="
        );

        this.observation = data.result;

        this.dateDepotCarte = this.observation.dateDepotCarte;
        this.dateDepotCarte = new Date(this.dateDepotCarte);
        this.dateEmission = new Date(this.dateEmission);

        this.codeTribunal = this.observation.affaire.tribunal.id;

        this.tribunal = this.observation.affaire.tribunal.nom_tribunal;
        this.numAffaireT = this.observation.affaire.tribunal.id;

        this.numOrdinalDoc = this.observation.documentId.numOrdinalDoc;
        this.numOrdinalDocByAffaire =
          this.observation.documentId.numOrdinalDocByAffaire;

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
  //------------------------------------------------------------enfant-----------------------------------------------------------------------------------------------

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
    // this.dateEmission = this.datepipe.transform(this.dateDepotCarte, 'yyyy-MM-dd');
    // this.dateDepotCarte = this.datepipe.transform(this.dateDepotCarte, 'yyyy-MM-dd');

    if (!this.dateDepotCarte || !this.affaireObjet) {
      this.service.add({
        key: "tst",
        severity: "error",
        summary: ".   خطأ    ",
        detail: " عليك تثبت     ",
      });
    } else {
      this.affaireOrigine = new Affaire();
      this.affaireOrigine = this.affaireObjet;

      this.observation = new Observation();
      this.documentId = new DocumentId();

      this.documentId.idEnfant = this.enfantLocal.id;
      this.documentId.numOrdinalArrestation =
        this.arrestation.arrestationId.numOrdinale;

      this.observation.affaire = this.affaireOrigine;
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
          this.observation.documentId = this.documentId;
          this.observation.typeDocument = "AE";

          // this.observation.dateDepotCarte = this.dateDepotCarte;
          // this.observation.dateEmission = this.dateEmission;

          this.observation.dateDepotCarte = this.datepipe.transform(
            this.dateDepotCarte,
            "yyyy-MM-dd"
          );
          this.observation.dateEmission = this.datepipe.transform(
            this.dateDepotCarte,
            "yyyy-MM-dd"
          );

          this.observation.numArrestation = this.residence.numArrestation;
          this.observation.etablissement = this.residence.etablissement;
          //this.observation.user = this.token.getUser();
          this.observation.dateInsertion = this.datepipe.transform(
            new Date(),
            "yyyy-MM-dd"
          );
          this.showObservation = true;
        });
    }
  }

  confirmer() {
    this.crudservice
      .createLigne("observation", this.observation)
      .subscribe((data) => {
        console.log(data.result);
      });

    this.isSaved = true;
    this.isExist = false;
    this.showObservation = false;
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
