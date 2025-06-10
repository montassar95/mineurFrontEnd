import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { CauseLiberation } from "src/app/domain/causeLiberation";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";

@Component({
  selector: "app-cause-liberation",
  templateUrl: "./cause-liberation.component.html",
  styleUrls: ["./cause-liberation.component.css"],
  providers: [MessageService],
})
export class CauseLiberationComponent implements OnInit {
  display = false;
  id;
  nom;
  causeLiberation: CauseLiberation;
  currentUser: any;
  constructor(
    private crudservice: CrudEnfantService,
    private service: MessageService,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private token: TokenStorageService
  ) {
    this.breadcrumbService.setItems([
      { label: "الإستقبال", routerLink: ["/"] },

      { label: "رموز التغيرات" },
      { label: " موجب السراح  (السراح )" },
    ]);
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
    this.showAllCauseLiberation();
  }

  causeLiberations: CauseLiberation[] = [];

  showAllCauseLiberation() {
    this.crudservice.getlistEntity("causeLiberation").subscribe((data) => {
      if (data.result) {
        this.causeLiberations = data.result;
      } else {
        this.causeLiberations = [];
      }
    });
  }
  addCaLi() {
    this.causeLiberation = new CauseLiberation();
    this.causeLiberation.id = this.id;
    this.causeLiberation.libelleCauseLiberation = this.nom;

    this.crudservice
      .createLigne("causeLiberation", this.causeLiberation)
      .subscribe((data) => {
        if (data.result) {
          console.log(data.result);
          this.showAllCauseLiberation();
        }
      });
    this.display = false;
  }

  add() {
    this.id = "";
    this.nom = "";
    this.display = true;
  }

  update() {
    this.display = true;
  }
  delete(causeLiberation: CauseLiberation) {
    this.crudservice
      .deleteLigne("causeLiberation", causeLiberation.id)
      .subscribe((data) => {
        if (data.status == 417) {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: " عليك تثبت     ",
          });
        } else {
          this.showAllCauseLiberation();
        }
      });
  }
}
