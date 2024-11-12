import { Component, OnInit, ViewChild } from "@angular/core";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { DetentionService } from "src/app/demo/service/detention.service";
import { DocumentService } from "src/app/demo/service/document.service";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";
import { CarteDepotComponent } from "../carte-depot/carte-depot.component";
import { EditDocumentComponent } from "../edit-document/edit-document.component";
import { CarteHebergementComponent } from "../carte-hebergement/carte-hebergement.component";

@Component({
  selector: "app-doc-hebergement",
  templateUrl: "./doc-hebergement.component.html",
  styleUrls: ["./doc-hebergement.component.css"],
})
export class DocHebergementComponent implements OnInit {
  @ViewChild(EditDocumentComponent)
  private editDocumentComponent: EditDocumentComponent;

  @ViewChild(CarteHebergementComponent)
  private carteHebergementComponent: CarteHebergementComponent;

  idValide: string;
  constructor(
    private crudservice: CrudEnfantService,
    private detentionService: DetentionService,
    private documentService: DocumentService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([
      { label: "الإستقبال", routerLink: ["/"] },
      { label: "القضايا ", routerLink: ["/mineur/Affaire"] },
      { label: "   بطاقات إيواء" },
    ]);
  }

  ngOnDestroy() {
    window.localStorage.removeItem("idValide");
  }
  ngOnInit() {
    let idValide = window.localStorage.getItem("idValide");
    this.idValide = idValide;
    console.log(idValide);
  }

  onTabChanged(event) {
    if (event.index == 0) {
      this.carteHebergementComponent.refresh();
    } else {
      console.log("aaaaaaa");
      this.editDocumentComponent.refresh(); //Or whatever name the method is called
    }
  }
}
