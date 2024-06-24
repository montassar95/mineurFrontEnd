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
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private token: TokenStorageService,
    public datepipe: DatePipe,
    private nodeService: NodeService,
    private service: MessageService,
    private breadcrumbService: BreadcrumbService,
    private router: Router
  ) {}
  ngOnDestroy() {
    window.localStorage.removeItem("idValide");
  }
  ngOnInit() {
    this.currentUser = this.token.getUser();

    let idValide = window.localStorage.getItem("idValide");
    console.log(idValide);
    if (idValide) {
      this.search(idValide);
    } else {
      this.router.navigate(["/mineur/Changement"]);
    }

    this.calendar_ar = {
      closeText: "Fermer",
      prevText: "Précédent",
      nextText: "Suivant",
      currentText: "Aujourd'hui",
      monthNames: [
        "  جانفــــي  ",

        "   فيفـــري   ",
        "  مــــارس  ",
        "  أفريــــل  ",
        "  مــــاي  ",
        "  جــــوان  ",
        "  جويليــــة  ",
        "  أوت  ",
        "  سبتمبــــر  ",
        "  أكتوبــــر  ",
        "  نوفمبــــر  ",
        "  ديسمبــــر  ",
      ],
      monthNamesShort: [
        "janv.",
        "févr.",
        "mars",
        "avr.",
        "mai",
        "juin",
        "juil.",
        "août",
        "sept.",
        "oct.",
        "nov.",
        "déc.",
      ],
      dayNames: [
        "dimanche",
        "lundi",
        "mardi",
        "mercredi",
        "jeudi",
        "vendredi",
        "samedi",
      ],
      dayNamesShort: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
      dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
      weekHeader: "Sem.",
      dateFormat: "dd/mm/yy",
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: true,
      yearSuffix: "",
    };
    console.log(this.currentUser.personelle.etablissement);

    this.crudservice.getlistEntity("etablissement").subscribe((data) => {
      console.log(data);
      this.entitesEtablissement = data.result;
      this.entitesEtablissement = this.entitesEtablissement.filter(
        (s) => s.id !== this.currentUser.personelle.etablissement.id
      );
    });

    this.crudservice.getlistEntity("causeMutation").subscribe((data) => {
      console.log(data);
      this.entitesCauseMutation = data.result;
    });
  }


  search(id: String) {
    this.crudservice.getLigneById("enfant", id).subscribe((data) => {
      this.enfantLocal = data.result;

      this.crudservice
        .getLigneById("deces", this.enfantLocal.id)
        .subscribe((data) => {
          if (data.result == null) {
            this.crudservice
              .findByIdEnfantAndResidenceTrouverNull("echappes", id)
              .subscribe((data) => {
                if (data.result == null) {
                  this.crudservice
                    .findByIdEnfantAndStatut0("arrestation", id)
                    .subscribe((data) => {
                      this.arrestation = data.result;
                      this.crudservice
                        .getLiberationById(
                          "liberation",
                          this.arrestation.arrestationId.idEnfant,
                          this.arrestation.arrestationId.numOrdinale
                        )
                        .subscribe((data) => {
                          if (data.result != null) {
                            this.msg = "في حالـــة ســراح";
                            this.statEchappesOrlibre = 1;

                            this.echapperOuLibre = true;
                          } else {
                            this.crudservice
                              .findResidenceByIdEnfantAndStatut0(
                                "residence",
                                this.arrestation.arrestationId.idEnfant,
                                this.arrestation.arrestationId.numOrdinale
                              )
                              .subscribe((data) => {
                                this.residence = data.result;
                                console.log("eeeeeeeeeeeeeeeeeeeeeeeeee");
                                console.log(this.residence);
                                this.crudservice
                                  .findByIdEnfantAndStatutEnCour(
                                    "residence",
                                    this.arrestation.arrestationId.idEnfant,
                                    this.arrestation.arrestationId.numOrdinale
                                  )
                                  .subscribe((data) => {
                                    this.residenceEncour = data.result;

                                    if (data.result == null) {
                                      if (
                                        this.residence.etablissement.id !=
                                        this.token.getUser().personelle
                                          .etablissement.id
                                      ) {
                                        this.echapperOuLibre = true;
                                        this.statEchappesOrlibre = 3;
                                        this.msg =
                                          "      طفــل مقيــم بمركــز     " +
                                          this.residence.etablissement
                                            .libelle_etablissement;
                                      }
                                    } else {
                                      if (
                                        this.residenceEncour.etablissement.id ==
                                        this.token.getUser().personelle
                                          .etablissement.id
                                      ) {
                                        this.isEncour = true;
                                      } else if (
                                        this.residenceEncour.etablissement.id !=
                                        this.token.getUser().personelle
                                          .etablissement.id
                                      ) {
                                        //  && this.residence.etablissement.id == this.token.getUser().personelle.etablissement.id

                                        this.echapperOuLibre = true;
                                        this.statEchappesOrlibre = 2;
                                        this.msg =
                                          "      نقلـــة جـــارية إلـــى مركــز    " +
                                          data.result.etablissement
                                            .libelle_etablissement;

                                        if (
                                          this.residence.etablissement.id ==
                                          this.token.getUser().personelle
                                            .etablissement.id
                                        ) {
                                          this.crudservice
                                            .findByIdEnfantAndStatutArrestation0(
                                              "residence",
                                              this.residence.residenceId
                                                .idEnfant
                                            )
                                            .subscribe((data) => {
                                              //all list residence
                                              if (data.result) {
                                                if (
                                                  data.result[1].etablissement
                                                    .id ==
                                                  this.token.getUser()
                                                    .personelle.etablissement.id
                                                ) {
                                                  this.update = true;
                                                }
                                              }
                                            });
                                        }
                                      } else {
                                        this.echapperOuLibre = true;
                                        this.statEchappesOrlibre = 3;
                                        this.msg =
                                          "      طفــل مقيــم بمركــز     " +
                                          this.residence.etablissement
                                            .libelle_etablissement;
                                      }
                                    }
                                  });
                              });
                          }
                        });
                    });
                } else {
                  this.msg = "طفل في حالــــــة فـــرار";
                  this.statEchappesOrlibre = 0;
                  this.echapperOuLibre = true;
                }
              });
          } else {
            this.msg = "طفل فــي ذمــــــة اللـــه";
            this.statEchappesOrlibre = 4;
            this.echapperOuLibre = true;
          }
        });
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

      this.showMutationAccepterResidence = true;
      this.residence = this.residenceEncour;
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
    this.crudservice
      .accepterResidence(this.residenceEncour)
      .subscribe((data) => {
        this.showMutationAccepterResidence = false;
        this.isSaved = true;
        console.log(data.result);
      });
  }

  save() {
    // && this.centre
    if (this.dateMutation && this.centre ) {
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
