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
import { AppelParquet } from "src/app/domain/appelParquet";
import { DocumentId } from "src/app/domain/documentId";
import { Enfant } from "src/app/domain/enfant";
import { Residence } from "src/app/domain/residence";
import { Tribunal } from "src/app/domain/tribunal";
import { TypeAffaire } from "src/app/domain/typeAffaire";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";

@Component({
  selector: "app-add-appel-parquet",
  templateUrl: "./add-appel-parquet.component.html",
  styleUrls: ["./add-appel-parquet.component.css"],
  providers: [MessageService],
})
export class AddAppelParquetComponent implements OnInit {
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

  enfantLocal: Enfant;

  residence: Residence;

  entitiesTribunal: Tribunal[];
  entitiesTypeAffaire: TypeAffaire[];
  displayImg: boolean;
  displayAffaire = false;
  entitiesAffaire: Affaire[];
  isExist = false;
  isSaved = false;
  showAppelParquet = false;
  msg = "";
  arrestation: any;
  affaireIdOrigine: AffaireId;
  affaireOrigine: Affaire;
  numOrdinalDoc: number;
  numOrdinalDocByAffaire: number;
  dateEmission;
  dateDepotCarte;
  documentId: DocumentId;
  update = false;
  @Input()
  appelParquet: AppelParquet;
  statEchappesOrlibre: number;

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
    private router: Router,
    private nodeService: NodeService,
    private service: MessageService,
    private token: TokenStorageService,
    private breadcrumbService: BreadcrumbService,
    public datepipe: DatePipe
  ) {
    this.breadcrumbService.setItems([
      { label: "الإستقبال", routerLink: ["/"] },

      { label: "إجراءات الطعن ", routerLink: ["/mineur/ProcedureAppel"] },
      { label: " طعن النيابة بالاستئناف " },
      { label: "إدراج" },
    ]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.crudservice
      .findDocumentById(this.appelParquet.documentId)
      .subscribe((data) => {
        console.log(
          "======================================================================================="
        );
        console.log(data.result);

        console.log(
          "======================================================================================="
        );

        this.appelParquet = data.result;

        // this.dateDepotCarte = this.appelParquet.dateDepotCarte;
        this.dateDepotCarte = new Date(this.appelParquet.dateDepotCarte);
        this.dateEmission = new Date(this.appelParquet.dateEmission);

        this.codeTribunal = this.appelParquet.affaire.tribunal.id;

        this.tribunal = this.appelParquet.affaire.tribunal.nom_tribunal;
        this.numAffaireT = this.appelParquet.affaire.tribunal.id;

        this.numOrdinalDoc = this.appelParquet.documentId.numOrdinalDoc;
        this.numOrdinalDocByAffaire =
          this.appelParquet.documentId.numOrdinalDocByAffaire;

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

    this.crudservice.getlistEntity("typeAffaire").subscribe((data) => {
      console.log(data);
      this.entitiesTypeAffaire = data.result;
    });

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
  reload() {
    this.enfantLocal = null;
    this.isExist = false;
    this.msg = "";
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
                      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
                      console.log(this.arrestation);
                      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
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
                              .findByArrestationByCJorCR(
                                "affaire",
                                this.arrestation.arrestationId.idEnfant,
                                this.arrestation.arrestationId.numOrdinale
                              )
                              .subscribe((data) => {
                                if (data.result == null) {
                                  console.log(data.result);
                                  // this.service.add({
                                  // 	key: 'tst',
                                  // 	severity: 'error',
                                  // 	summary: '.   خطأ    ',
                                  // 	detail: id + 'pas d'affaire dans cette arrestation  '
                                  // });
                                } else {
                                  console.log(data.result);
                                  this.entitiesAffaire = data.result;
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

      this.appelParquet = new AppelParquet();
      this.documentId = new DocumentId();

      this.documentId.idEnfant = this.enfantLocal.id;
      this.documentId.numOrdinalArrestation =
        this.arrestation.arrestationId.numOrdinale;

      this.appelParquet.affaire = this.affaireOrigine;
      this.documentId.numOrdinalAffaire = this.affaireOrigine.numOrdinalAffaire;
      this.crudservice
        .countDocumentByAffaire(
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
          this.appelParquet.documentId = this.documentId;
          this.appelParquet.typeDocument = "AP";

          // this.appelParquet.dateDepotCarte = this.dateDepotCarte;
          // this.appelParquet.dateEmission = this.dateEmission;
          this.appelParquet.dateDepotCarte = this.datepipe.transform(
            this.dateDepotCarte,
            "yyyy-MM-dd"
          );
          this.appelParquet.dateEmission = this.datepipe.transform(
            this.dateDepotCarte,
            "yyyy-MM-dd"
          );

          this.appelParquet.numArrestation = this.residence.numArrestation;
          this.appelParquet.etablissement = this.residence.etablissement;
          this.appelParquet.personelle = this.token.getUser().personelle;
          this.appelParquet.dateInsertion = this.datepipe.transform(
            new Date(),
            "yyyy-MM-dd"
          );
          this.showAppelParquet = true;
        });
    }
  }

  confirmer() {
    this.crudservice
      .createLigne("appelParquet", this.appelParquet)
      .subscribe((data) => {
        console.log(data.result);
      });

    this.isSaved = true;
    this.isExist = false;
    this.showAppelParquet = false;
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
