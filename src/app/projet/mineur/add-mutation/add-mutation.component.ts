import { DatePipe } from "@angular/common";
import { Input, OnDestroy } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { EventService } from "src/app/demo/service/eventservice";
import { NodeService } from "src/app/demo/service/nodeservice";
import { Arrestation } from "src/app/domain/arrestation";
import { ArrestationId } from "src/app/domain/arrestationId";
import { CauseMutation } from "src/app/domain/causeMutation";
import { Enfant } from "src/app/domain/enfant";
import { Etablissement } from "src/app/domain/etablissement";
import { ResidenceId } from "src/app/domain/residanceId";
import { Residence } from "src/app/domain/residence";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { AppConfigService } from "../app-config.service";
import { DetentionService } from "src/app/demo/service/detention.service";

@Component({
  selector: "app-add-mutation",
  templateUrl: "./add-mutation.component.html",
  styleUrls: ["./add-mutation.component.css"],
  providers: [MessageService],
})
export class AddMutationComponent implements OnInit, OnDestroy {
  centre = "";
  numOrdinale = "";
  numArrestation = "";
  cause = "";
  dateEntreLocal;
  remarqueMutation = "";
  enfantLocal: Enfant;
  roles: string[] = [];
  currentUser: any;
  arrestation: Arrestation;
  arrestationId: ArrestationId;
  @Input()
  residence: Residence;

  @Input()
  residenceNouveau: Residence;
  @Input()
  residenceEncour: Residence;
  displayImg: boolean;
  displayEdit = false;
  isEncour = false;

  showMutation = false;

  showMutationAccepterResidence = false;
  msg = "";

  entitesEtablissement: Etablissement[];
  entitesCauseMutation: CauseMutation[];
  displayEtablissement = false;
  displayCauseMutation = false;
  etablissementLocal: Etablissement;
  causeMutationLocal: CauseMutation;
  idEnfant: any;
  dateMutation: any;
  echapperOuLibre = false;
  statEchappesOrlibre: number;
  isSaved = false;
  update = false;
  calendar_ar: any;
  constructor(
    private crudservice: CrudEnfantService,
    private detentionService: DetentionService,
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
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
    this.currentUser = this.token.getUserFromTokenFromToken();

    let idValide = window.localStorage.getItem("idValide");
    console.log(idValide);
    if (idValide) {
      this.search(idValide);
    } else {
      this.router.navigate(["/mineur/Changement"]);
    }
    this.calendar_ar = this.calendar_ar = this.appConfigService.calendarConfig;

    console.log(this.currentUser.etablissement);

    this.crudservice.getlistEntity("etablissement").subscribe((data) => {
      console.log(data);
      this.entitesEtablissement = data.result;
      this.entitesEtablissement = this.entitesEtablissement.filter(
        (s) => s.id !== this.currentUser.etablissement.id
      );
    });

    this.crudservice.getlistEntity("causeMutation").subscribe((data) => {
      console.log(data);
      this.entitesCauseMutation = data.result;
    });
  }

  allowNewAddArrestation = false;
  allowNewCarte = false;
  alerte: boolean;
  demande = false;
  accepte = false;
  edit = false;
  search(id: String) {
    this.detentionService
      .trouverDetenuAvecSonStatutActuel(
        id,
        this.token.getUserFromTokenFromToken().etablissement.id
      )
      .subscribe((data) => {
        this.enfantLocal = data.result.enfant;
        this.msg = data.result.situation;

        this.allowNewAddArrestation = data.result.allowNewAddArrestation;
        this.allowNewCarte = data.result.allowNewCarte;
        this.alerte = data.result.alerte;

        if (
          data.result?.residenceEncour?.etablissement.id ==
          this.token.getUserFromTokenFromToken().etablissement.id
        ) {
          this.accepte = true;
        } else if (
          data.result?.residenceEncour?.etablissementEntree.id ==
          this.token.getUserFromTokenFromToken().etablissement.id
        ) {
          this.edit = true;
        }
        if (!this.alerte) {
          this.demande = true;
        }
        this.arrestation = data.result.arrestations[0];
        this.residence = data.result.residence;
        this.residenceEncour = data.result?.residenceEncour;
      });
  }

  saveAccepterResidence() {
    if (this.dateMutation && this.numArrestation) {
      this.dateMutation = this.datepipe.transform(
        this.dateMutation,
        "yyyy-MM-dd"
      );

      this.residenceEncour.numArrestation = this.numArrestation;
      this.residenceEncour.dateEntree = this.dateMutation;
      console.log(this.residenceEncour);
      this.showMutationAccepterResidence = true;
    } else {
      this.service.add({
        key: "tst",
        severity: "error",
        summary: ".   خطأ    ",
        detail: "تثبت من إدراج المعطيات",
      });
    }
  }

  confirmerAccepterResidence() {
    this.detentionService
      .accepterDemandeMutation(this.residenceEncour)
      .subscribe((data) => {
        this.showMutationAccepterResidence = false;
        this.isSaved = true;
        this.accepte = false;
        console.log(data.result);
      });
  }

  save() {
    // && this.centre
    if (this.dateMutation && this.centre) {
      let residenceId = new ResidenceId();

      residenceId.idEnfant = this.arrestation.arrestationId.idEnfant;
      residenceId.numOrdinaleArrestation =
        this.arrestation.arrestationId.numOrdinale;

      this.residence = new Residence();

      this.residence.residenceId = residenceId;
      this.residence.arrestation = this.arrestation;

      this.residence.causeMutation = this.causeMutationLocal;
      this.residence.remarqueMutation = this.remarqueMutation;
      this.residence.etablissement = this.etablissementLocal;

      this.dateMutation = this.datepipe.transform(
        this.dateMutation,
        "yyyy-MM-dd"
      );
      this.residence.dateEntree = this.dateMutation;

      this.showMutation = true;
    } else {
      this.service.add({
        key: "tst",
        severity: "error",
        summary: ".   خطأ    ",
        detail: "تثبت من إدراج المعطيات",
      });
    }
  }

  confirmer() {
    console.log(" i'm here ");
    console.log(this.residence);
    this.crudservice
      .createLigne("residence", this.residence)
      .subscribe((data) => {
        this.showMutation = false;
        this.isSaved = true;
        console.log("-----------------------------------");
      });
  }

  refresh() {
    this.echapperOuLibre = false;
    this.isSaved = false;
    this.dateMutation = new Date();
  }

  showListEtablissement() {
    this.displayEtablissement = true;
  }
  showListCauseMutation() {
    this.displayCauseMutation = true;
  }
  saveEtablissement(etablissement: Etablissement) {
    this.etablissementLocal = etablissement;
    this.centre = this.etablissementLocal.libelle_etablissement;
    this.displayEtablissement = false;
  }

  saveCauseMutation(causeMutation: CauseMutation) {
    console.log(causeMutation);
    this.causeMutationLocal = causeMutation;
    this.cause = this.causeMutationLocal.libelle_causeMutation;
    this.displayCauseMutation = false;
  }

  editMutation() {
    this.etablissementLocal = this.residenceEncour.etablissement;
    this.centre = this.residenceEncour.etablissement.libelle_etablissement;
    this.causeMutationLocal = this.residenceEncour.causeMutation;
    this.cause = this.residenceEncour.causeMutation.libelle_causeMutation;
    console.log(this.residence.dateSortie);
    this.dateMutation = new Date(this.residence.dateSortie);
    this.remarqueMutation = this.residenceEncour.remarqueMutation;
    this.echapperOuLibre = false;
    this.displayEdit = true;
  }
  changeDate() {
    this.dateEntreLocal = this.datepipe.transform(
      this.dateEntreLocal,
      "yyyy-MM-dd"
    );
  }

  annuleEdit() {
    this.echapperOuLibre = true;
    this.displayEdit = false;
  }
  showImg() {
    this.displayImg = true;
  }
}
