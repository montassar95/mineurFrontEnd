import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";

import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";
import { AddUserComponent } from "../add-user/add-user.component";

interface User {
  id: number;
  personelleId: number;
  fullName: string;
  telephone: string;
  lastLogin: string;
  lastPasswordModifiedDate: string;
  username: string;
  roleName: string;
  etablissement: string;
}

@Component({
  selector: "app-all-users",
  templateUrl: "./all-users.component.html",
  styleUrls: ["./all-users.component.scss"],
  providers: [MessageService],
  //encapsulation: ViewEncapsulation.None,
})
export class AllUsersComponent implements OnInit {
  users: User[] = [];
  displayAddUser = false;

  @ViewChild("addUserComponent") addUserComponent: AddUserComponent; // ou le bon nom

  selectedUser: User | null = null; // Track the selected user for editing
  displayDeleteUser = false;
  currentUser: any;
  constructor(
    private crudservice: CrudEnfantService,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private service: MessageService,
    private token: TokenStorageService
  ) {
    this.breadcrumbService.setItems([
      { label: "الإستقبال", routerLink: ["/"] },

      { label: "المستعملين" },
      { label: " قائمة  المستعملين" },
    ]);
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
    this.showAllUsers();
  }

  addUser() {
    this.displayAddUser = true;
  }
  close(display: boolean) {
    this.displayAddUser = display;
    this.showAllUsers();
  }

  showAllUsers() {
    this.crudservice.getlistEntity("user").subscribe((data) => {
      if (data.result) {
        // Transformation des objets en un format simplifié
        this.users = data.result.map((user) => ({
          id: user.id,
          personelleId: user.numAdministratif,
          fullName: user?.nom + " " + user?.prenom,
          telephone: user?.telephone,
          lastLogin: user?.lastLogin,
          lastPasswordModifiedDate: user?.lastPasswordModifiedDate,
          username: user.username,
          roleName: this.translateRoleToArabic(user.roles[0]?.name), // Traduire le rôle en arabe
          etablissement: user.etablissement?.libelle_etablissement,
          acce:  user.acce ,
        }));
      }
    });
  }

  // Fonction de traduction des rôles
  translateRoleToArabic(role: string): string {
    const roleTranslations: { [key: string]: string } = {
      ROLE_USER: "المكتب الجزائي ", // Traduction du rôle 'ROLE_USER'
      ROLE_MODERATOR: "مشرف على التطبيق", // Traduction du rôle 'ROLE_ADMIN'
      ROLE_DIRECTEUR: "متــــابعة",
      // Ajoute d'autres rôles et leurs traductions ici
    };

    // Retourner la traduction si elle existe, sinon retourner le rôle original
    return roleTranslations[role] || role;
  }
  // translateAccesToArabic(value: string): string {
  //   const accesTranslations: { [key: string]: string } = {
  //     prison: "الإصلاحيات فقط",
  //     all: "السجون و الإصلاحيات",
  //   };

  //   return accesTranslations[value] || value;
  // }

  editUser(user: User) {
    this.selectedUser = user; // Pass the user to be edited
    console.log(user);
    this.displayAddUser = true; // Show the dialog for editing
  }
  deleteUser(user: User) {
    this.selectedUser = user;
    this.displayDeleteUser = true;
  }
  delete() {
    this.crudservice
      .deleteLigne("auth", this.selectedUser.id)
      .subscribe((data) => {
        if (data.status == 200) {
          alert("err");
        } else {
          this.showAllUsers();
          this.displayDeleteUser = false;
          this.selectedUser = null;
          this.service.add({
            key: "tst",
            severity: "success",
            summary: ".   تمت عملية الحذف بنجاح     ",
            detail: this.selectedUser.fullName,
          });
        }
      });
  }
  closeDelete() {
    this.displayDeleteUser = false;
    this.selectedUser = null;
  }

  isLoginExpired(user: any): boolean {
    console.log(user);
    if (!user) return true; // ou false selon ta logique, ici on considère expired si user absent
    const now = new Date();

    // Téléphone absent → expired = true
    if (!user.telephone) return true;

    // lastPasswordModifiedDate absent ou > 30 jours → expired = true
    if (!user.lastPasswordModifiedDate) return true;
    const pwdModifiedDate = new Date(user.lastPasswordModifiedDate);
    const pwdLimitDate = new Date(now);
    pwdLimitDate.setDate(now.getDate() - 30);
    if (pwdModifiedDate < pwdLimitDate) return true;

    // lastLogin absent ou > 15 jours → expired = true
    if (!user.lastLogin) return true;
    const lastLoginDate = new Date(user.lastLogin);
    const loginLimitDate = new Date(now);
    loginLimitDate.setDate(now.getDate() - 15);
    if (lastLoginDate < loginLimitDate) return true;

    // Sinon pas expired
    return false;
  }
}
