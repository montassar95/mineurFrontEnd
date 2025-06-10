import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";
import { EditDocumentComponent } from "../edit-document/edit-document.component";
import { TokenStorageService } from "src/app/_services/token-storage.service";

@Component({
  selector: "app-revue",
  templateUrl: "./revue.component.html",
  styleUrls: ["./revue.component.css"],
})
export class RevueComponent implements OnInit {
  @ViewChild(EditDocumentComponent)
  private editDocumentComponent: EditDocumentComponent;

  idValide: string;
  currentUser: any;

  constructor(
    private crudservice: CrudEnfantService,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private token: TokenStorageService
  ) {
    this.breadcrumbService.setItems([
      { label: "الإستقبال", routerLink: ["/"] },

      { label: "القضايا ", routerLink: ["/Affaire"] },
      { label: "مراجعة " },
    ]);
  }

  ngOnDestroy() {
    window.localStorage.removeItem("idValide");
  }
  ngOnInit() {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }

    let idValide = window.localStorage.getItem("idValide");
    this.idValide = idValide;
    console.log(idValide);
  }

  onTabChanged(event) {
    if (event.index == 0) {
    } else {
      console.log("aaaaaaa");
      this.editDocumentComponent.refresh(); //Or whatever name the method is called
    }
  }
}
