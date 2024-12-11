import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService, SelectItem } from "primeng";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { Etablissement } from "src/app/domain/etablissement";
import { Personelle } from "src/app/domain/personelle";
import { User } from "src/app/domain/user";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";
import { AuthService } from "src/app/_services/auth.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"],
  providers: [MessageService],
})
export class AddUserComponent implements OnInit {
  personelle: Personelle;
  etablissements: SelectItem[];
  id;
  nom;
  prenom;
  login;
  pwd;
  update = false;
  etablissementLocal: Etablissement;
  @Output() closeEvent = new EventEmitter<boolean>();
  idUser = 0;

  @Input() user: User | null = null; // Accept user for editing

  roles = [
    { label: "المكتب الجزائي ", value: "user" },
    { label: "مشرف على التطبيق", value: "mod" },
    { label: "  متــــابعة  ", value: "dir" },
  ];

  role = null;

  form: any = {};
  constructor(
    private authService: AuthService,
    private crudservice: CrudEnfantService,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private token: TokenStorageService,
    private service: MessageService
  ) {}

  ngOnInit(): void {
    // this.personelle = new Personelle();
    // this.id = this.token.getUser().personelle.id;
    // this.nom = this.token.getUser().personelle.nom;
    // this.prenom = this.token.getUser().personelle.prenom;
    // this.etablissementLocal = this.token.getUser().personelle.etablissement;
    //this.showPwd=true;
    this.listEtab();
  }

  ngOnChanges() {
    console.log(this.user);
    if (this.user) {
      this.crudservice.getLigneById("user", this.user.id).subscribe((data) => {
        if (data.result != null) {
          this.idUser = data.result.id;
          console.log(data.result);
          this.id = data.result.numAdministratif;
          this.login = data.result.username;
          this.role = data.result.roles[0];
          if (data.result.roles[0].name == "ROLE_USER") {
            console.log("hhhhhhhhhhhhhhhhhh");
            this.role = "user";
            console.log(this.role);
          } else if (data.result.roles[0].name == "ROLE_MODERATOR") {
            this.role = "mod";
          } else if (data.result.roles[0].name == "ROLE_DIRECTEUR") {
            this.role = "dir";
          }
          // Assuming roles is an array
          this.pwd = ""; // You might want to reset the password to allow the user to enter a new one
          //   this.personelle = data.result.personelle;
          this.nom = data.result.nom;
          this.prenom = data.result.prenom;

          this.etablissementLocal = data.result.etablissement;
          this.update = true;
          // this.showPwd = false;
        }
      });
    } else {
      // this.showPwd = true;
    }
  }
  reset() {
    this.id = null;
    this.nom = "";
    this.prenom = "";
    this.login = "";
    this.pwd = "";
    this.etablissementLocal = null;
    this.role = null;
    this.update = false;
  }
  close() {
    // Reset all form fields
    this.reset();

    // Emit the close event to notify the parent component
    this.closeEvent.emit(false);
  }
  // showPwd = true;
  // toggleUpdatePassword() {
  //   this.showPwd = !this.showPwd;
  // }
  onChangeEta(event) {
    this.etablissementLocal = event.value;
  }
  listEtab() {
    this.crudservice.getlistEntity("etablissement").subscribe((data) => {
      this.etablissements = [];
      data.result.forEach((etablissement: Etablissement, value: any) => {
        this.etablissements.push({
          label: etablissement.libelle_etablissement,
          value: etablissement,
        });
      });
    });
  }

  onChange(event) {
    this.role = event.value;
  }

  // addUser() {
  //   this.personelle = new Personelle();
  //   this.personelle.id = this.id;
  //   this.personelle.nom = this.nom;
  //   this.personelle.prenom = this.prenom;
  //   this.personelle.etablissement = this.etablissementLocal;

  //   this.crudservice
  //     .createLigne("personelle", this.personelle)
  //     .subscribe((data) => {
  //       console.log(data);
  //       if (data.result) {
  //         console.log(data.result);
  //         if (this.update) {
  //           this.closeEvent.emit(false);
  //           this.reset();
  //         } else {
  //           this.onSubmit();
  //         }
  //       }
  //     });
  // }

  addUser(): void {
    if (!this.update) {
      this.form = {
        username: this.login,
        role: this.role,
        password: this.pwd,
        nom: this.nom,
        prenom: this.prenom,
        numAdministratif: this.id,
        etablissement: this.etablissementLocal,
      };

      this.user = this.form;

      this.user.role = [this.role];
      this.authService.register(this.user).subscribe(
        (data) => {
          console.log(data);
          this.closeEvent.emit(false);
          this.reset();
        },
        (err) => {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   تثبت من إسم مستعمل أو كلمة السر     ",
            detail: this.user.username,
          });
        }
      );
    } else {
      this.form = {
        username: this.login,
        role: this.role,
        password: this.pwd,
        nom: this.nom,
        prenom: this.prenom,
        numAdministratif: this.id,
        etablissement: this.etablissementLocal,
      };

      this.user = this.form;

      this.user.role = [this.role];
      console.log(this.user);
      this.authService.updateUser(this.user, this.idUser).subscribe(
        (data) => {
          console.log(data);
          this.closeEvent.emit(false);
          this.user = undefined;
          this.reset();
        },
        (err) => {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   تثبت من إسم مستعمل أو كلمة السر     ",
            detail: this.user.username,
          });
        }
      );
    }
  }
}
