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
  styleUrls: ["./add-user.component.scss"],
  providers: [MessageService],
})
export class AddUserComponent implements OnInit {
  personelle: Personelle;
  etablissements: SelectItem[];
  id;
  nom;
  prenom;
  telephone;
  login;
  pwd;
  update = false;

  etablissementId: any = null; // ici tu stockes juste l'ID
  @Output() closeEvent = new EventEmitter<boolean>();
  idUser = 0;

  @Input() user: User | null = null; // Accept user for editing

  roles = [
    { label: "المكتب الجزائي ", value: "user" },
    { label: "مشرف على التطبيق", value: "mod" },
    { label: "المكتب الإجتماعي", value: "soc" },
    { label: "  متــــابعة  ", value: "dir" },
  ];

  role = null;

  form: any = {};
  currentUser: any;
  constructor(
    private authService: AuthService,
    private crudservice: CrudEnfantService,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private token: TokenStorageService,
    private service: MessageService
  ) {}

  ngOnInit(): void {
    this.reset();
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }

    // this.personelle = new Personelle();
    // this.id = this.token.getUserFromTokenFromToken().personelle.id;
    // this.nom = this.token.getUserFromTokenFromToken().personelle.nom;
    // this.prenom = this.token.getUserFromTokenFromToken().personelle.prenom;
    // this.etablissementId = this.token.getUserFromTokenFromToken().personelle.etablissement;
    //this.showPwd=true;
    this.listEtab();
  }

  ngOnChanges() {
    this.reset();
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
            this.role = "user";
            console.log(this.role);
          } else if (data.result.roles[0].name == "ROLE_MODERATOR") {
            this.role = "mod";
          } else if (data.result.roles[0].name == "ROLE_DIRECTEUR") {
            this.role = "dir";
          } else if (data.result.roles[0].name == "ROLE_SOCIAL_USER") {
            this.role = "soc";
          }
          // Assuming roles is an array
          this.pwd = ""; // You might want to reset the password to allow the user to enter a new one
          //   this.personelle = data.result.personelle;
          this.nom = data.result.nom;
          this.prenom = data.result.prenom;
          this.telephone = data.result.telephone;

          this.etablissementId = data.result.etablissement.id;
          this.update = true;
          // this.showPwd = false;
        }
      });
    } else {
      // this.showPwd = true;
    }
  }

  // methode rest utuliser dans compent parent
  reset() {
    this.id = null;
    this.nom = "";
    this.prenom = "";
    this.telephone = "";
    this.login = "";
    this.pwd = "";
    this.etablissementId = null;
    this.role = null;
    this.update = false;
    this.generatedPassword = null;
    this.afficheDataUpdated = false;
    this.errorMessage = null;
    this.fieldErrors = {};
  }
  // close() {
  //   // Emit the close event to notify the parent component
  //   this.closeEvent.emit(false);

  //   // Reset all form fields
  // }

  close() {
    // Fermer immédiatement la fenêtre
    this.closeEvent.emit(false);

    // Faire le reset un petit moment après (par ex. 100 ms)
    setTimeout(() => {
      this.reset();
    }, 100);
  }

  onChangeEta(event) {
    this.etablissementId = event.value;
  }
  listEtab() {
    this.crudservice.getlistEntity("etablissement").subscribe((data) => {
      this.etablissements = [];
      data.result.forEach((etablissement: Etablissement, value: any) => {
        this.etablissements.push({
          label: etablissement.libelle_etablissement,
          value: etablissement.id,
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
  //   this.personelle.etablissement = this.etablissementId;

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

  errorMessage: string | null = null;
  fieldErrors: { [key: string]: string } = {};
  generatedPassword: string | null = null; // mot de passe généré par le backend (optionnel)
  afficheDataUpdated = false;
  addUser(): void {
    // Préparer les données utilisateur à envoyer
    const userData = {
      username: this.login,
      role: [this.role],
      password: this.pwd,
      nom: this.nom,
      prenom: this.prenom,
      telephone: this.telephone,
      numAdministratif: this.id,
      etablissementId: this.etablissementId,
    };

    // Fonction pour gérer le succès de la requête
    const onSuccess = (response: any) => {
      this.errorMessage = null;
      this.fieldErrors = {};
      this.generatedPassword = response.password || null;
      this.user = {
        username: this.login,
        role: [this.role],
        password: this.generatedPassword, // temporairement stocké
        nom: this.nom,
        prenom: this.prenom,
        telephone: this.telephone,
        numAdministratif: this.id,
        etablissement: this.etablissements.find(
          (e) => e.value.id === this.etablissementId
        )?.value,
        block: null,
      };
      let message = response.message || "Opération réussie";
      if (this.generatedPassword) {
        message += ` | Mot de passe initial : ${this.generatedPassword}`;
      } else {
        this.afficheDataUpdated = true;
      }

      this.service.add({
        key: "tst",
        severity: "success",
        summary: "✔ Succès",
        detail: message,
      });
    };

    // Fonction pour gérer l’erreur de la requête
    const onError = (error: any) => {
      this.fieldErrors = {};

      if (error?.status === 400 && typeof error.error === "object") {
        // Erreurs sur des champs spécifiques
        this.fieldErrors = error.error;
        this.errorMessage = "Veuillez corriger les erreurs indiquées.";
      } else {
        this.errorMessage =
          error?.error?.message ||
          "Une erreur est survenue, veuillez réessayer.";
      }

      this.service.add({
        key: "tst",
        severity: "error",
        summary: "⚠ Erreur",
        detail: this.errorMessage,
      });
    };

    // Appeler le backend selon mode ajout ou mise à jour
    if (!this.update) {
      this.authService.register(userData).subscribe(onSuccess, onError);
    } else {
      this.authService
        .updateUser(userData, this.idUser)
        .subscribe(onSuccess, onError);
    }
  }
}
