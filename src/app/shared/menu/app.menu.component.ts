import { Component, OnInit, Renderer2 } from "@angular/core";
import { AppMainComponent } from "../../layouts/full/app.main.component";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { MenuService } from "./app.menu.service";
import { SettingsService } from "../../services/matriculacion/settings.service";
import { AuthService } from "src/app/_services/auth.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-menu",
  templateUrl: "./app.menu.component.html",
  animations: [
    trigger("mask-anim", [
      state(
        "void",
        style({
          opacity: 0,
        })
      ),
      state(
        "visible",
        style({
          opacity: 0.8,
        })
      ),
      transition("* => *", animate("250ms cubic-bezier(0, 0, 0.2, 1)")),
    ]),
  ],
})
export class AppMenuComponent implements OnInit {
  model: any[];

  roles: string[] = [];
  constructor(
    public app: AppMainComponent,
    public ajustesService: SettingsService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      //this.roles = this.tokenStorage.getUserFromTokenFromToken().roles;
      this.roles = this.tokenStorage.getUserFromTokenFromToken().roles;
      console.log(this.roles);
      if (this.roles.some((item) => item == "ROLE_USER")) {
        this.model = [
          { label: "الهويــة", routerLink: ["/mineur/all"] },
          { label: "معطيــات", routerLink: ["/mineur/DetailleEnfant"] },
          { label: "القضايا", routerLink: ["/mineur/Affaire"] },
          {
            label: "إجراءات الطعن",
            routerLink: ["/mineur/ProcedureAppel"],
          },

          {
            label: "التغيرات الطارئة ",
            routerLink: ["/mineur/Changement"],
          },

          {
            label: "القائمات",
            routerLink: ["/mineur/ListPenale"],
          },
          {
            label: "الاحصائيات ",
            routerLink: ["/mineur/mensuel"],
          },
        ];
      } else if (this.roles.some((item) => item == "ROLE_DIRECTEUR")) {
        this.model = [
          { label: "الهويــة", routerLink: ["/mineur/all"] },

          {
            label: "القائمات",
            routerLink: ["/mineur/ListPenale"],
          },
          {
            label: "الاحصائيات ",
            routerLink: ["/mineur/mensuel"],
          },
        ];
      } else if (this.roles.some((item) => item == "ROLE_MODERATOR")) {
        this.model = [
          { label: "الهويــة", routerLink: ["/mineur/all"] },
          {
            label: "رموز الموظفين  ",

            items: [
              { label: "قائمة  المستعملين", routerLink: ["/mineur/AllUsers"] },

              {
                label: "قائمة  المؤسسات",
                routerLink: ["/mineur/Etablissement"],
              },
              {
                label: "قائمة مؤسسات تغير وسيلة",
                routerLink: ["/mineur/EtabChangeManiere"],
              },
            ],
          },
          {
            label: "رموز الهوية ",

            items: [
              { label: " الجنسيات   ", routerLink: ["/mineur/Nationalite"] },

              {
                label: " المستوى الدراسي",
                routerLink: ["/mineur/NiveauEducatif"],
              },
              { label: "   المهن", routerLink: ["/mineur/Metier"] },
              {
                label: " الحالة العائلية  ",
                routerLink: ["/mineur/SituationFamiliale"],
              },
              {
                label: " الحالة الإجتماعية ",
                routerLink: ["/mineur/SituationSocial"],
              },
              {
                label: " الصنف الجزائي   ",
                routerLink: ["/mineur/ClassePenale"],
              },

              { label: " الولايات   ", routerLink: ["/mineur/Gouvernorat"] },
              { label: " المعتمديات   ", routerLink: ["/mineur/Delegation"] },
            ],
          },

          {
            label: "رموز القضايا ",

            items: [
              {
                label: " أنواع القضايا   ",
                routerLink: ["/mineur/TypeAffaire"],
              },
              { label: " التهم    ", routerLink: ["/mineur/TitreAccusation"] },
              { label: " أنواع الحكم    ", routerLink: ["/mineur/TypeJuge"] },
              {
                label: " أنواع المحاكم   ",
                routerLink: ["/mineur/TypeTribunal"],
              },
              { label: " المحاكم    ", routerLink: ["/mineur/Tribunal"] },
              {
                label: " نتائج الإحالة    ",
                routerLink: ["/mineur/ResultatTransfert"],
              },
            ],
          },
          {
            label: "رموز التغيرات",

            items: [
              {
                label: "كيفية الفرار",
                routerLink: ["/mineur/CommentEchapper"],
              },
              {
                label: "كيفية إلقاء القبض",
                routerLink: ["/mineur/CommentTrouver"],
              },
              { label: "أسباب النقلة", routerLink: ["/mineur/CauseMutation"] },
              {
                label: " موجب السراح  (السراح )",
                routerLink: ["/mineur/CauseLiberation"],
              },
              {
                label: "أسباب السراح ( إيقاف تنفيذ )",
                routerLink: ["/mineur/MotifArreterlexecution"],
              },
              { label: "مكان الوفاة", routerLink: ["/mineur/LieuDeces"] },
              { label: "أسباب الوفاة", routerLink: ["/mineur/CauseDeces"] },
            ],
          },
        ];
      } else if (this.roles.some((item) => item == "ROLE_SOCIAL_USER")) {
        this.model = [
          { label: "الهويـــــة", routerLink: ["/mineur/all"] },
          {
            label: "التقييم الاجتماعي ",
            routerLink: ["/mineur/socialGlobal"],
          },
          {
            label: "  الخدمات",
            routerLink: ["/mineur/supportServices"],
          },
          {
            label: "الزيارات",
            routerLink: ["/mineur/visitFamily"],
          },

          {
            label: "السجل العدلي والسلوكي",
            routerLink: ["/mineur/judicialDisciplinary"],
          },
          {
            label: "التكوين",
            routerLink: ["/mineur/formation"],
          },
        ];
      } else {
        this.router.navigate(["/logoutpage"]);
      }
    }
  }

  onMenuClick() {
    this.app.menuClick = true;
  }
}
