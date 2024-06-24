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
import { MotifArreterlexecution } from "src/app/domain/motifArreterlexecution";
import { Residence } from "src/app/domain/residence";
import { ResultatTransfert } from "src/app/domain/resultatTransfert";
import { Transfert } from "src/app/domain/transfert";
import { Tribunal } from "src/app/domain/tribunal";
import { TypeAffaire } from "src/app/domain/typeAffaire";
import { TypeTribunal } from "src/app/domain/typeTribunal";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { TransfertComponent } from "../transfert/transfert.component";

@Component({
  selector: "app-add-transfert",
  templateUrl: "./add-transfert.component.html",
  styleUrls: ["./add-transfert.component.css"],
  providers: [MessageService],
})
export class AddTransfertComponent implements OnInit {
  stateOptions: any[];
  value1: string = "off";
  refresh() {
    this.crudservice
      .getDocumentByArrestation(
        this.arrestation.arrestationId.idEnfant,
        this.arrestation.arrestationId.numOrdinale
      )
      .subscribe((data) => {
        this.numOrdinalDoc = data.result + 1;
      });
  }

  displayResultatTransfert = false;
  entitiesResultatTransfert: ResultatTransfert[];

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
  arrestation: any;
  displayAlertOrigineExist = false;
  showTransfert = false;
  dateEmission;
  dateDepotCarte;
  documentId: DocumentId;
  years = "";
  calendar_ar: any;
  @Input()
  transfert: Transfert;
  update = false;
  statEchappesOrlibre: number;
  typeTribunalSwich: SelectItem[];
  gouvernoratSwich: SelectItem[];

  types: SelectItem[];

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
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private nodeService: NodeService,
    private service: MessageService,
    private breadcrumbService: BreadcrumbService,
    public datepipe: DatePipe,
    private token: TokenStorageService,
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
        label: "     إحالة",
      },
      {
        label: "إدراج إحالة",
      },
    ]);

    // this.stateOptions = [
    //   { label: "إحــــــالة", value: "off" },
    //   { label: "تخلــــــي", value: "on" },
    //   { label: "تعهــــــد", value: "on" },
    // ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.crudservice
      .findDocumentById(this.transfert.documentId)
      .subscribe((data) => {
        console.log(
          "======================================================================================="
        );
        console.log(data.result);

        console.log(
          "======================================================================================="
        );

        this.transfert = data.result;

        this.dateDepotCarte = this.transfert.dateDepotCarte;
        this.dateDepotCarte = new Date(this.dateDepotCarte);
        this.codeTribunalTransfere = this.transfert.affaire.tribunal.id;
        this.tribunalTransfere = this.transfert.affaire.tribunal.nom_tribunal;
        this.numAffaireTransfere = this.transfert.affaire.affaireId.numAffaire;

        this.codeTribunal = this.transfert.affaire.affaireLien.tribunal.id;

        this.tribunal =
          this.transfert.affaire.affaireLien.tribunal.nom_tribunal;
        this.numAffaireT = this.transfert.affaire.affaireLien.tribunal.id;

        this.id = this.transfert.resultatTransfert.id;
        this.libelle_resultat =
          this.transfert.resultatTransfert.libelle_resultat;

        this.resultatTransfertObjet = this.transfert.resultatTransfert;

        this.numOrdinalDoc = this.transfert.documentId.numOrdinalDoc;

        this.update = true;
      });
  }
  ngOnDestroy() {
    window.localStorage.removeItem("idValide");
  }
  ngOnInit() {
    console.log("this.selectedType");
    console.log(this.selectedType);
    this.types = [];
    this.types.push({ label: "إحــــــالة ", value: "T" });
    this.types.push({ label: "تخلــــــي", value: "A" });
    this.types.push({ label: "تعهــــــد", value: "G" });

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
    this.listeResultatTransfert();
    this.showAllGouvernorat();
    this.showAllTypeTribunal();
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
  }
  search(id: String) {
    this.crudservice.getLigneById("enfant", id).subscribe((data) => {
      this.enfantLocal = data.result;
      this.years =
        this.years +
        (new Date(this.enfantLocal?.dateNaissance).getFullYear() + 13) +
        ":" +
        new Date().getFullYear();
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
                            this.isExist = false;
                            this.msg = " طفل  في حالـــة ســراح ";
                            this.statEchappesOrlibre = 1;
                          } else {
                            this.crudservice
                              .findResidenceByIdEnfantAndStatut0(
                                "residence",
                                this.arrestation.arrestationId.idEnfant,
                                this.arrestation.arrestationId.numOrdinale
                              )
                              .subscribe((data) => {
                                this.residence = data.result;

                                this.crudservice
                                  .findByIdEnfantAndStatutEnCour(
                                    "residence",
                                    this.arrestation.arrestationId.idEnfant,
                                    this.arrestation.arrestationId.numOrdinale
                                  )
                                  .subscribe((data) => {
                                    if (data.result != null) {
                                      this.isExist = false;
                                      this.statEchappesOrlibre = 2;
                                      this.msg =
                                        "      نقلـــة جـــارية إلـــى مركــز    " +
                                        data.result.etablissement
                                          .libelle_etablissement;
                                    }
                                  });
                                if (
                                  data.result.etablissement.id !=
                                  this.token.getUser().personelle.etablissement
                                    .id
                                ) {
                                  this.isExist = false;
                                  this.statEchappesOrlibre = 3;
                                  this.msg =
                                    "      طفــل مقيــم بمركــز     " +
                                    data.result.etablissement
                                      .libelle_etablissement;
                                }
                              });

                            this.crudservice
                              .getDocumentByArrestation(
                                this.arrestation.arrestationId.idEnfant,
                                this.arrestation.arrestationId.numOrdinale
                              )
                              .subscribe((data) => {
                                if (this.numOrdinalDoc) {
                                  this.numOrdinalDoc = this.numOrdinalDoc;
                                } else {
                                  this.numOrdinalDoc = data.result + 1;
                                }
                              });

                            this.crudservice
                              .findByArrestationToTransfert(
                                "affaire",
                                this.arrestation.arrestationId.idEnfant,
                                this.arrestation.arrestationId.numOrdinale
                              )
                              .subscribe((data) => {
                                if (data.result == null) {
                               
                                } else {
                                  console.log(data.result);
                                  this.entitiesAffaire = data.result;
                                  console.log("bonjour2");
                                  console.log(this.entitiesAffaire);
                                }
                              });
                            this.isExist = true;
                          }
                        });
                    });
                } else {
                  this.msg = "طفل في حالــــــة فـــرار";
                  this.statEchappesOrlibre = 0;
                }
              });
          } else {
            this.statEchappesOrlibre = 4;

            this.msg = "طفل فــي ذمــــــة اللـــه";
          }
        });
    });
  }

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
    this.numAffaireTransfere = affaire.affaireId.numAffaire;
    this.displayAffaire = false;
  }
  showListAffaire() {
    this.displayAffaire = true;
  }

  //------------------------------------------------------------tribunal transferé-----------------------------------------------------------------------------------------------

  displayTribunalTransfere: boolean;
  tribunalTransfere = "";
  typeDoc = "";
  codeTribunalTransfere = "";

  numAffaireTransfere: number;
  tribunalTransfereObjet: Tribunal;

  showListTribunalTransfere() {
    if (!this.update) {
      this.displayTribunalTransfere = true;
    }
  }
  saveTribunalTransfere(tribunal) {
    this.tribunalTransfere = tribunal.nom_tribunal;
    this.codeTribunalTransfere = tribunal.id;
    this.tribunalTransfereObjet = tribunal;

    this.displayTribunalTransfere = false;
  }
  getTribunalTransfere() {
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

  //--------------------------------------------------------------------------------------------------------------------------

  onSubmit() {
    if (
      !this.selectedType ||
      !this.dateDepotCarte ||
      !this.resultatTransfertObjet ||
      !this.tribunalTransfereObjet ||
      !this.affaireObjet ||
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
      // this.dateEmission = this.datepipe.transform(this.dateDepotCarte, 'yyyy-MM-dd');
      // this.dateDepotCarte = this.datepipe.transform(this.dateDepotCarte, 'yyyy-MM-dd');

      this.affaireIdOrigine = new AffaireId();
      this.affaireIdOrigine.idEnfant = this.enfantLocal?.id;
      this.affaireIdOrigine.idTribunal = this.tribunalTransfereObjet?.id;

      if (this.numAffaireTransfere) {
        this.affaireIdOrigine.numAffaire = this.numAffaireTransfere;
      } else {
        this.affaireIdOrigine.numAffaire =
          this.affaireObjet.affaireId.numAffaire;
      }

      this.affaireOrigine = new Affaire();
      this.affaireOrigine.arrestation = this.arrestation;
      this.affaireOrigine.tribunal = this.tribunalTransfereObjet;
      this.affaireOrigine.affaireId = this.affaireIdOrigine;

      this.transfert = new Transfert();
      this.documentId = new DocumentId();

      this.documentId.idEnfant = this.enfantLocal.id;
      this.documentId.numOrdinalArrestation =
        this.arrestation.arrestationId.numOrdinale;
      console.log("iciiiiiiiiii");
      console.log(this.affaireOrigine);
      this.crudservice
        .getLigneByAffaireId(
          "affaire",
          this.affaireIdOrigine.idEnfant,
          this.affaireIdOrigine.numAffaire,
          this.affaireIdOrigine.idTribunal,
          this.arrestation.arrestationId.numOrdinale
        )
        .subscribe((data) => {
          if (data.result) {
            this.displayAlertOrigineExist = true;
          } else {
            this.affaireOrigine.affaireLien = this.affaireObjet;

            this.crudservice
              .verifierNumOrdinalAffaire(
                "affaire",
                this.affaireOrigine,
                this.arrestation.arrestationId.numOrdinale
              )
              .subscribe((data) => {
                this.affaireOrigine = data.result;
                this.transfert.affaire = this.affaireOrigine;
                this.documentId.numOrdinalAffaire =
                  this.affaireOrigine.numOrdinalAffaire;
                this.crudservice
                  .countDocumentByAffaire(
                    this.arrestation.arrestationId.idEnfant,
                    this.arrestation.arrestationId.numOrdinale,
                    this.affaireOrigine.numOrdinalAffaire
                  )
                  .subscribe((data) => {
                    this.documentId.numOrdinalDoc = this.numOrdinalDoc;
                    this.documentId.numOrdinalDocByAffaire = data.result + 1;

                    this.transfert.documentId = this.documentId;
                    this.transfert.typeDocument = "T";
                    this.transfert.typeFile = this.selectedType;

                    // this.transfert.dateDepotCarte = this.dateDepotCarte;
                    // this.transfert.dateEmission = this.dateEmission;
                    this.transfert.dateDepotCarte = this.datepipe.transform(
                      this.dateDepotCarte,
                      "yyyy-MM-dd"
                    );
                    this.transfert.dateEmission = this.datepipe.transform(
                      this.dateDepotCarte,
                      "yyyy-MM-dd"
                    );

                    this.transfert.resultatTransfert =
                      this.resultatTransfertObjet;

                    this.transfert.numArrestation =
                      this.residence.numArrestation;
                    this.transfert.etablissement = this.residence.etablissement;
                    this.transfert.personelle = this.token.getUser().personelle;
                    this.transfert.dateInsertion = this.datepipe.transform(
                      new Date(),
                      "yyyy-MM-dd"
                    );
                    this.showTransfert = true;
                  });
              });
          }
        });
    }
  }

  confirmer() {
    this.crudservice
      .createLigne("transfert", this.transfert)
      .subscribe((data) => {
        console.log(data.result);
      });

    this.isSaved = true;
    this.isExist = false;
    this.showTransfert = false;
  }

  id = "";
  libelle_resultat = "";

  resultatTransfertObjet: ResultatTransfert;

  saveResultatTransfert(resultatTransfert: ResultatTransfert) {
    this.id = resultatTransfert.id;
    this.libelle_resultat = resultatTransfert.libelle_resultat;

    this.resultatTransfertObjet = resultatTransfert;
    this.displayResultatTransfert = false;
  }

  getResultatTransfert() {
    this.crudservice
      .getLigneById("resultatTransfert", this.id)
      .subscribe((data) => {
        if (data.result != null) {
          this.resultatTransfertObjet = data.result;

          this.libelle_resultat = data.result.libelle_resultat;
        } else {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: "تثبت من رمز    ",
          });
          this.libelle_resultat = "";
          this.resultatTransfertObjet = null;
        }
      });
  }

  showListResultatTransfert() {
    this.displayResultatTransfert = true;
  }

  listeResultatTransfert() {
    this.crudservice.getlistEntity("resultatTransfert").subscribe((data) => {
      if (data.result == null) {
        console.log(data.result);
      } else {
        console.log(data.result);
        this.entitiesResultatTransfert = data.result;
      }
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
