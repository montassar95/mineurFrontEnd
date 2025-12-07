import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxImageCompressService } from "ngx-image-compress";
import { SelectItem, MessageService } from "primeng";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { CauseLiberation } from "src/app/domain/causeLiberation";
import { ClassePenale } from "src/app/domain/classePenale";
import { Delegation } from "src/app/domain/delegation";
import { Etablissement } from "src/app/domain/etablissement";
import { Gouvernorat } from "src/app/domain/gouvernorat";
import { Metier } from "src/app/domain/metier";
import { Nationalite } from "src/app/domain/nationalite";
import { NiveauEducatif } from "src/app/domain/niveauEducatif";
import { PDFListExistDTO } from "src/app/domain/pDFListExistDTO";
import { SituationFamiliale } from "src/app/domain/situationFamiliale";
import { SituationSocial } from "src/app/domain/situationSocial";
import { TypeAffaire } from "src/app/domain/typeAffaire";
import { TypeJuge } from "src/app/domain/typeJuge";
import { TypeTribunal } from "src/app/domain/typeTribunal";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";
import { AppConfigService } from "../app-config.service";
import { RapportService } from "src/app/demo/service/rapport.service";
import { StatistiqueEtablissementDTO } from "src/app/domain/statistiqueEtablissementDTO";
import { StatistiqueMouvementsDTO } from "src/app/domain/statistiqueMouvementsDTO";

@Component({
  selector: "app-mensuel",
  templateUrl: "./mensuel.component.html",
  styleUrls: ["./mensuel.component.scss"],
  providers: [MessageService],
})
export class MensuelComponent implements OnInit {
  selectedYear: number | null = null; // Année par défaut
  selectedMonth: number | null = null; // Mois par défaut
  lastDay: string | null = null; // Dernier jour sous forme yyyy-MM-dd
  firstDay: string | null = null;
  statistiqueEtablissement: StatistiqueEtablissementDTO[] = [];
  statistiqueMouvements: StatistiqueMouvementsDTO[] = [];
  totalNbrStatutPenalArrete: number = 0;
  totalNbrStatutPenalJuge: number = 0;
  totalNbrStatutPenalLibre: number = 0;
  totalNbrTypeAffaireId5M: number = 0;
  totalNbrNationaliteDifferentDeJuge1M: number = 0;
  totalNbrTypeAffaireId5F: number = 0;
  totalNbrNationaliteDifferentDeJuge1F: number = 0;
  currentYear = new Date().getFullYear();

  dateDebutGlobale: any;
  dateFinGlobale: any;

  // Liste des années de 2024 à 2030
  // years = [
  //   { label: "اختيار السنة", value: null }, // Option vide pour sélectionner une année
  //   ...Array.from({ length: this.currentYear - 2021 + 1 }, (_, i) => ({
  //     label: (2021 + i).toString(),
  //     value: 2021 + i,
  //   })),
  // ];

  // Liste des mois en arabe
  months = [
    { label: "اختيار الشهر", value: null }, // Option vide pour choisir un mois
    { label: "جانفــــي", value: 1 },
    { label: "فيفـــري", value: 2 },
    { label: "مــــارس", value: 3 },
    { label: "أفريــــل", value: 4 },
    { label: "مــــاي", value: 5 },
    { label: "جــــوان", value: 6 },
    { label: "جويليــــة", value: 7 },
    { label: "أوت", value: 8 },
    { label: "سبتمبــــر", value: 9 },
    { label: "أكتوبــــر", value: 10 },
    { label: "نوفمبــــر", value: 11 },
    { label: "ديسمبــــر", value: 12 },
  ];
  currentUser: any;
  calendar_ar: any;

  years = "";

  calculateTotals(): void {
    // Calcul des totaux en itérant sur les données
    this.totalNbrStatutPenalArrete = this.statistiqueEtablissement.reduce(
      (total, stat) => total + stat.nbrStatutPenalArrete,
      0
    );
    this.totalNbrStatutPenalJuge = this.statistiqueEtablissement.reduce(
      (total, stat) => total + stat.nbrStatutPenalJuge,
      0
    );
    this.totalNbrStatutPenalLibre = this.statistiqueEtablissement.reduce(
      (total, stat) => total + stat.nbrStatutPenalLibre,
      0
    );
    this.totalNbrTypeAffaireId5M = this.statistiqueEtablissement.reduce(
      (total, stat) => total + stat.nbrTypeAffaireId5M,
      0
    );
    this.totalNbrNationaliteDifferentDeJuge1M =
      this.statistiqueEtablissement.reduce(
        (total, stat) => total + stat.nbrNationaliteDifferentDeJuge1M,
        0
      );

    this.totalNbrTypeAffaireId5F = this.statistiqueEtablissement.reduce(
      (total, stat) => total + stat.nbrTypeAffaireId5F,
      0
    );
    this.totalNbrNationaliteDifferentDeJuge1F =
      this.statistiqueEtablissement.reduce(
        (total, stat) => total + stat.nbrNationaliteDifferentDeJuge1F,
        0
      );
  }
  // Calculer le dernier jour du mois sélectionné
  calculateLastDay(): void {
    // if (this.selectedYear && this.selectedMonth) {
    //   const lastDayDate = this.getLastDayOfMonth(
    //     this.selectedYear,
    //     this.selectedMonth
    //   );
    this.firstDay = this.datepipe.transform(
      this.dateDebutGlobale,
      "yyyy-MM-dd"
    );
    this.lastDay = this.datepipe.transform(this.dateFinGlobale, "yyyy-MM-dd");
    console.log(this.lastDay);
    // this.lastDay = lastDayDate.toLocaleDateString("en-CA").split("T")[0]; // Formate en yyyy-MM-dd
    this.crudservice
      .statistiquesParDate(this.firstDay, this.lastDay)
      .subscribe((data) => {
        this.statistiqueEtablissement = data;
        this.calculateTotals();
        console.table(this.statistiqueEtablissement);
      });

    this.crudservice
      .statistiquesMouvementsParDate(this.firstDay, this.lastDay)
      .subscribe((data) => {
        this.statistiqueMouvements = data;

        console.table(this.statistiqueMouvements);
      });
    // } else {
    //   this.lastDay = null; // Si pas de sélection, pas de date
    // }
  }

  // Méthode pour obtenir le dernier jour d'un mois
  getLastDayOfMonth(year: number, month: number): Date {
    console.log(new Date(year, month, 0));
    return new Date(year, month, 0); // Le 0 retourne le dernier jour du mois précédent
  }

  entitiesEtablissement: Etablissement[];

  datePrintAllCentre: any;
  click: boolean;
  // displayNationalite: boolean;

  sizeFile = 0;
  // calendar_ar: {
  //   closeText: string;
  //   prevText: string;
  //   nextText: string;
  //   currentText: string;
  //   monthNames: string[];
  //   monthNamesShort: string[];
  //   dayNames: string[];
  //   dayNamesShort: string[];
  //   dayNamesMin: string[];
  //   weekHeader: string;
  //   dateFormat: string;
  //   firstDay: number;
  //   isRTL: boolean;
  //   showMonthAfterYear: boolean;
  //   yearSuffix: string;
  // };
  constructor(
    private breadcrumbService: BreadcrumbService,
    private token: TokenStorageService,
    private crudservice: CrudEnfantService,
    private rapportService: RapportService,
    public datepipe: DatePipe,

    private datePipe: DatePipe,
    private appConfigService: AppConfigService,
    private router: Router
  ) {
    this.breadcrumbService.setItems([
      { label: "الإستقبال", routerLink: ["/"] },

      { label: "القائمات" },
    ]);
  }
  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
    this.currentUser = this.token.getUserFromTokenFromToken();

    this.calendar_ar = this.calendar_ar = this.appConfigService.calendarConfig;
    this.years =
      this.years +
      (new Date().getFullYear() - 5) +
      ":" +
      (new Date().getFullYear() + 9);

    // this.calendar_ar = this.calendar_ar = this.appConfigService.calendarConfig;
    this.crudservice
      .trouverEtablissementsActifs("etablissement")
      .subscribe((data) => {
        this.entitiesEtablissement = data.result;
      });
  }
  printAllCentre(etablissement: Etablissement, situationJudiciaire: String) {
    console.log(this.lastDay);
    console.log(this.datePipe.transform(this.lastDay, "yyyy-MM-dd"));
    let pDFListExistDTO = new PDFListExistDTO();
    let etablissements: Etablissement[] = []; // Initialisation du tableau
    etablissements.push(etablissement); // Ajout de l'établissement
    pDFListExistDTO.etablissements = etablissements;
    pDFListExistDTO.etatJuridiue = situationJudiciaire;
    pDFListExistDTO.datePrintAllCentre = this.datePipe.transform(
      this.lastDay,
      "yyyy-MM-dd"
    );
    console.log(pDFListExistDTO.datePrintAllCentre);
    this.click = true;

    this.rapportService.genererRapportPdfMensuel(pDFListExistDTO).subscribe(
      (x) => {
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
  }

  openPDFInNewTab(data) {
    window.open(data, "_blank");
  }
  etablissement: Etablissement;
  downloadEtablissementData(
    etablissement: Etablissement,
    situationJudiciaire: String
  ) {
    this.click = true;
    console.log(etablissement.id);
    this.printAllCentre(etablissement, situationJudiciaire);
  }

  downloadStatistiqueCentres() {
    console.log(this.datePipe.transform(this.lastDay, "yyyy-MM-dd"));
    let pDFListExistDTO = new PDFListExistDTO();

    pDFListExistDTO.datePrintAllCentre = this.datePipe.transform(
      this.lastDay,
      "yyyy-MM-dd"
    );
    // console.log(this.currentUser.etablissement);
    // pDFListExistDTO.etablissement = this.currentUser.etablissement;
    // console.log(this.currentUser.etablissement);
    this.click = true;

    this.rapportService.genererStatistiquePdfMensuel(pDFListExistDTO).subscribe(
      (x) => {
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
      },
      (error) => {
        // Handle error here
        console.error("An error occurred while generating the PDF:", error);
        this.click = false;
        // You can show an alert or display a user-friendly message if needed
        alert("فشل إنشاء ملف PDF. يرجى المحاولة مرة أخرى.");
      }
    );
  }


  
  downloadStatistiquePrisons() {
   
     
    this.click = true;

    this.rapportService
      .genererStatistiquePdfPrison(
        this.datepipe.transform(this.dateDebutGlobale, "yyyy-MM-dd"),
        this.datepipe.transform(this.dateFinGlobale, "yyyy-MM-dd")
      )
      .subscribe(
        (x) => {
          this.sizeFile = x.size;
          console.log(this.sizeFile);

          const blob = new Blob([x], { type: "application/pdf" });
          const data = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = data;
          link.download = "historique.pdf";

          if (blob) {
            this.sizeFile = 0;
            this.click = false;
          }

          this.openPDFInNewTab(data);
        },
        (error) => {
          // Handle error here
          console.error("An error occurred while generating the PDF:", error);
          this.click = false;
          // You can show an alert or display a user-friendly message if needed
          alert("فشل إنشاء ملف PDF. يرجى المحاولة مرة أخرى.");
        }
      );
  }

   
}
