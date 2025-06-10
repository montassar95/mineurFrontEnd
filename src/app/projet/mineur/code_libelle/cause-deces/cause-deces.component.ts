import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { CauseDeces } from "src/app/domain/causeDeces";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";

@Component({
  selector: "app-cause-deces",
  templateUrl: "./cause-deces.component.html",
  styleUrls: ["./cause-deces.component.css"],
  providers: [MessageService],
})
export class CauseDecesComponent implements OnInit {
  causeDecess: CauseDeces[] = [];
  display = false;

  id;
  nom;
  causeDeces: CauseDeces;
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
      { label: "أسباب الوفاة" },
    ]);
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
    this.showAllCauseDecess();
  }

  showAllCauseDecess() {
    this.crudservice.getlistEntity("causeDeces").subscribe((data) => {
      if (data.result) {
        this.causeDecess = data.result;
        console.log(this.causeDecess);
      } else {
        this.causeDecess = [];
      }
    });
  }
  addCaDe() {
    this.causeDeces = new CauseDeces();
    this.causeDeces.id = this.id;
    this.causeDeces.libelle_causeDeces = this.nom;

    this.crudservice
      .createLigne("causeDeces", this.causeDeces)
      .subscribe((data) => {
        if (data.result) {
          console.log(data.result);
          this.showAllCauseDecess();
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
  delete(causeDeces: CauseDeces) {
    this.crudservice
      .deleteLigne("causeDeces", causeDeces.id)
      .subscribe((data) => {
        if (data.status == 417) {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: " عليك تثبت     ",
          });
        } else {
          this.showAllCauseDecess();
        }
      });
  }
}
