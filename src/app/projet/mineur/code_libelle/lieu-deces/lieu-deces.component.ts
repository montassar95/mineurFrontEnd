import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { LieuDeces } from "src/app/domain/lieuDeces";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";

@Component({
  selector: "app-lieu-deces",
  templateUrl: "./lieu-deces.component.html",
  styleUrls: ["./lieu-deces.component.css"],
  providers: [MessageService],
})
export class LieuDecesComponent implements OnInit {
  display = false;
  id;
  nom;
  lieuDeces: LieuDeces;
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
      { label: "مكان الوفاة" },
    ]);
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
    this.showAllLieuDeces();
  }
  lieuDecess: LieuDeces[] = [];

  showAllLieuDeces() {
    this.crudservice.getlistEntity("lieuDeces").subscribe((data) => {
      if (data.result) {
        this.lieuDecess = data.result;
      } else {
        this.lieuDecess = [];
      }
    });
  }

  addLiDe() {
    this.lieuDeces = new LieuDeces();
    this.lieuDeces.id = this.id;
    this.lieuDeces.libellelieuDeces = this.nom;

    this.crudservice
      .createLigne("lieuDeces", this.lieuDeces)
      .subscribe((data) => {
        if (data.result) {
          console.log(data.result);
          this.showAllLieuDeces();
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
  delete(lieuDeces: LieuDeces) {
    this.crudservice
      .deleteLigne("lieuDeces", lieuDeces.id)
      .subscribe((data) => {
        if (data.status == 417) {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: " عليك تثبت     ",
          });
        } else {
          this.showAllLieuDeces();
        }
      });
  }
}
