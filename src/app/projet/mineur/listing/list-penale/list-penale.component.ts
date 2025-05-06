import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxImageCompressService } from "ngx-image-compress";
import { MessageService, SelectItem } from "primeng";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { ClassePenale } from "src/app/domain/classePenale";
import { Delegation } from "src/app/domain/delegation";
import { Etablissement } from "src/app/domain/etablissement";
import { Gouvernorat } from "src/app/domain/gouvernorat";
import { Metier } from "src/app/domain/metier";
import { NiveauEducatif } from "src/app/domain/niveauEducatif";
import { PDFListExistDTO } from "src/app/domain/pDFListExistDTO";
import { PDFPenaleDTO } from "src/app/domain/pDFPenaleDTO";
import { SituationFamiliale } from "src/app/domain/situationFamiliale";
import { SituationSocial } from "src/app/domain/situationSocial";
import { TypeAffaire } from "src/app/domain/typeAffaire";
import { TypeTribunal } from "src/app/domain/typeTribunal";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { TypeJuge } from "src/app/domain/typeJuge";
import { CauseLiberation } from "src/app/domain/causeLiberation";
import { Nationalite } from "src/app/domain/nationalite";
import { AppConfigService } from "../../app-config.service";
import { RapportService } from "src/app/demo/service/rapport.service";

@Component({
  selector: "app-list-penale",
  templateUrl: "./list-penale.component.html",
  styleUrls: ["./list-penale.component.scss"],
  providers: [MessageService],
})
export class ListPenaleComponent implements OnInit {
  // displayNationalite: boolean;

  sizeFile = 0;

  accusationsToAdd: SelectItem[];
  ageToAdd1: SelectItem[];
  ageToAdd2: SelectItem[];
  accusationsToAddValue: string;
  accusationsToAddLabel: string;
  ageToAddValue1 = 0;
  ageToAddValue2 = 0;

  entitiesNiveauEducatif: NiveauEducatif[];
  entitiesSituationFamiliale: SituationFamiliale[];
  entitiesGouvernorat: Gouvernorat[];
  entitiesGouvernoratTribunal: Gouvernorat[];
  entitiesTypeJuge: TypeJuge[];
  entitiesDelegation: Delegation[];
  entitiesClassePenale: ClassePenale[];
  entitiesSituationSocial: SituationSocial[];
  entitiesNationalite: Nationalite[];

  entitiesMetier: Metier[];
  entitiesEtablissement: Etablissement[];
  entitiesTypeTribunal: TypeTribunal[];
  entitiesTypeAffaire: TypeAffaire[];

  entitiesCauseLiberation: CauseLiberation[];

  displayCentre: boolean;
  centre: Etablissement;
  centreLibelle: String;

  displayClassePenale: boolean;
  classePenale: ClassePenale;
  classePenaleLibelle: String;

  displayCauseLiberation: boolean;
  causeLiberation: CauseLiberation;
  causeLiberationLibelle: String;

  displayNiveauEducatif: boolean;
  niveauEducatif: NiveauEducatif;
  niveauEducatifLibelle: String;

  displayGouvernorat: boolean;
  gouvernorat: Gouvernorat;
  gouvernoratLibelle: String;

  displayGouvernoratTribunal: boolean;
  gouvernoratTribunal: Gouvernorat;
  gouvernoratTribunalLibelle: String;

  displaySituationFamiliale: boolean;
  situationFamiliale: SituationFamiliale;
  situationFamilialeLibelle: String;

  displaySituationSocial: boolean;
  situationSocial: SituationSocial;
  situationSocialLibelle: String;

  displayNationalite: boolean;
  nationalite: Nationalite;
  nationaliteLibelle: String;

  displayMetier: boolean;
  metier: Metier;
  metierLibelle: String;

  displayDelegation: boolean;
  delegation: Delegation;
  delegationLibelle: String;

  displayTypeTribunal: boolean;
  typeTribunal: TypeTribunal;
  typeTribunalLibelle: String;

  displayTypeJuge: boolean;
  typeJuge: TypeJuge;
  typeJugeLibelle: String;

  displayList: boolean;

  displayTypeAffaire: boolean;
  typeAffaire: TypeAffaire;
  typeAffaireLibelle: String;
  click: boolean;
  calendar_ar: any;

  years = "";

  isShow: boolean;
  dateDebutGlobale: any;
  dateFinGlobale: any;

  datePrintAllCentre: any;
  checkEtranger: String;
  checkUniqueAff: String;

  constructor(
    private formBuilder: FormBuilder,
    private service: MessageService,
    private token: TokenStorageService,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private crudservice: CrudEnfantService,
    private rapportService: RapportService,
    public datepipe: DatePipe,
    private imageCompress: NgxImageCompressService,
    private datePipe: DatePipe,
    private appConfigService: AppConfigService
  ) {
    this.breadcrumbService.setItems([
      { label: "الإستقبال", routerLink: ["/"] },

      { label: "القائمات" },
    ]);
  }

  ngOnInit(): void {
    this.accusationsToAdd = [
      { label: "المقيمين بمختلف وضعيتهم", value: "all" },
      { label: "المفرج عنهم", value: "seraLibere" },
      { label: "البالغين لسن الرشد ", value: "devenuMajeur" },
      { label: "المقيمين دون قضايا", value: "nonAff" },
      { label: "الموقوفين ", value: "arret" },
      { label: "المحكومين", value: "juge" },
      { label: "    إستئناف النيابة  ", value: "attetAP" },
      { label: "    إستئناف الطفل  ", value: "attetAE" },
      { label: "    إحالة   ", value: "attetT" },

      { label: "     مراجعة  ", value: "jugeR" },

      { label: "السراحات", value: "libere" },
      { label: "تغيير وسيلة ", value: "chanLieu" },

      { label: "  داخلون جدد   ", value: "entreReelle" },
      { label: "   داخلون نقل    ", value: "entreeMutation" },
      { label: "     الخارجون نقل     ", value: "sortieMutation" },
      { label: " تغيرات و جلسات    ", value: "audience" },
    ];
    this.ageToAdd1 = [
      { label: "empty", value: 0 },
      { label: "13 عام  ", value: 13 },
      { label: "14 عام  ", value: 14 },
      { label: "15 عام ", value: 15 },
      { label: "16 عام ", value: 16 },
      { label: "17 عام ", value: 17 },
    ];
    this.ageToAdd2 = [
      { label: "empty", value: 0 },
      { label: "13 عام  ", value: "13" },
      { label: "14 عام  ", value: "14" },
      { label: "15 عام ", value: "15" },
      { label: "16 عام ", value: "16" },
      { label: "17 عام ", value: "17" },
    ];
    this.calendar_ar = this.calendar_ar = this.appConfigService.calendarConfig;
    this.years =
      this.years +
      (new Date().getFullYear() - 5) +
      ":" +
      (new Date().getFullYear() + 9);
    this.crudservice.getlistEntity("niveauEducatif").subscribe((data) => {
      this.entitiesNiveauEducatif = data.result;
    });

    this.crudservice.getlistEntity("situationFamiliale").subscribe((data) => {
      this.entitiesSituationFamiliale = data.result;
    });

    this.crudservice.getlistEntity("gouvernorat").subscribe((data) => {
      this.entitiesGouvernorat = data.result;
      this.entitiesGouvernoratTribunal = data.result;
    });

    this.crudservice.getlistEntity("classePenale").subscribe((data) => {
      this.entitiesClassePenale = data.result;
    });
    this.crudservice.getlistEntity("typeJuge").subscribe((data) => {
      this.entitiesTypeJuge = data.result;
    });
    this.crudservice.getlistEntity("causeLiberation").subscribe((data) => {
      this.entitiesCauseLiberation = data.result;
      this.entitiesCauseLiberation = this.entitiesCauseLiberation.filter(
        (u) => u.id !== 50
      );
    });

    this.crudservice.getlistEntity("situationSocial").subscribe((data) => {
      this.entitiesSituationSocial = data.result;
    });

    this.crudservice.getlistEntity("nationalite").subscribe((data) => {
      this.entitiesNationalite = data.result;
    });

    this.crudservice.getlistEntity("metier").subscribe((data) => {
      this.entitiesMetier = data.result;
    });

    this.crudservice
      .trouverEtablissementsActifs("etablissement")
      .subscribe((data) => {
        this.entitiesEtablissement = data.result;
        this.entitiesEtablissement.push(null);
      });

    this.crudservice.getlistEntity("typeTribunal").subscribe((data) => {
      this.entitiesTypeTribunal = data.result;
    });
    this.crudservice.getlistEntity("typeAffaire").subscribe((data) => {
      this.entitiesTypeAffaire = data.result;
    });

    this.centre = this.token?.getUser()?.etablissement;
    this.centreLibelle =
      this.token?.getUser()?.etablissement.libelle_etablissement;

    this.accusationsToAddValue = "all";
    this.accusationsToAddLabel = "المقيمين بمختلف وضعيتهم";
  }
  showListSituationFamiliale() {
    this.displaySituationFamiliale = true;
  }
  showListSituationSocial() {
    this.displaySituationSocial = true;
  }
  showListNationalite() {
    this.displayNationalite = true;
  }

  showListGouvernorat() {
    this.displayGouvernorat = true;
  }

  showListGouvernoratTribunal() {
    this.displayGouvernoratTribunal = true;
  }

  showListTypeJuge() {
    this.displayTypeJuge = true;
  }

  showListNiveauEducatif() {
    this.displayNiveauEducatif = true;
  }
  showListMetier() {
    this.displayMetier = true;
  }
  showListDelegation() {
    if (this.gouvernorat) {
      this.crudservice
        .trouverDelegationsParGouvernorat("delegation", this.gouvernorat.id)
        .subscribe((data) => {
          this.entitiesDelegation = data.result;
        });
      this.displayDelegation = true;
    }
  }
  showListClassePenale() {
    this.displayClassePenale = true;
  }

  showListCauseLiberation() {
    this.displayCauseLiberation = true;
  }

  showListCentre() {
    this.displayCentre = true;
  }

  showListTypeTribunal() {
    this.displayTypeTribunal = true;
  }
  showListTypeAffaire() {
    this.displayTypeAffaire = true;
  }
  showListList() {
    this.displayList = true;
  }
  //------------------------------------------------------------situationFamiliale--------------------------------------------------------------------------------------------------

  saveTypeTribunal(typeTribunal) {
    this.typeTribunal = typeTribunal;
    this.typeTribunalLibelle = this.typeTribunal.libelleTypeTribunal;
    this.displayTypeTribunal = false;
  }

  deleteTypeTribunal() {
    this.typeTribunal = null;
    this.typeTribunalLibelle = "";
  }

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  saveList(list) {
    this.accusationsToAddValue = list.value;
    this.accusationsToAddLabel = list.label;
    this.displayList = false;
    if (
      this.accusationsToAddValue == "libere" ||
      this.accusationsToAddValue == "seraLibere" ||
      this.accusationsToAddValue == "entreReelle" ||
      this.accusationsToAddValue == "audience" ||
      this.accusationsToAddValue == "sortieMutation" ||
      this.accusationsToAddValue == "entreeMutation" ||
      this.accusationsToAddValue == "devenuMajeur" ||
      this.accusationsToAddValue == "arret"
    ) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  saveTypeAffaire(typeAffaire) {
    this.typeAffaire = typeAffaire;
    this.typeAffaireLibelle = this.typeAffaire.libelle_typeAffaire;
    this.displayTypeAffaire = false;
  }
  deleteTypeAffaire() {
    this.typeAffaire = null;
    this.typeAffaireLibelle = "";
  }
  //------------------------------------------------------------situationFamiliale--------------------------------------------------------------------------------------------------

  saveSituationFamiliale(situationFamiliale) {
    this.situationFamiliale = situationFamiliale;
    this.situationFamilialeLibelle =
      this.situationFamiliale.libelle_situation_familiale;
    this.displaySituationFamiliale = false;
  }
  deleteSituationFamiliale() {
    this.situationFamiliale = null;
    this.situationFamilialeLibelle = "";
  }
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  //------------------------------------------------------------situationSocial--------------------------------------------------------------------------------------------------

  saveSituationSocial(situationSocial) {
    this.situationSocial = situationSocial;
    this.situationSocialLibelle = this.situationSocial.libelle_situation_social;
    this.displaySituationSocial = false;
  }
  deleteSituationSocial() {
    this.situationSocial = null;
    this.situationSocialLibelle = "";
  }
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  //------------------------------------------------------------Nationalite--------------------------------------------------------------------------------------------------

  saveNationalite(nationalite) {
    this.nationalite = nationalite;
    this.nationaliteLibelle = this.nationalite.libelle_nationalite;
    this.displayNationalite = false;
  }
  deleteNationalite() {
    this.nationalite = null;
    this.nationaliteLibelle = "";
  }
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  //------------------------------------------------------------gouvernerat--------------------------------------------------------------------------------------------------

  saveMetier(metier) {
    this.metier = metier;
    this.metierLibelle = this.metier.libelle_metier;
    this.displayMetier = false;
  }
  deleteMetier() {
    this.metier = null;
    this.metierLibelle = "";
  }

  //-------------------------------------------------------------type juge -----------------------------------------------------------------------------------------------------------------
  saveTypeJuge(typeJuge) {
    console.log(typeJuge);
    this.typeJuge = typeJuge;
    this.typeJugeLibelle = this.typeJuge.libelle_typeJuge;

    this.displayTypeJuge = false;
  }
  deleteTypeJuge() {
    this.typeJuge = null;
    this.typeJugeLibelle = "";
  }

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  saveGouvernoratTribunal(gouvernorat) {
    console.log(gouvernorat);
    this.gouvernoratTribunal = gouvernorat;
    this.gouvernoratTribunalLibelle =
      this.gouvernoratTribunal.libelle_gouvernorat;
    this.displayGouvernoratTribunal = false;
  }
  deleteGouvernoratTribunal() {
    this.gouvernoratTribunal = null;
    this.gouvernoratTribunalLibelle = "";
  }
  //------------------------------------------------------------gouvernerat--------------------------------------------------------------------------------------------------

  saveGouvernorat(gouvernorat) {
    this.gouvernorat = gouvernorat;
    this.gouvernoratLibelle = this.gouvernorat.libelle_gouvernorat;
    this.displayGouvernorat = false;
  }
  deleteGouvernorat() {
    this.gouvernorat = null;
    this.gouvernoratLibelle = "";
    this.delegation = null;
    this.delegationLibelle = "";
  }
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  //------------------------------------------------------------niveauEducatif --------------------------------------------------------------------------------------------------
  saveNiveauEducatif(niveauEducatif) {
    this.niveauEducatif = niveauEducatif;
    this.niveauEducatifLibelle = this.niveauEducatif.libelle_niveau_educatif;
    this.displayNiveauEducatif = false;
  }
  deleteNiveauEducatif() {
    this.niveauEducatif = null;
    this.niveauEducatifLibelle = "";
  }

  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  //------------------------------------------------------------delegation--------------------------------------------------------------------------------------------------

  saveDelegation(delegation) {
    this.delegation = delegation;
    this.delegationLibelle = this.delegation.libelle_delegation;
    this.displayDelegation = false;
  }
  deleteDelegation() {
    this.delegation = null;
    this.delegationLibelle = "";
  }
  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------Cause Liberation----------------------------------------------------------------------------------------------------
  saveCauseLiberation(causeLiberation: CauseLiberation) {
    this.causeLiberation = causeLiberation;
    this.causeLiberationLibelle = this.causeLiberation.libelleCauseLiberation;
    this.displayCauseLiberation = false;
  }
  deleteCauseLiberation() {
    this.causeLiberation = null;
    this.causeLiberationLibelle = "";
  }

  //-------------------------------------------------------------------classePenale----------------------------------------------------------------------------------------------------
  saveClassePenale(classePenale: ClassePenale) {
    this.classePenale = classePenale;
    this.classePenaleLibelle = this.classePenale.libelle_classe_penale;
    this.displayClassePenale = false;
  }
  deleteClassePenale() {
    this.classePenale = null;
    this.classePenaleLibelle = "";
  }
  //-------------------------------------------------------------------centre----------------------------------------------------------------------------------------------------

  saveCentre(centre) {
    this.centre = centre;
    this.centreLibelle = this.centre.libelle_etablissement;
    this.displayCentre = false;
  }
  deleteCentre() {
    this.centre = null;
    this.centreLibelle = "";
  }

  print(accusationsToAddValue) {
    let pDFListExistDTO = new PDFListExistDTO();

    console.log(this.checkUniqueAff);
    console.log(this.checkEtranger);
    if (
      (!this.dateDebutGlobale && !this.dateFinGlobale) ||
      (this.dateDebutGlobale && this.dateFinGlobale)
    ) {
      if (
        (this.ageToAddValue1 != 0 && this.ageToAddValue2 != 0) ||
        (this.ageToAddValue1 == 0 && this.ageToAddValue2 == 0)
      ) {
        if (this.ageToAddValue1 <= this.ageToAddValue2) {
          pDFListExistDTO.age1 = this.ageToAddValue1;
          pDFListExistDTO.age2 = this.ageToAddValue2;
          if (this.selectedEtablissements.length > 0) {
            this.click = true;

            pDFListExistDTO.etablissement = this.centre;
            pDFListExistDTO.etablissements = this.selectedEtablissements;
            if (this.classePenale) {
              pDFListExistDTO.classePenale = this.classePenale;
            }
            // else {
            //   pDFListExistDTO.classePenale = new ClassePenale();
            // }

            if (this.niveauEducatif) {
              pDFListExistDTO.niveauEducatif = this.niveauEducatif;
            }
            // else {
            //   pDFListExistDTO.niveauEducatif = new NiveauEducatif();
            // }

            if (this.gouvernorat) {
              pDFListExistDTO.gouvernorat = this.gouvernorat;
            }
            // else {
            //   pDFListExistDTO.gouvernorat = new Gouvernorat();
            // }

            if (this.situationFamiliale) {
              pDFListExistDTO.situationFamiliale = this.situationFamiliale;
            }
            // else {
            //   pDFListExistDTO.situationFamiliale = new SituationFamiliale();
            // }

            if (this.situationSocial) {
              pDFListExistDTO.situationSocial = this.situationSocial;
            }
            // else {
            //   pDFListExistDTO.situationSocial = new SituationSocial();
            // }

            if (this.nationalite) {
              pDFListExistDTO.nationalite = this.nationalite;
            }
            // else {
            //   pDFListExistDTO.nationalite = new Nationalite();
            // }

            if (this.metier) {
              pDFListExistDTO.metier = this.metier;
            }
            // else {
            //   pDFListExistDTO.metier = new Metier();
            // }

            if (this.delegation) {
              pDFListExistDTO.delegation = this.delegation;
              pDFListExistDTO.gouvernorat = new Gouvernorat();
            }
            // else {
            //   pDFListExistDTO.delegation = new Delegation();
            // }

            if (this.gouvernoratTribunal) {
              pDFListExistDTO.gouvernoratTribunal = this.gouvernoratTribunal;
            }
            // else {
            //   pDFListExistDTO.gouvernoratTribunal = new Gouvernorat();
            // }

            if (this.typeTribunal) {
              pDFListExistDTO.typeTribunal = this.typeTribunal;
            }
            // else {
            //   pDFListExistDTO.typeTribunal = new TypeTribunal();
            // }

            if (this.typeAffaire) {
              pDFListExistDTO.typeAffaire = this.typeAffaire;
            }
            // else {
            //   pDFListExistDTO.typeAffaire = new TypeAffaire();
            // }

            if (this.typeJuge) {
              pDFListExistDTO.typeJuge = this.typeJuge;
            }
            //  else {
            //   pDFListExistDTO.typeJuge = new TypeJuge();
            // }

            if (this.causeLiberation) {
              pDFListExistDTO.causeLiberation = this.causeLiberation;
            }
            // else {
            //   pDFListExistDTO.causeLiberation = new CauseLiberation();
            // }

            if (this.dateDebutGlobale) {
              pDFListExistDTO.dateDebutGlobale = this.datepipe.transform(
                this.dateDebutGlobale,
                "yyyy-MM-dd"
              );
            }

            if (this.dateFinGlobale) {
              pDFListExistDTO.dateFinGlobale = this.datepipe.transform(
                this.dateFinGlobale,
                "yyyy-MM-dd"
              );
            }

            if ("principal" == this.checkUniqueAff) {
              pDFListExistDTO.checkUniqueAff = "principal";
            }
            if ("etranger" == this.checkEtranger) {
              pDFListExistDTO.checkEtranger = "etranger";
            }

            if (accusationsToAddValue) {
              pDFListExistDTO.etatJuridiue = accusationsToAddValue;
              if (
                (accusationsToAddValue == "libere" ||
                  accusationsToAddValue == "seraLibere" ||
                  accusationsToAddValue == "entreReelle" ||
                  accusationsToAddValue == "sortieMutation" ||
                  accusationsToAddValue == "entreeMutation" ||
                  accusationsToAddValue == "devenuMajeur") &&
                (!this.dateDebutGlobale || !this.dateFinGlobale)
              ) {
                this.click = false;
                this.service.add({
                  key: "tst",
                  severity: "error",
                  summary: "تثبت   ",
                  detail: "قم بإختيار تاريخ البداية و تاريخ النهاية      ",
                });
                return;
              }
            } else {
              pDFListExistDTO.etatJuridiue = "all";
            }
            this.rapportService
              .genererRapportPdfActuel(pDFListExistDTO)
              .subscribe(
                (x) => {
                  // this.crudservice.exportAllEtat(pDFListExistDTO).subscribe((x) => {
                  this.sizeFile = x.size;
                  console.log(this.sizeFile);

                  const blob = new Blob([x], { type: "application/pdf" });
                  const data = window.URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.href = data;
                  link.download = "enfant.pdf";

                  if (blob) {
                    this.sizeFile = 0;
                    this.click = false;
                  }

                  this.openPDFInNewTab(data);
                  // window.open(
                  //   data,
                  //   "_blank",
                  //   "top=0,left=0,bottom= 0, right= 0,height=100%,width=auto"
                  // );
                },
                (error) => {
                  // Handle error here
                  console.error(
                    "An error occurred while generating the report PDF:",
                    error
                  );
                  this.click = false;
                  // You can show an alert or display a user-friendly message if needed
                  alert("فشل إنشاء التقرير. يرجى المحاولة مرة أخرى.");
                }
              );
          } else {
            this.service.add({
              key: "tst",
              severity: "error",
              summary: "تثبت   ",
              detail: "قم بختيار المركز ",
            });
          }
        } else {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: "تثبت   ",
            detail: "تثبت من إدراج السن ",
          });
        }
      } else {
        this.service.add({
          key: "tst",
          severity: "error",
          summary: "تثبت   ",
          detail: "قم بإختيار أو إلغاء السن ",
        });
      }
    } else {
      this.service.add({
        key: "tst",
        severity: "error",
        summary: "تثبت   ",
        detail: "قم بإختيار أو إلغاء التواريخ ",
      });
    }
  }

  printAllCentre() {
    console.log(
      "Liste des établissements sélectionnés :",
      this.selectedEtablissements
    );
    console.log(this.datePipe.transform(this.datePrintAllCentre, "yyyy-MM-dd"));
    let pDFListExistDTO = new PDFListExistDTO();
    pDFListExistDTO.etablissements = this.selectedEtablissements;
    pDFListExistDTO.datePrintAllCentre = this.datePipe.transform(
      this.datePrintAllCentre,
      "yyyy-MM-dd"
    );
    this.click = true;
    // this.crudservice.exportEtatPdf(pDFListExistDTO).subscribe((x) => {
    this.rapportService
      .genererRapportPdfMensuel(pDFListExistDTO)
      .subscribe((x) => {
        this.sizeFile = x.size;
        console.log(this.sizeFile);

        const blob = new Blob([x], { type: "application/pdf" });
        const data = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = data;
        link.download = "enfant.pdf";

        if (blob) {
          this.sizeFile = 0;
          this.click = false;
        }

        this.openPDFInNewTab(data);
      });
  }

  openPDFInNewTab(data) {
    window.open(data, "_blank");
  }

  selectedEtablissements: Etablissement[];

  filteredEtablissements: Etablissement[];

  filterEtablissements(event) {
    this.filteredEtablissements = [];
    if (this.entitiesEtablissement) {
      for (const item of this.entitiesEtablissement) {
        if (item && item.libelle_etablissement) {
          const etablissement = item.libelle_etablissement;
          if (
            etablissement.toLowerCase().indexOf(event.query.toLowerCase()) === 0
          ) {
            this.filteredEtablissements.push(item);
          }
        }
      }
    }
  }

  removeItem(etablissement: any) {
    const index = this.selectedEtablissements.indexOf(etablissement);
    if (index !== -1) {
      this.selectedEtablissements.splice(index, 1);
    }
  }

  selectedBrands: SelectItem[];

  filteredBrands: SelectItem[];

  filterBrands(event) {
    this.filteredBrands = [];
    if (this.accusationsToAdd) {
      for (const item of this.accusationsToAdd) {
        if (item && item.label) {
          const brand = item.label;
          if (brand.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
            this.filteredBrands.push(item);
          }
        }
      }
    }
  }

  removeItemBrand(brand: any) {
    const index = this.selectedBrands.indexOf(brand);
    if (index !== -1) {
      this.selectedBrands.splice(index, 1);
    }
  }
}
