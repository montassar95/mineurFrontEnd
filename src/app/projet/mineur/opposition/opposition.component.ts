import { Component, OnInit, ViewChild } from "@angular/core";

import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";

import { EditDocumentComponent } from "../edit-document/edit-document.component";
import { AddOppositionComponent } from "../add-opposition/add-opposition.component";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-opposition",
  templateUrl: "./opposition.component.html",
  styleUrls: ["./opposition.component.css"],
})
export class OppositionComponent implements OnInit {
  @ViewChild(EditDocumentComponent)
  private editDocumentComponent: EditDocumentComponent;
  @ViewChild(AddOppositionComponent)
  private addOppositionComponent: AddOppositionComponent;

  idValide: string;
  currentUser: any;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private token: TokenStorageService
  ) {
    this.breadcrumbService.setItems([
      { label: "الإستقبال", routerLink: ["/"] },

      { label: "القضايا ", routerLink: ["/Affaire"] },
      { label: "إعتــــراض " },
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
      this.addOppositionComponent.refresh();
    } else {
      this.editDocumentComponent.refresh(); //Or whatever name the method is called
    }
  }
}
