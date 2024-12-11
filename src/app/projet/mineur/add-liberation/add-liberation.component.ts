import { DatePipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { EventService } from "src/app/demo/service/eventservice";
import { NodeService } from "src/app/demo/service/nodeservice";
import { Affaire } from "src/app/domain/affaire";
import { Arrestation } from "src/app/domain/arrestation";
import { ArrestationId } from "src/app/domain/arrestationId";

import { CauseLiberation } from "src/app/domain/causeLiberation";

import { Enfant } from "src/app/domain/enfant";
import { EtabChangeManiere } from "src/app/domain/etabChangeManiere";

import { Liberation } from "src/app/domain/liberation";
import { LiberationId } from "src/app/domain/liberationId";
import { ResidenceId } from "src/app/domain/residanceId";

import { Residence } from "src/app/domain/residence";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { AppConfigService } from "../app-config.service";
import { DetentionService } from "src/app/demo/service/detention.service";
import { AffaireService } from "src/app/demo/service/affaire.service";
import { FicheDeDetentionDto } from "src/app/domain/ficheDeDetentionDto";

@Component({
  selector: "app-add-liberation",
  templateUrl: "./add-liberation.component.html",
  styleUrls: ["./add-liberation.component.css"],

  providers: [MessageService],
})
export class AddLiberationComponent implements OnInit, OnDestroy {
  centre = "";
  numOrdinale = "";
  numArrestation = "";
  dateEntreLocal;
  cause = "";
  cause_etabChangeManiere = "";
  idValide: string;
  remarqueLiberation = "";
  enfantLocal: Enfant;
  roles: string[] = [];
  currentUser: any;
  arrestation: Arrestation;
  arrestationId: ArrestationId;
  residence: Residence;

  displayImg: boolean;

  msg = "";
  dateLiberation: any;
  calendar_ar: any;
  entitesCauseLiberation: CauseLiberation[];
  entitesEtabChangeManiere: EtabChangeManiere[];
  liberation: Liberation;

  idEnfant: any;
  causeLiberationLocal: CauseLiberation;
  etabChangeManiereLocal: EtabChangeManiere;
  isLiberation = false;
  isMutation = false;
  isDeces = false;

  displayCauseLiberation = false;
  displayEtabChangeManiere = false;

  isEchapper = false;

  showLiberation = false;

  isSaved = false;

  affaires: Affaire[] = [];

  years = "";
  displayAddArrestation = false;
  residenceId: any;
  nextAdd: boolean;

  constructor(
    private crudservice: CrudEnfantService,
    private detentionService: DetentionService,
    private affaireService: AffaireService,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private token: TokenStorageService,
    public datepipe: DatePipe,
    private nodeService: NodeService,
    private service: MessageService,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private appConfigService: AppConfigService
  ) {}
  ngOnDestroy() {
    window.localStorage.removeItem("idValide");
  }
  ngOnInit() {
    this.currentUser = this.token.getUser();

    let idValide = window.localStorage.getItem("idValide");

    if (idValide) {
      this.idValide = idValide;
      this.search(idValide);
    } else {
      this.router.navigate(["/mineur/Changement"]);
    }

    this.currentUser = this.token.getUser();
    console.log(this.currentUser);

    this.crudservice.getlistEntity("causeLiberation").subscribe((data) => {
      console.log(data);
      this.entitesCauseLiberation = data.result;
    });

    this.crudservice.getlistEntity("etabChangeManiere").subscribe((data) => {
      console.log(data);
      this.entitesEtabChangeManiere = data.result;
    });

    this.calendar_ar = this.calendar_ar = this.appConfigService.calendarConfig;
  }
  refresh() {
    this.allowNewAddArrestation = false;
    this.isSaved = false;
    this.dateLiberation = new Date();
  }

  showListCauseLiberation() {
    this.displayCauseLiberation = true;
  }
  showListEtabChangeManiere() {
    this.displayEtabChangeManiere = true;
  }

  saveCauseLiberation(causeLiberation: CauseLiberation) {
    this.causeLiberationLocal = causeLiberation;
    this.cause = this.causeLiberationLocal.libelleCauseLiberation;
    this.displayCauseLiberation = false;

    if (causeLiberation.id != 50) {
      this.etabChangeManiereLocal = null;
      this.cause_etabChangeManiere = "";
      this.displayEtabChangeManiere = false;
    }
  }
  saveEtabChangeManiere(etabChangeManiere: EtabChangeManiere) {
    this.etabChangeManiereLocal = etabChangeManiere;
    this.cause_etabChangeManiere =
      this.etabChangeManiereLocal.libelle_etabChangeManiere;
    this.displayEtabChangeManiere = false;
  }

  //------------------------------------------------------------enfant-----------------------------------------------------------------------------------------------

  allowNewAddArrestation = false;
  allowNewCarte = false;
  alerte = true;
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

          this.showArrestation(this.arrestation);
        }
      });
  }
  ficheDeDetentionDto: FicheDeDetentionDto;
  showArrestation(arrestation: Arrestation) {
    this.arrestation = arrestation;
    this.affaireService
      .obtenirInformationsDeDetentionParIdDetention(
        arrestation.arrestationId.idEnfant,
        arrestation.arrestationId.numOrdinale
      )
      .subscribe((data) => {
        console.log(data.result);
        this.ficheDeDetentionDto = data.result;
        this.affaires = this.ficheDeDetentionDto.affaires;
      });
  }

  save() {
    if (
      !this.dateLiberation ||
      !this.causeLiberationLocal ||
      (this.causeLiberationLocal.id == 50 && !this.etabChangeManiereLocal)
    ) {
      this.service.add({
        key: "tst",
        severity: "error",
        summary: ".   خطأ    ",
        detail: " عليك تثبت     ",
      });
    } else {
      this.dateLiberation = this.datepipe.transform(
        this.dateLiberation,
        "yyyy-MM-dd"
      );

      let liberationId = new LiberationId();

      liberationId.idEnfant = this.arrestation.arrestationId.idEnfant;
      liberationId.numOrdinale = this.arrestation.arrestationId.numOrdinale;

      this.liberation = new Liberation();

      this.liberation.liberationId = liberationId;

      this.liberation.causeLiberation = this.causeLiberationLocal;

      this.liberation.remarqueLiberation = this.remarqueLiberation;
      this.liberation.etabChangeManiere = this.etabChangeManiereLocal;
      this.liberation.date = this.dateLiberation;
      //  liberation.arrestation= this.arrestation;
      this.arrestation.liberation = this.liberation;
      this.showLiberation = true;
    }
  }

  confirmer() {
    this.crudservice
      .createLigne("arrestation", this.arrestation)
      .subscribe((data) => {
        this.showLiberation = false;
        this.isSaved = true;
        this.allowNewAddArrestation = true;
        console.log(data);
      });
  }

  showImg() {
    this.displayImg = true;
  }

  delete() {
    this.detentionService
      .supprimerLiberation(this.arrestation)
      .subscribe((data) => {
        if (data.status == 200) {
          // this.search( this.arrestation.enfant.id)
          this.isLiberation = false;
        } else {
          console.log(data.result);
        }
      });
  }

  addResidence() {
    this.centre =
      this.currentUser.etablissement.libelle_etablissement;

    this.detentionService
      .calculerNombreDetentionsParIdDetenu("arrestation", this.enfantLocal.id)
      .subscribe((data) => {
        this.numOrdinale = data.result;
      });
    this.displayAddArrestation = true;
  }

  saveNewResidence() {
    console.log(this.dateEntreLocal);
    console.log(this.numArrestation);
    if (this.dateEntreLocal && this.numArrestation) {
      this.detentionService
        .trouverDerniereResidenceParNumDetentionEtIdDetenu(
          "residence",
          this.arrestation.arrestationId.idEnfant,
          this.arrestation.arrestationId.numOrdinale
        )
        .subscribe((data) => {
          let residence = new Residence();

          this.residence = data.result;

          this.residence.residenceId.numOrdinaleResidence =
            this.residence.residenceId.numOrdinaleResidence + 1;
          residence.residenceId = this.residence.residenceId;
          residence.arrestation = this.residence.arrestation;
          residence.etablissement = this.currentUser.etablissement;
          residence.dateEntree = this.dateEntreLocal;
          residence.numArrestation = this.numArrestation;

          this.residence.statut = 0;
          console.log(residence);
          this.crudservice
            .createLigne("residence", residence)
            .subscribe((data) => {
              this.residence = data.result;
              this.centre = data.result.etablissement.libelle_etablissement;
              this.numArrestation = data.result.numArrestation;
              this.nextAdd = true;

              this.delete();
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
}
