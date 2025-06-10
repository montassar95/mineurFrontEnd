import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { CommentTrouver } from "src/app/domain/commentTrouver";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";

@Component({
  selector: "app-comment-trouver",
  templateUrl: "./comment-trouver.component.html",
  styleUrls: ["./comment-trouver.component.css"],
  providers: [MessageService],
})
export class CommentTrouverComponent implements OnInit {
  display = false;
  id;
  nom;
  commentTrouver: CommentTrouver;
  currentUser: any;
  constructor(
    private crudservice: CrudEnfantService,
    private service: MessageService,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private token: TokenStorageService
  ) {
    this.breadcrumbService.setItems([
      { label: "الإستقبال", routerLink: ["/"] },

      { label: "رموز التغيرات" },
      { label: "كيفية إلقاء القبض" },
    ]);
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
    this.showAllCommentTrouver();
  }

  commentTrouvers: CommentTrouver[] = [];

  showAllCommentTrouver() {
    this.crudservice.getlistEntity("commentTrouver").subscribe((data) => {
      if (data.result) {
        this.commentTrouvers = data.result;
      } else {
        this.commentTrouvers = [];
      }
    });
  }
  addCmTr() {
    this.commentTrouver = new CommentTrouver();
    this.commentTrouver.id = this.id;
    this.commentTrouver.libelleComment = this.nom;

    this.crudservice
      .createLigne("commentTrouver", this.commentTrouver)
      .subscribe((data) => {
        if (data.result) {
          console.log(data.result);
          this.showAllCommentTrouver();
        }
      });
    this.display = false;
  }
  add() {
    this.id = "";
    this.nom = "";
    this.display = true;
  }

  update() {
    this.display = true;
  }
  delete(commentTrouver: CommentTrouver) {
    this.crudservice
      .deleteLigne("commentTrouver", commentTrouver.id)
      .subscribe((data) => {
        if (data.status == 417) {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: " عليك تثبت     ",
          });
        } else {
          this.showAllCommentTrouver();
        }
      });
  }
}
