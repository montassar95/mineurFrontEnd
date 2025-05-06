import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { SelectItem, ConfirmationService, MessageService } from "primeng";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { EventService } from "src/app/demo/service/eventservice";
import { NodeService } from "src/app/demo/service/nodeservice";
import { RapportService } from "src/app/demo/service/rapport.service";
import { Gouvernorat } from "src/app/domain/gouvernorat";
import { PDFListExistDTO } from "src/app/domain/pDFListExistDTO";
import { Tribunal } from "src/app/domain/tribunal";
import { TypeTribunal } from "src/app/domain/typeTribunal";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";

@Component({
  selector: "app-detaille-affaire",
  templateUrl: "./detaille-affaire.component.html",
  styleUrls: ["./detaille-affaire.component.css"],
  providers: [MessageService, ConfirmationService],
})
export class DetailleAffaireComponent implements OnInit {
  displayTribunal1: boolean;
  entitiesTribunal: Tribunal[];
  typeTribunalSwich: SelectItem[];
  gouvernoratSwich: SelectItem[];
  numAffaireT1 = "";
  tribunal1Id: number;
  tribunal1 = "";
  click: boolean;
  sizeFile = 0;

  constructor(
    private crudservice: CrudEnfantService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private eventService: EventService,
    private service: MessageService,
    public datepipe: DatePipe,
    private token: TokenStorageService,
    private nodeService: NodeService,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private rapportService: RapportService
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
        label: "كشــف عن القضية  ",
      },
    ]);
  }
  showListTribunal1() {
    this.displayTribunal1 = true;
  }
  ngOnInit(): void {
    this.chargerDropDownListGouv();
    this.chargerDropDownListTypeTribunal();
    this.chargerDropDownListTribunal();
  }

  chargerDropDownListTribunal() {
    this.crudservice.getlistEntity("tribunal").subscribe((data) => {
      this.entitiesTribunal = data.result;
    });
  }

  chargerDropDownListGouv() {
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

  chargerDropDownListTypeTribunal() {
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

  saveTribunal1(tribunal) {
    this.tribunal1 = tribunal.nom_tribunal;
    this.tribunal1Id = tribunal.id;
    this.displayTribunal1 = false;
  }

  cherchcerDetenuParAffaire() {
    let pDFListExistDTO = new PDFListExistDTO();
    pDFListExistDTO.etatJuridiue = "detenusDeMemeAffaire";
    console.log(this.numAffaireT1);
    console.log(this.tribunal1);
    console.log(this.tribunal1Id);
    if (this.numAffaireT1 && this.tribunal1Id) {
      pDFListExistDTO.numAffaire = this.numAffaireT1;
      pDFListExistDTO.tribunalId = this.tribunal1Id;
      pDFListExistDTO.etablissement = this.token?.getUser()?.etablissement;


      //  pDFListExistDTO.etablissements = []; 
      // pDFListExistDTO.etablissements.push(this.token?.getUser()?.etablissement);
     
      this.rapportService.genererRapportPdfActuel(pDFListExistDTO).subscribe(
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
      console.log("errur")
      this.service.add({
        key: "tst",
        severity: "error",
        summary: "تثبت   ",
        detail: "قم بإدراج عدد القضية والمحكمة      ",
      });
    }
  }
  openPDFInNewTab(data) {
    window.open(data, "_blank");
  }
}
