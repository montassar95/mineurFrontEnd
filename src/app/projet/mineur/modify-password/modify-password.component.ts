import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MessageService } from "primeng";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { DetentionService } from "src/app/demo/service/detention.service";
import { Personelle } from "src/app/domain/personelle";

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
    private service: MessageService
  ) {}
  idPersonelle: any;
  userId: number; // Remplacez cela par l'ID de l'utilisateur courant
  personelle: Personelle;
  oldPassword: string = "";
  newPassword: string = "";
  confirmPassword: string = ""; // Ajouté pour le mot de passe de confirmation
  showNewPassword: boolean = false; // Pour afficher ou masquer le nouveau mot de passe
  showConfirmPassword: boolean = false; // Pour afficher ou masquer le mot de passe de confirmation
  currentUser: any;
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userId = this.currentUser.id;
    this.personelle = this.currentUser.personelle;
  }

  onChangePassword() {
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
        (data) => {
          if (data.status == 200) {
            // Traitez la réponse ici
            console.log("تم تغيير كلمة المرور بنجاح !");
            this.service.add({
              key: "tst",
              severity: "success",
              summary: "نجاح",
              detail: "تم تغيير كلمة المرور بنجاح !",
            });

            this.oldPassword = "";
            this.newPassword = "";
            this.confirmPassword = "";
          }
          console.log(data);
        },
        (error) => {
          // Gérez l'erreur ici
          console.error("خطأ أثناء تغيير كلمة المرور", error);

          // Afficher un message d'erreur à l'utilisateur
          if (error.status === 400) {
            this.service.add({
              key: "tst",
              severity: "error",
              summary: "خطأ",
              detail: "كلمة المرور الحالية غير صحيحة. يرجى المحاولة مرة أخرى.",
            });
          } else if (error.status === 500) {
            this.service.add({
              key: "tst",
              severity: "error",
              summary: "خطأ",
              detail: "حدث خطأ داخلي. يرجى المحاولة مرة أخرى لاحقًا.",
            });
          } else {
            this.service.add({
              key: "tst",
              severity: "error",
              summary: "خطأ",
              detail: "حدث خطأ. يرجى التحقق من معلوماتك.",
            });
          }
        }
      );
  }
}
