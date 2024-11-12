import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-details-enfant",
  templateUrl: "./details-enfant.component.html",
  styleUrls: ["./details-enfant.component.css"],
})
export class DetailsEnfantComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  @Input() enfantLocal: any;
  @Input() arrestation: any;
  @Input() residence: any;
  @Input() msg: string;
  @Input() isSaved: boolean;
  @Input() allowNewAddArrestation: boolean;
  showImg() {
    // Logique pour afficher l'image
  }


  
}
