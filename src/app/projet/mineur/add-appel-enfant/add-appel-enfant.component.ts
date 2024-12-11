import { DatePipe } from "@angular/common";
import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { EventService } from "src/app/demo/service/eventservice";
import { NodeService } from "src/app/demo/service/nodeservice";
import { Affaire } from "src/app/domain/affaire";
import { AffaireId } from "src/app/domain/affaireId";
import { AppelEnfant } from "src/app/domain/appelEnfant";
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
  selector: "app-add-appel-enfant",
  templateUrl: "./add-appel-enfant.component.html",
  styleUrls: ["./add-appel-enfant.component.css"],
  providers: [MessageService],
})
export class AddAppelEnfantComponent implements OnInit {
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
  showAppelEnfant = false;
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
  appelEnfant: AppelEnfant;
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
      { label: "طعن الطفل بالاستئناف" },
      { label: "إدراج" },
    ]);
  }

  ngOnDestroy() {
    window.localStorage.removeItem("idValide");
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.documentService
      .trouverDocumentJudiciaireParId(this.appelEnfant.documentId)
      .subscribe((data) => {
        console.log(
          "======================================================================================="
        );
        console.log(data.result);

        console.log(
          "======================================================================================="
        );

        this.appelEnfant = data.result;

        this.dateDepotCarte = this.appelEnfant.dateDepotCarte;
        this.dateDepotCarte = new Date(this.dateDepotCarte);
        this.dateEmission = new Date(this.dateEmission);

        this.codeTribunal = this.appelEnfant.affaire.tribunal.id;

        this.tribunal = this.appelEnfant.affaire.tribunal.nom_tribunal;
        this.numAffaireT = this.appelEnfant.affaire.tribunal.id;

        this.numOrdinalDoc = this.appelEnfant.documentId.numOrdinalDoc;
        this.numOrdinalDocByAffaire =
          this.appelEnfant.documentId.numOrdinalDocByAffaire;

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

      this.appelEnfant = new AppelEnfant();
      this.documentId = new DocumentId();

      this.documentId.idEnfant = this.enfantLocal.id;
      this.documentId.numOrdinalArrestation =
        this.arrestation.arrestationId.numOrdinale;

      this.appelEnfant.affaire = this.affaireOrigine;
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
          this.appelEnfant.documentId = this.documentId;
          this.appelEnfant.typeDocument = "AE";

          // this.appelEnfant.dateDepotCarte = this.dateDepotCarte;
          // this.appelEnfant.dateEmission = this.dateEmission;

          this.appelEnfant.dateDepotCarte = this.datepipe.transform(
            this.dateDepotCarte,
            "yyyy-MM-dd"
          );
          this.appelEnfant.dateEmission = this.datepipe.transform(
            this.dateDepotCarte,
            "yyyy-MM-dd"
          );

          this.appelEnfant.numArrestation = this.residence.numArrestation;
          this.appelEnfant.etablissement = this.residence.etablissement;
          //this.appelEnfant.user = this.token.getUser();
          this.appelEnfant.dateInsertion = this.datepipe.transform(
            new Date(),
            "yyyy-MM-dd"
          );
          this.showAppelEnfant = true;
        });
    }
  }

  confirmer() {
    this.crudservice
      .createLigne("appelEnfant", this.appelEnfant)
      .subscribe((data) => {
        console.log(data.result);
      });

    this.isSaved = true;
    this.isExist = false;
    this.showAppelEnfant = false;
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
