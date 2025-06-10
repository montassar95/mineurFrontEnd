import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";
import { AddAppelEnfantComponent } from "../add-appel-enfant/add-appel-enfant.component";
import { EditDocumentComponent } from "../edit-document/edit-document.component";
import { TokenStorageService } from "src/app/_services/token-storage.service";

@Component({
  selector: "app-propagation",
  templateUrl: "./propagation.component.html",
  styleUrls: ["./propagation.component.scss"],
})
export class PropagationComponent implements OnInit {
  @ViewChild(EditDocumentComponent)
  private editDocumentComponent: EditDocumentComponent;
  @ViewChild(AddAppelEnfantComponent)
  private addAppelEnfantComponent: AddAppelEnfantComponent;

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

      { label: "القضايا ", routerLink: ["/Propagation"] },
      { label: "قرار تمديد " },
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
      this.addAppelEnfantComponent.refresh();
    } else {
      console.log("aaaaaaa");
      this.editDocumentComponent.refresh(); //Or whatever name the method is called
    }
  }
}
