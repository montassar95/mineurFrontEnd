import { DatePipe } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { DocumentService } from "src/app/demo/service/document.service";
import { Document } from "src/app/domain/document";

@Component({
  selector: "app-guide",
  templateUrl: "./guide.component.html",
  styleUrls: ["./guide.component.css"],
})
export class GuideComponent implements OnInit {
  @Input()
  idEnfant: any;

  @Input()
  idArrestation: any;

  documents: Document[] = [];
  currentUser: any;
  constructor(
    private crudservice: CrudEnfantService,
    private documentService: DocumentService,
    public datepipe: DatePipe,
    private router: Router,
    private token: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
    // this.documentService
    //   .trouverDocumentsJudiciairesDetention(this.idEnfant, this.idArrestation)
    //   .subscribe((data) => {
    //     if (data.result == null) {
    //       console.log(data.result);
    //     } else {
    //       console.log(
    //         "***************************************************************************************************"
    //       );

    //       console.log(data.result);
    //       this.documents = data.result;
    //     }
    //   });
  }
}
