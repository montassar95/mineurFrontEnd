import { Component, OnInit, ViewChild } from "@angular/core";

import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";

import { EditDocumentComponent } from "../edit-document/edit-document.component";
import { AddObservationComponent } from "../add-observation/add-observation.component";
import { Router } from "@angular/router";
import { TokenStorageService } from "src/app/_services/token-storage.service";

@Component({
  selector: "app-observation",
  templateUrl: "./observation.component.html",
  styleUrls: ["./observation.component.css"],
})
export class ObservationComponent implements OnInit {
  @ViewChild(EditDocumentComponent)
  private editDocumentComponent: EditDocumentComponent;
  @ViewChild(AddObservationComponent)
  private addObservationComponent: AddObservationComponent;

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
      { label: "تعقيـــب " },
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
      this.addObservationComponent.refresh();
    } else {
      this.editDocumentComponent.refresh(); //Or whatever name the method is called
    }
  }
}
