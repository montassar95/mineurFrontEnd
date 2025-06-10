import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";
import { MessageService } from "primeng/api";
import { TokenStorageService } from "src/app/_services/token-storage.service";
@Component({
  selector: "app-affaire",
  templateUrl: "./affaire.component.html",
  styleUrls: ["./affaire.component.scss"],
  providers: [MessageService],
})
export class AffaireComponent implements OnInit {
  idCarteRecup: number;
  idCarteDepot: number;
  idTansfert: number;
  idHeber: number;
  idArreterLexecution: number;
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

      { label: " القضايا" },
    ]);
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
  }

  dirCarteRecup() {
    this.crudservice
      .getLigneById("enfant", this.idCarteRecup)
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

          window.localStorage.setItem("idValide", this.idCarteRecup.toString());
          this.router.navigate(["/mineur/docRecup"]);
        }
      });
  }
  dirHeber() {
    this.crudservice.getLigneById("enfant", this.idHeber).subscribe((data) => {
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

        window.localStorage.setItem("idValide", this.idHeber.toString());
        this.router.navigate(["/mineur/docHeber"]);
      }
    });
  }

  dirCarteDepot() {
    this.crudservice
      .getLigneById("enfant", this.idCarteDepot)
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

          window.localStorage.setItem("idValide", this.idCarteDepot.toString());
          this.router.navigate(["/mineur/docDepot"]);
        }
      });
  }

  dirTansfert() {
    this.crudservice
      .getLigneById("enfant", this.idTansfert)
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

          window.localStorage.setItem("idValide", this.idTansfert.toString());
          this.router.navigate(["/mineur/Transfert"]);
        }
      });
  }

  dirArreterLexecution() {
    this.crudservice
      .getLigneById("enfant", this.idArreterLexecution)
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
            this.idArreterLexecution.toString()
          );
          this.router.navigate(["/mineur/ArreterLexecution"]);
        }
      });
  }

  // search(id: number) {

  // 	this.crudservice.getLigneById("enfant", id)
  // 		.subscribe(data => {
  // 			if (data.result == null) {

  // 				this.service.add({
  // 					key: 'tst',
  // 					severity: 'error',
  // 					summary: '.   خطأ    ',
  // 					detail: 'عليك التثبت من معرف الطفل'
  // 				});
  // 				this.msg = 'عليك التثبت من معرف الطفل';

  // 			} else {
  // 				this.enfantLocal = data.result;

  // 			}
  // 		});
  // }
}
