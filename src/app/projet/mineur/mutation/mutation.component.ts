import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { ignoreElements } from "rxjs/operators";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { Residence } from "src/app/domain/residence";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { AddMutationComponent } from "../add-mutation/add-mutation.component";
import { DetentionService } from "src/app/demo/service/detention.service";

@Component({
  selector: "app-mutation",
  templateUrl: "./mutation.component.html",
  styleUrls: ["./mutation.component.css"],
  providers: [MessageService, ConfirmationService],
})
export class MutationComponent implements OnInit {
  idValide: string;

  residences: Residence[] = [];
  totalResidence = 0;

  autoriseDelet = false;
  isDelet = false;
  residenceToDelet: Residence;

  @ViewChild(AddMutationComponent)
  private addMutationComponent: AddMutationComponent;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private token: TokenStorageService,
    private service: MessageService,
    private crudservice: CrudEnfantService,
    private detentionService: DetentionService,
    private router: Router
  ) {
    this.breadcrumbService.setItems([
      { label: "الإستقبال", routerLink: ["/"] },

      { label: "التغيرات الطارئة  ", routerLink: ["/mineur/Changement"] },
      { label: "النقل" },
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
      //	this.onTabChanged(event );
    } else {
      this.router.navigate(["/mineur/Changement"]);
    }
  }
  onTabChanged(event) {
    if (event.index == 1) {
      this.refresh();
    }
  }

  refresh() {
    this.detentionService
      .trouverResidencesDetentionActiveParIdDetenu("residence", this.idValide)
      .subscribe((data) => {
        if (data.result == null) {
        } else {
          this.residences = data.result;
          this.totalResidence = this.residences.length;

          if (this.totalResidence > 1) {
            if (this.residences[0].statut == 2) {
              if (
                this.residences[1].etablissement.id ==
                this.token.getUser().etablissement.id
              ) {
                this.autoriseDelet = true;
              }
            } else if (this.residences[0].statut == 0) {
              if (
                this.residences[0].etablissement.id ==
                this.token.getUser().etablissement.id
              ) {
                this.autoriseDelet = true;
              }
            }
          }
        }
      });
  }

  delete(residence: Residence) {
    this.isDelet = true;
    this.residenceToDelet = residence;
  }
  yesDelet() {
    if (this.residenceToDelet.statut == 2) {
      this.detentionService
        .supprimerDemandeMutation(this.residenceToDelet.residenceId)
        .subscribe((data) => {
          this.service.add({
            key: "tst",
            severity: "success",
            summary: "تمت عملية حذف     بنجاح    ",
            detail: "1",
          });
          console.log(data.result);
          this.isDelet = false;
          this.refresh();
          this.addMutationComponent.refresh();
        });
    } else if (this.residenceToDelet.statut == 0) {
      console.log(this.residenceToDelet.residenceId);
      this.detentionService
        .supprimerAcceptationMutation(this.residenceToDelet.residenceId)
        .subscribe((data) => {
          this.service.add({
            key: "tst",
            severity: "success",
            summary: "تمت عملية حذف     بنجاح    ",
            detail: "1",
          });
          console.log(data.result);
          this.isDelet = false;
          this.refresh();
          this.addMutationComponent.refresh();
        });
    }
  }
}
