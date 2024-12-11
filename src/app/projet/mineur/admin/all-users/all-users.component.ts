import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";

import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";

interface User {
  id: number;
  personelleId: number;
  fullName: string;

  username: string;
  roleName: string;
  etablissement: string;
}

@Component({
  selector: "app-all-users",
  templateUrl: "./all-users.component.html",
  styleUrls: ["./all-users.component.css"],
    providers: [MessageService]
  

})
export class AllUsersComponent implements OnInit {
  users: User[] = [];
  displayAddUser = false;

  selectedUser: User | null = null; // Track the selected user for editing
  displayDeleteUser = false;
  constructor(
    private crudservice: CrudEnfantService,
    private breadcrumbService: BreadcrumbService,
    private router: Router, private service: MessageService
  ) {
    this.breadcrumbService.setItems([
      { label: "الإستقبال", routerLink: ["/"] },

      { label: "المستعملين" },
      { label: " قائمة  المستعملين" },
    ]);
  }

  ngOnInit(): void {
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
          username: user.username,
          roleName: this.translateRoleToArabic(user.roles[0]?.name), // Traduire le rôle en arabe
          etablissement: user.etablissement?.libelle_etablissement,
        }));
        console.log("showAllUsers()"); // Vérifie la liste simplifiée
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

  editUser(user: User) {
    this.selectedUser = user; // Pass the user to be edited
    console.log(user);
    this.displayAddUser = true; // Show the dialog for editing
  }
  deleteUser(user: User) {
    this.selectedUser = user;
    this.displayDeleteUser = true;
    
  }
  delete(){
     this.crudservice.deleteLigne("auth", this.selectedUser.id).subscribe((data) => {
       if (data.status == 200) {
         alert("err");
       } else {
        this.displayDeleteUser = false;
          this.service.add({
            key: "tst",
            severity: "success",
            summary: ".   تمت عملية الحذف بنجاح     ",
            detail: this.selectedUser.fullName,
          });
         this.showAllUsers();
       }
     });
  }
}
