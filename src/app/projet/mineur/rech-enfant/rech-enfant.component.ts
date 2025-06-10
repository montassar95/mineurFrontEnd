import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SelectItem } from "primeng/api";
import { TokenStorageService } from "src/app/_services/token-storage.service";

@Component({
  selector: "app-rech-enfant",
  templateUrl: "./rech-enfant.component.html",
  styleUrls: ["./rech-enfant.component.scss"],
})
export class RechEnfantComponent implements OnInit {
  addForm1: FormGroup;
  id: number;
  currentUser: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private token: TokenStorageService
  ) {}

  ngOnInit() {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
    this.addForm1 = this.formBuilder.group({
      nom: ["", Validators.required],
      prenom: ["", Validators.required],
      nomPere: ["", Validators.required],
      nomGrandPere: ["", Validators.required],
      nomMere: ["", Validators.required],
      prenomMere: ["", Validators.required],
      //  dateNaissance: ['', Validators.required],

      sexe: ["", Validators.required],
    });
  }
  onSubmitAddForm1() {
    console.log(this.addForm1.value);
    window.localStorage.removeItem("enfant");
    window.localStorage.setItem("enfant", JSON.stringify(this.addForm1.value));
    //  this.router.navigate(['mineur/all']);
  }
  onSubmitId() {
    window.localStorage.removeItem("id");
    if (this.id) {
      window.localStorage.setItem("id", this.id.toString());
      // this.router.navigate(['mineur/all']);
    }
  }
}
