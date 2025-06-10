import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { CauseMutation } from "src/app/domain/causeMutation";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";

@Component({
  selector: "app-cause-mutation",
  templateUrl: "./cause-mutation.component.html",
  styleUrls: ["./cause-mutation.component.css"],
  providers: [MessageService],
})
export class CauseMutationComponent implements OnInit {
  display = false;
  id;
  nom;
  causeMutation: CauseMutation;
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
      { label: "أسباب النقلة" },
    ]);
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
    this.showAllCauseMutation();
  }
  causeMutations: CauseMutation[] = [];

  showAllCauseMutation() {
    this.crudservice.getlistEntity("causeMutation").subscribe((data) => {
      if (data.result) {
        this.causeMutations = data.result;
      } else {
        this.causeMutations = [];
      }
    });
  }

  addCaMu() {
    this.causeMutation = new CauseMutation();
    this.causeMutation.id = this.id;
    this.causeMutation.libelle_causeMutation = this.nom;

    this.crudservice
      .createLigne("causeMutation", this.causeMutation)
      .subscribe((data) => {
        if (data.result) {
          console.log(data.result);
          this.showAllCauseMutation();
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
  delete(causeMutation: CauseMutation) {
    this.crudservice
      .deleteLigne("causeMutation", causeMutation.id)
      .subscribe((data) => {
        if (data.status == 417) {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: " عليك تثبت     ",
          });
        } else {
          this.showAllCauseMutation();
        }
      });
  }
}
