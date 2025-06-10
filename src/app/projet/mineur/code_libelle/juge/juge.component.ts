import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TokenStorageService } from "src/app/_services/token-storage.service";

@Component({
  selector: "app-juge",
  templateUrl: "./juge.component.html",
  styleUrls: ["./juge.component.css"],
})
export class JugeComponent implements OnInit {
  currentUser: any;

  constructor(private router: Router, private token: TokenStorageService) {}

  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
  }
}
