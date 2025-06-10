import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { DetentionService } from "src/app/demo/service/detention.service";

@Component({
  selector: "app-details-enfant",
  templateUrl: "./details-enfant.component.html",
  styleUrls: ["./details-enfant.component.css"],
})
export class DetailsEnfantComponent implements OnInit {
  photo: string;
  @Input() enfantLocal: any;
  @Input() arrestation: any;
  @Input() residence: any;
  @Input() msg: string;
  @Input() isSaved: boolean;
  @Input() allowNewAddArrestation: boolean;
  currentUser: any;
  showImg() {
    // Logique pour afficher l'image
  }
  constructor(
    private detentionService: DetentionService,
    private router: Router,
    private token: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
    this.getPhotoById(
      this.arrestation?.arrestationId?.idEnfant,
      this.arrestation?.arrestationId?.numOrdinale
    );
  }

  getPhotoById(idEnfant: any, numArr: any) {
    this.photo = "";
    this.detentionService
      .trouverPhotoByIdDetenuEtNumDetention(idEnfant, numArr)
      .subscribe((data) => {
        if (data.result == null) {
        } else {
          this.photo = data.result.img;
        }
      });
  }
}
