import { DatePipe } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { DetentionService } from "src/app/demo/service/detention.service";
import { EventService } from "src/app/demo/service/eventservice";
import { NodeService } from "src/app/demo/service/nodeservice";
import { Enfant } from "src/app/domain/enfant";
import { Residence } from "src/app/domain/residence";
import { Visite } from "src/app/domain/visite";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";

@Component({
  selector: "app-add-visite",
  templateUrl: "./add-visite.component.html",
  styleUrls: ["./add-visite.component.scss"],
})
export class AddVisiteComponent implements OnInit {
  @Input() residence: Residence;
  currentYear: number;
  years: number[] = [2023, 2022]; // Liste des années
  months: { id: number; name: string }[] = [
    { id: 1, name: "جانفــــي" },
    { id: 2, name: "فيفـــري" },
    { id: 3, name: "مــــارس" },
    { id: 4, name: "أفريــــل" },
    { id: 5, name: "مــــاي" },
    { id: 6, name: "جــــوان" },
    { id: 7, name: "جويليــــة" },
    { id: 8, name: "أوت" },
    { id: 9, name: "سبتمبــــر" },
    { id: 10, name: "أكتوبــــر" },
    { id: 11, name: "نوفمبــــر" },
    { id: 12, name: "ديسمبــــر" },
  ]; // Liste des mois

  selectedYear: number; // Année sélectionnée
  selectedMonth: string; // Mois sélectionné
  numberValue: number; // Valeur numérique saisie

  @Output() formData: EventEmitter<{
    year: number;
    month: number;
    value: number;
  }> = new EventEmitter();
  currentUser: any;

  constructor(
    private crudservice: CrudEnfantService,
    private detentionService: DetentionService,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private token: TokenStorageService,
    private nodeService: NodeService,
    private service: MessageService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    public datepipe: DatePipe
  ) {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
  }

  onSubmit() {
    // console.log(this.currentYear);
    // console.log(this.selectedMonth);
    // console.log(this.numberValue);

    if (this.selectedMonth) {
      const selectedMonthNumber = parseInt(this.selectedMonth, 10);
      const formValue = {
        year: this.currentYear,
        month: selectedMonthNumber,
        value: this.numberValue,
      };
      console.log(formValue);
      console.log("--------------------------------------");
      this.formData.emit(formValue);

      this.selectedMonth = null;
      this.numberValue = null;
    }
  }

  verifierVisite() {
    console.log(this.selectedMonth);
    this.detentionService
      .trouverVisitesParIdDetenuEtMoisEtAnnee(
        this.residence.arrestation.enfant.id,
        this.currentYear,
        this.selectedMonth
      )
      .subscribe((data) => {
        if (data.result) {
          console.log("salutttttttttttttttttt");
          console.log(data.result);
          let visite = new Visite();
          visite = data.result;
          this.numberValue = visite.nbrVisite;
        } else {
          this.numberValue = 0;
        }
      });
  }
}
