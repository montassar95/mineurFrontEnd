import { DatePipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { EventService } from "src/app/demo/service/eventservice";
import { NodeService } from "src/app/demo/service/nodeservice";
import { Arrestation } from "src/app/domain/arrestation";
import { ArrestationId } from "src/app/domain/arrestationId";
import { CauseMutation } from "src/app/domain/causeMutation";
import { CommentEchapper } from "src/app/domain/commentEchapper";
import { CommentTrouver } from "src/app/domain/commentTrouver";
import { Echappes } from "src/app/domain/echappes";
import { EchappesId } from "src/app/domain/echappesId";
import { Enfant } from "src/app/domain/enfant";
import { Etablissement } from "src/app/domain/etablissement";
import { ResidenceId } from "src/app/domain/residanceId";
import { Residence } from "src/app/domain/residence";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { DetentionService } from "src/app/demo/service/detention.service";

@Component({
  selector: "app-add-echappes",
  templateUrl: "./add-echappes.component.html",
  styleUrls: ["./add-echappes.component.css"],
  providers: [MessageService],
})
export class AddEchappesComponent implements OnInit, OnDestroy {
  centre = "";
  numOrdinale = "";
  numArrestation = "";
  commentEchapper = "";
  commentTrouver = "";
  dateEchappes = "";
  dateTrouver = "";
  remarqueCommentEchapper = "";
  remarqueCommentTrouver = "";
  enfantLocal: Enfant;
  roles: string[] = [];
  currentUser: any;
  arrestation: Arrestation;
  arrestationId: ArrestationId;
  residence: Residence;

  echappes: Echappes;
  displayImg: boolean;
  isShow = false;
  isEncour = false;
  update = false;
  isDeces = false;
  isEncourMutation = false;
  msg = "";
  numOrdinaleEchappe = "";

  entitesCommentEchapper: CommentEchapper[];

  displayCommentEchapper = false;

  commentEchapperLocal: CommentEchapper;

  entitesCommentTrouver: CommentTrouver[];

  displayCommentTrouver = false;

  commentTrouverLocal: CommentTrouver;

  idEnfant: any;

  memeEtablisement = false;
  showEchappes = false;

  showEchappesTrouver = false;
  isSaved = false;
  displayEdit = false;

  constructor(
    private crudservice: CrudEnfantService,
    private detentionService: DetentionService,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private token: TokenStorageService,
    public datepipe: DatePipe,
    private nodeService: NodeService,
    private service: MessageService,
    private breadcrumbService: BreadcrumbService,
    private router: Router
  ) {
    this.breadcrumbService.setItems([
      { label: "الإستقبال", routerLink: ["/"] },

      { label: "التغيرات الطارئة " },
      { label: "الفرارات" },
    ]);
  }
  ngOnDestroy() {
    window.localStorage.removeItem("idValide");
  }
  ngOnInit() {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
    this.currentUser = this.token.getUserFromTokenFromToken();

    let idValide = window.localStorage.getItem("idValide");
    console.log(idValide);
    if (idValide) {
      this.search(idValide);
    } else {
      this.router.navigate(["/mineur/Changement"]);
    }

    this.currentUser = this.token.getUserFromTokenFromToken();
    console.log(this.currentUser);

    this.crudservice.getlistEntity("commentEchapper").subscribe((data) => {
      console.log(data);
      this.entitesCommentEchapper = data.result;
    });
    this.crudservice.getlistEntity("commentTrouver").subscribe((data) => {
      console.log(data);
      this.entitesCommentTrouver = data.result;
    });
  }

  showListCommentEchapper() {
    this.displayCommentEchapper = true;
  }

  saveCommentEchapper(commentEchapper: CommentEchapper) {
    this.commentEchapperLocal = commentEchapper;
    this.commentEchapper = this.commentEchapperLocal.libelleComment;
    this.displayCommentEchapper = false;
  }

  showListCommentTrouver() {
    this.displayCommentTrouver = true;
  }

  saveCommentTrouver(commentTrouver: CommentTrouver) {
    this.commentTrouverLocal = commentTrouver;
    this.commentTrouver = this.commentTrouverLocal.libelleComment;
    this.displayCommentTrouver = false;
  }

  search(id: String) {
    this.crudservice.getLigneById("enfant", id).subscribe((data) => {
      // this.enfantLocal = data.result;
      // this.detentionService
      //   .trouverDerniereDetentionParIdDetenu("arrestation", id)
      //   .subscribe((data) => {
      //     this.arrestation = data.result;
      //     this.crudservice
      //       .getLigneById("deces", this.arrestation.arrestationId.idEnfant)
      //       .subscribe((data) => {
      //         if (data.result == null) {
      //           this.detentionService
      //             .getLiberationById(
      //               "liberation",
      //               this.arrestation.arrestationId.idEnfant,
      //               this.arrestation.arrestationId.numOrdinale
      //             )
      //             .subscribe((data) => {
      //               if (data.result != null) {
      //                 this.msg = "في حالـــة ســراح";
      //                 console.log(this.msg);
      //                 this.isShow = true;
      //               } else {
      //                 this.detentionService
      //                   .countByEnfantAndArrestation(
      //                     "echappes",
      //                     this.arrestation.enfant.id,
      //                     this.arrestation.arrestationId.numOrdinale
      //                   )
      //                   .subscribe((data) => {
      //                     console.log(data);
      //                     this.numOrdinaleEchappe = data.result;
      //                   });
      //                 this.detentionService
      //                   .findResidenceByIdEnfantAndStatut0(
      //                     "residence",
      //                     this.arrestation.arrestationId.idEnfant,
      //                     this.arrestation.arrestationId.numOrdinale
      //                   )
      //                   .subscribe((data) => {
      //                     console.log(data.result);
      //                     this.residence = data.result;
      //                   });
      //                 this.detentionService
      //                   .trouverEchappeNonApprehende(
      //                     "echappes",
      //                     this.arrestation.arrestationId.idEnfant
      //                   )
      //                   .subscribe((data) => {
      //                     console.log(data.result);
      //                     if (data.result == null) {
      //                       this.detentionService
      //                         .findByIdEnfantAndStatutEnCour(
      //                           "residence",
      //                           this.arrestation.arrestationId.idEnfant,
      //                           this.arrestation.arrestationId.numOrdinale
      //                         )
      //                         .subscribe((data) => {
      //                           if (data.result == null) {
      //                             if (
      //                               this.residence.etablissement.id !=
      //                               this.currentUser.etablissement.id
      //                             ) {
      //                               this.isShow = true;
      //                               this.msg =
      //                                 "      طفــل مقيــم بمركــز     " +
      //                                 this.residence.etablissement
      //                                   .libelle_etablissement;
      //                             }
      //                           } else {
      //                             this.isShow = true;
      //                             this.msg =
      //                               "      نقلـــة جـــارية إلـــى مركــز    " +
      //                               data.result.etablissement
      //                                 .libelle_etablissement;
      //                           }
      //                         });
      //                     } else {
      //                       this.isEncour = true;
      //                       this.update = true;
      //                       this.echappes = data.result;
      //                       if (
      //                         this.echappes.residenceEchapper.etablissement
      //                           .id !=
      //                         this.currentUser.etablissement.id
      //                       ) {
      //                         this.memeEtablisement = true;
      //                       }
      //                     }
      //                   });
      //               }
      //             });
      //         } else {
      //           this.isShow = true;
      //           this.msg = "طفل فــي ذمــــــة اللـــه";
      //         }
      //       });
      //   });
    });
  }

  save() {
    let echappesId = new EchappesId();

    this.echappes = new Echappes();

    echappesId.idEnfant = this.arrestation.arrestationId.idEnfant;
    echappesId.numOrdinaleArrestation =
      this.arrestation.arrestationId.numOrdinale;

    this.echappes.echappesId = echappesId;

    this.dateEchappes = this.datepipe.transform(
      this.dateEchappes,
      "yyyy-MM-dd"
    );

    this.echappes.dateEchappes = this.dateEchappes;
    this.echappes.commentEchapper = this.commentEchapperLocal;
    this.echappes.remarqueEchappes = this.remarqueCommentEchapper;
    this.echappes.residenceEchapper = this.residence;
    this.echappes.echappesId.numOrdinaleEchappes = this.numOrdinaleEchappe;
    console.log(this.echappes);

    this.showEchappes = true;
  }
  confirmer() {
    this.crudservice
      .createLigne("echappes", this.echappes)
      .subscribe((data) => {
        this.residence.nombreEchappes = this.residence.nombreEchappes + 1;

        this.showEchappes = false;
        this.isSaved = true;
        console.log(data);
      });
  }
  saveTrouver() {
    this.dateTrouver = this.datepipe.transform(this.dateTrouver, "yyyy-MM-dd");

    this.echappes.dateTrouver = this.dateTrouver;

    this.echappes.commentTrouver = this.commentTrouverLocal;

    this.echappes.remarqueTrouver = this.remarqueCommentTrouver;

    this.echappes.residenceTrouver = this.residence;
    if (this.memeEtablisement == true) {
      this.echappes.residenceTrouver.etablissement =
        this.currentUser.etablissement;
      this.echappes.residenceTrouver.numArrestation = this.numArrestation;
      this.echappes.residenceTrouver.causeMutation = null;
      this.echappes.residenceTrouver.remarqueMutation = null;
    }
    this.echappes.echappesId.numOrdinaleEchappes = this.numOrdinaleEchappe;
    console.log(this.echappes);
    this.showEchappesTrouver = true;
  }

  confirmerTrouver() {
    this.crudservice
      .createLigne("echappes", this.echappes)
      .subscribe((data) => {
        this.showEchappesTrouver = false;
        this.isSaved = true;
        console.log("-----------------------------------");
      });
  }
  showImg() {
    this.displayImg = true;
  }
  editEchappes() {
    this.isEncour = false;
    this.isShow = false;
    this.isSaved = false;
    this.displayEdit = true;

    this.commentEchapperLocal = this.echappes.commentEchapper;
    this.commentEchapper = this.echappes.commentEchapper.libelleComment;
    this.remarqueCommentEchapper = this.echappes.remarqueEchappes;
    this.dateEchappes = this.echappes.dateEchappes;
  }

  annuleEdit() {
    this.isEncour = true;
    this.isShow = false;
    this.isSaved = false;

    this.displayEdit = false;
  }
}
