import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { DetentionService } from "src/app/demo/service/detention.service";
import { Personelle } from "src/app/domain/personelle";
import { User } from "src/app/domain/user";

@Component({
  selector: "app-modify-password",
  templateUrl: "./modify-password.component.html",
  styleUrls: ["./modify-password.component.css"],
  providers: [MessageService],
})
export class ModifyPasswordComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private detentionService: DetentionService,
    private token: TokenStorageService,
    private service: MessageService,
    private routerSec: Router,
    private crudservice: CrudEnfantService
  ) {}
  idPersonelle: any;
  userId: number; // Remplacez cela par l'ID de l'utilisateur courant
  // personelle: Personelle;
  oldPassword: string = "";
  newPassword: string = "";
  confirmPassword: string = ""; // Ajouté pour le mot de passe de confirmation
  showNewPassword: boolean = false; // Pour afficher ou masquer le nouveau mot de passe
  showConfirmPassword: boolean = false; // Pour afficher ou masquer le mot de passe de confirmation
  currentUser: any;
  fieldErrors: { [key: string]: string } = {};
  user: User;

  terminer = false;
  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.routerSec.navigate(["/logoutpage"]);
    }
    this.currentUser = this.token.getUserFromTokenFromToken();
    console.log(this.currentUser);
    this.userId = this.currentUser.id;
    this.loadCurrentUser();
  }

  onChangePassword(): void {
    this.fieldErrors = {}; // Réinitialiser à chaque appel

    if (this.newPassword !== this.confirmPassword) {
      this.service.add({
        key: "tst",
        severity: "error",
        summary: "خطأ",
        detail: "كلمة المرور الجديدة وتأكيد كلمة المرور غير متطابقتين.",
      });
      return;
    }

    this.detentionService
      .changerMotDePasse(this.userId, this.oldPassword, this.newPassword)
      .subscribe(
        (response) => {
          if (response.status === 200 || response.message) {
            this.terminer = true;
          
            this.service.add({
              key: "tst",
              severity: "success",
              summary: "نجاح",
              detail: "تم تغيير كلمة المرور بنجاح !",
            });
            this.oldPassword = "";
            this.newPassword = "";
            this.confirmPassword = "";
            this.fieldErrors = {}; // vider erreurs aussi
            this.loadCurrentUser();
          }
        },
        (error) => {
          this.fieldErrors = {};
          if (error.status === 400 && error.error) {
            console.log(error.error);
            // Remplir fieldErrors avec les erreurs reçues du backend
            for (const field in error.error) {
              if (error.error.hasOwnProperty(field)) {
                // Si c’est un tableau de messages, on joint, sinon on garde la chaîne
                const message = Array.isArray(error.error[field])
                  ? error.error[field].join(" ")
                  : error.error[field];

                this.fieldErrors[field] = message;

                this.service.add({
                  key: "tst",
                  severity: "error",
                  summary: "خطأ في " + field,
                  detail: message,
                });
              }
            }
          } else {
            this.service.add({
              key: "tst",
              severity: "error",
              summary: "خطأ",
              detail:
                error.error?.message ||
                "حدث خطأ. يرجى التحقق من معلوماتك والمحاولة مرة أخرى.",
            });
          }
        }
      );
  }

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

  goBack() {
    // navigation vers une autre page
    this.routerSec.navigate(["/"]);
  }

  loadCurrentUser(): void {
    this.crudservice.getLigneById("user", this.currentUser.id).subscribe(
      (data) => {
        if (data.result != null) {
          this.user = data.result;
        } else {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: "خطأ",
            detail: "لم يتم العثور على المستخدم.",
          });
        }
      },
      (error) => {
        this.service.add({
          key: "tst",
          severity: "error",
          summary: "خطأ في الاتصال بالخادم",
          detail: error.message || "حدث خطأ غير متوقع",
        });
      }
    );
  }
}
