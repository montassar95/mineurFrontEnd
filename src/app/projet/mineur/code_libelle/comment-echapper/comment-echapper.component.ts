import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { CommentEchapper } from "src/app/domain/commentEchapper";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";

@Component({
  selector: "app-comment-echapper",
  templateUrl: "./comment-echapper.component.html",
  styleUrls: ["./comment-echapper.component.css"],
  providers: [MessageService],
})
export class CommentEchapperComponent implements OnInit {
  id;
  nom;
  commentEchapper: CommentEchapper;
  display = false;
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
      { label: "كيفية الفرار" },
    ]);
  }
  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
    this.showAllCommentEchapper();
  }

  commentEchappers: CommentEchapper[] = [];

  showAllCommentEchapper() {
    this.crudservice.getlistEntity("commentEchapper").subscribe((data) => {
      if (data.result) {
        this.commentEchappers = data.result;
      } else {
        this.commentEchappers = [];
      }
    });
  }
  addCmEc() {
    this.commentEchapper = new CommentEchapper();
    this.commentEchapper.id = this.id;
    this.commentEchapper.libelleComment = this.nom;

    this.crudservice
      .createLigne("commentEchapper", this.commentEchapper)
      .subscribe((data) => {
        if (data.result) {
          console.log(data.result);
          this.showAllCommentEchapper();
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
  delete(commentEchapper: CommentEchapper) {
    this.crudservice
      .deleteLigne("commentEchapper", commentEchapper.id)
      .subscribe((data) => {
        if (data.status == 417) {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: " عليك تثبت     ",
          });
        } else {
          this.showAllCommentEchapper();
        }
      });
  }
}
