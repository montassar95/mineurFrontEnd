import { Component, OnInit } from "@angular/core";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { Echappes } from "src/app/domain/echappes";
import { Residence } from "src/app/domain/residence";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { DetentionService } from "src/app/demo/service/detention.service";

@Component({
  selector: "app-echappes",
  templateUrl: "./echappes.component.html",
  styleUrls: ["./echappes.component.css"],
})
export class EchappesComponent implements OnInit {
  idValide: string;

  echappess: Echappes[] = [];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private crudservice: CrudEnfantService,
    private detentionService: DetentionService,
    private token: TokenStorageService
  ) {
    this.breadcrumbService.setItems([
      { label: "الإستقبال", routerLink: ["/"] },

      { label: "التغيرات الطارئة  " },
      { label: "الفرارات" },
    ]);
  }

  ngOnDestroy() {
    window.localStorage.removeItem("idValide");
  }
  ngOnInit() {
    let idValide = window.localStorage.getItem("idValide");
    console.log(idValide);
    if (idValide) {
      this.idValide = idValide;
      this.onTabChanged(event);
    }
  }
  onTabChanged(event) {
    if (event.index == 1) {
      this.detentionService
        .trouverDerniereDetentionParIdDetenu("arrestation", this.idValide)
        .subscribe((data) => {
          if (data.result == null) {
          } else {
            this.detentionService
              .trouverEchappesParIdDetenuEtNumDetention(
                this.idValide,
                data.result.arrestationId.numOrdinale
              )
              .subscribe((data) => {
                if (data.result == null) {
                } else {
                  this.echappess = data.result;
                }
              });
          }
        });
    }
  }
}
