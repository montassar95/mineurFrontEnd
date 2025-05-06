import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService, SelectItem } from "primeng";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { EventService } from "src/app/demo/service/eventservice";
import { NodeService } from "src/app/demo/service/nodeservice";
import { Gouvernorat } from "src/app/domain/gouvernorat";
import { Tribunal } from "src/app/domain/tribunal";
import { TypeTribunal } from "src/app/domain/typeTribunal";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";

@Component({
  selector: "app-detaille-enfant",
  templateUrl: "./detaille-enfant.component.html",
  styleUrls: ["./detaille-enfant.component.scss"],
  providers: [MessageService, ConfirmationService],
})
export class DetailleEnfantComponent implements OnInit {
  displayTribunal1: boolean;
  entitiesTribunal: Tribunal[];
  typeTribunalSwich: SelectItem[];
  gouvernoratSwich: SelectItem[];
  numAffaireT1 = "";
  tribunal1 = "";

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
        label: "  معطيــات",
      } 
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

    this.displayTribunal1 = false;
  }

  dirDetailleAffaire() {
    this.router.navigate(["/mineur/detailleAffaire"]);
  }
}
