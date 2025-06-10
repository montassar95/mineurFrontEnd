import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";

@Component({
  selector: "app-procedure-appel",
  templateUrl: "./procedure-appel.component.html",
  styleUrls: ["./procedure-appel.component.scss"],
  providers: [MessageService],
})
export class ProcedureAppelComponent implements OnInit {
  idOpposition: number;
  idObservation: number;
  idAppelParquet: number;
  idAppelEnfant: number;
  idRevue: number;
  msg = "";
  isExist: boolean;
  currentUser: any;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private crudservice: CrudEnfantService,
    private router: Router,
    private service: MessageService,
    private token: TokenStorageService
  ) {
    this.breadcrumbService.setItems([
      { label: "الإستقبال", routerLink: ["/"] },

      { label: "إجراءات الطعن " },
    ]);
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
  }
  dirOpposition() {
    this.crudservice
      .getLigneById("enfant", this.idOpposition)
      .subscribe((data) => {
        if (data.result == null) {
          this.msg = "عليك التثبت من معرف الطفل";
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: "عليك التثبت من معرف الطفل",
          });

          this.isExist = true;
        } else {
          window.localStorage.removeItem("idValide");

          window.localStorage.setItem("idValide", this.idOpposition.toString());
          this.router.navigate(["/mineur/Opposition"]);
        }
      });
  }
  dirObservation() {
    this.crudservice
      .getLigneById("enfant", this.idObservation)
      .subscribe((data) => {
        if (data.result == null) {
          this.msg = "عليك التثبت من معرف الطفل";
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: "عليك التثبت من معرف الطفل",
          });

          this.isExist = true;
        } else {
          window.localStorage.removeItem("idValide");

          window.localStorage.setItem(
            "idValide",
            this.idObservation.toString()
          );
          this.router.navigate(["/mineur/Observation"]);
        }
      });
  }

  dirAppelParquet() {
    this.crudservice
      .getLigneById("enfant", this.idAppelParquet)
      .subscribe((data) => {
        if (data.result == null) {
          this.msg = "عليك التثبت من معرف الطفل";
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: "عليك التثبت من معرف الطفل",
          });

          this.isExist = true;
        } else {
          window.localStorage.removeItem("idValide");

          window.localStorage.setItem(
            "idValide",
            this.idAppelParquet.toString()
          );
          this.router.navigate(["/mineur/AppelParquet"]);
        }
      });
  }

  dirAppelEnfant() {
    this.crudservice
      .getLigneById("enfant", this.idAppelEnfant)
      .subscribe((data) => {
        if (data.result == null) {
          this.msg = "عليك التثبت من معرف الطفل";
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: "عليك التثبت من معرف الطفل",
          });

          this.isExist = true;
        } else {
          window.localStorage.removeItem("idValide");

          window.localStorage.setItem(
            "idValide",
            this.idAppelEnfant.toString()
          );
          this.router.navigate(["/mineur/AppelEnfant"]);
        }
      });
  }

  dirRevue() {
    this.crudservice.getLigneById("enfant", this.idRevue).subscribe((data) => {
      if (data.result == null) {
        this.msg = "عليك التثبت من معرف الطفل";
        this.service.add({
          key: "tst",
          severity: "error",
          summary: ".   خطأ    ",
          detail: "عليك التثبت من معرف الطفل",
        });

        this.isExist = true;
      } else {
        window.localStorage.removeItem("idValide");

        window.localStorage.setItem("idValide", this.idRevue.toString());
        this.router.navigate(["/mineur/Revue"]);
      }
    });
  }
}
