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

@Component({
  selector: "app-mensuel",
  templateUrl: "./mensuel.component.html",
  styleUrls: ["./mensuel.component.scss"],
  providers: [MessageService],
})
export class MensuelComponent implements OnInit {
  datePrintAllCentre: any;
  click: boolean;
  // displayNationalite: boolean;

  sizeFile = 0;
  calendar_ar: {
    closeText: string;
    prevText: string;
    nextText: string;
    currentText: string;
    monthNames: string[];
    monthNamesShort: string[];
    dayNames: string[];
    dayNamesShort: string[];
    dayNamesMin: string[];
    weekHeader: string;
    dateFormat: string;
    firstDay: number;
    isRTL: boolean;
    showMonthAfterYear: boolean;
    yearSuffix: string;
  };
  constructor(
    private breadcrumbService: BreadcrumbService,

    private crudservice: CrudEnfantService,
    public datepipe: DatePipe,

    private datePipe: DatePipe
  ) {
    this.breadcrumbService.setItems([
      { label: "الإستقبال", routerLink: ["/"] },

      { label: "القائمات" },
    ]);
  }
  ngOnInit(): void {
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
  printAllCentre() {
    console.log(this.datePipe.transform(this.datePrintAllCentre, "yyyy-MM-dd"));
    let pDFListExistDTO = new PDFListExistDTO();

    pDFListExistDTO.datePrintAllCentre = this.datePipe.transform(
      this.datePrintAllCentre,
      "yyyy-MM-dd"
    );
    this.click = true;
    // this.crudservice.exportEtatPdf(pDFListExistDTO).subscribe((x) => {
    this.crudservice.exportAllEtat(pDFListExistDTO).subscribe((x) => {
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
}