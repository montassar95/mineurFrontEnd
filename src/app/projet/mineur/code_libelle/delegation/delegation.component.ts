import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService, SelectItem } from "primeng/api";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { Delegation } from "src/app/domain/delegation";
import { Gouvernorat } from "src/app/domain/gouvernorat";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";

@Component({
  selector: "app-delegation",
  templateUrl: "./delegation.component.html",
  styleUrls: ["./delegation.component.scss"],
  providers: [MessageService],
})
export class DelegationComponent implements OnInit {
  display = false;
  gouvernorats: SelectItem[];
  gouvernoratSwich: SelectItem[];
  gouvernoratLocal: Gouvernorat;
  delegation: Delegation;
  id;
  nom;
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

      { label: "رموز الهوية" },
      { label: "المعتمديات" },
    ]);
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
    this.showAllDelegation();
    this.showAllGouvernorat();
  }

  delegations: Delegation[] = [];

  showAllDelegation() {
    this.crudservice.getlistEntity("delegation").subscribe((data) => {
      if (data.result) {
        this.delegations = data.result;
      } else {
        this.delegations = [];
      }
    });
  }
  showAllGouvernorat() {
    this.crudservice.getlistEntity("gouvernorat").subscribe((data) => {
      if (data.result) {
        console.log(data.result);
        this.gouvernorats = [];
        this.gouvernoratSwich = [];
        data.result.forEach((gouvernorat: Gouvernorat, value: any) => {
          this.gouvernoratSwich.push({
            label: gouvernorat.libelle_gouvernorat,
            value: gouvernorat.libelle_gouvernorat,
          });
          this.gouvernorats.push({
            label: gouvernorat.libelle_gouvernorat,
            value: gouvernorat,
          });
        });
      } else {
        this.gouvernorats = [];
      }
    });
  }
  onChangGouv(event) {
    this.gouvernoratLocal = event.value;
  }
  addDel() {
    this.delegation = new Delegation();
    this.delegation.id = this.id;
    this.delegation.libelle_delegation = this.nom;

    this.delegation.gouvernorat = this.gouvernoratLocal;

    this.crudservice
      .createLigne("delegation", this.delegation)
      .subscribe((data) => {
        if (data.result) {
          console.log(data.result);
          this.showAllDelegation();
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

  delete(delegation: Delegation) {
    this.crudservice
      .deleteLigne("delegation", delegation.id)
      .subscribe((data) => {
        if (data.status == 417) {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: " عليك تثبت     ",
          });
        } else {
          this.showAllDelegation();
        }
      });
  }
}
