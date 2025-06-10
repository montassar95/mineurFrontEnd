import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { TypeJuge } from "src/app/domain/typeJuge";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";

@Component({
  selector: "app-type-juge",
  templateUrl: "./type-juge.component.html",
  styleUrls: ["./type-juge.component.css"],
  providers: [MessageService],
})
export class TypeJugeComponent implements OnInit {
  id;
  nom;
  display = false;
  tpeJuge: TypeJuge;
  situations = [
    { label: "  يتم الاحتساب ", value: "cal" },
    { label: "   لا يتم الاحتساب  ", value: "nonCal" },
    { label: "   في حالة إيقاف     ", value: "arret" },
  ];

  situation = null;
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

      { label: "رموز القضايا" },
      { label: " قائمة  أنواع الأحكام" },
    ]);
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
    this.showAllTypeJuge();
  }
  typeJuges: TypeJuge[] = [];

  showAllTypeJuge() {
    this.crudservice.getlistEntity("typeJuge").subscribe((data) => {
      if (data.result) {
        this.typeJuges = data.result;
      } else {
        this.typeJuges = [];
      }
    });
  }

  addTyJu() {
    this.tpeJuge = new TypeJuge();
    this.tpeJuge.id = this.id;
    this.tpeJuge.libelle_typeJuge = this.nom;
    this.tpeJuge.situation = this.situation;

    this.crudservice.createLigne("typeJuge", this.tpeJuge).subscribe((data) => {
      if (data.result) {
        console.log(data.result);
        this.showAllTypeJuge();
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

  onChange(event) {
    this.situation = event.value;
  }

  delete(typeJuge: TypeJuge) {
    this.crudservice.deleteLigne("typeJuge", typeJuge.id).subscribe((data) => {
      if (data.status == 417) {
        this.service.add({
          key: "tst",
          severity: "error",
          summary: ".   خطأ    ",
          detail: " عليك تثبت     ",
        });
      } else {
        this.showAllTypeJuge();
      }
    });
  }
}
