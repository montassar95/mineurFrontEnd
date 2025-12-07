import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap, tap } from "rxjs/operators";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { DetentionService } from "src/app/demo/service/detention.service";
import { AccusationExtraitJugementDTO } from "src/app/domain/accusationExtraitJugementDTO";
import { ActeJudiciaire } from "src/app/domain/acteJudiciaire";
import { AffairePenaleDto } from "src/app/domain/affairePenaleDto";

import { ArretExecutionPenalDTO } from "src/app/domain/arretExecutionPenalDTO";
import { ArretProvisoireDTO } from "src/app/domain/arretProvisoireDTO";
import { EvasionCaptureDTO } from "src/app/domain/evasionCaptureDTO";
import { LienFamilialDTO } from "src/app/domain/lienFamilialDTO";
import { MutationResidenceDto } from "src/app/domain/mutationResidenceDto";
import { ParticipantAffaireDTO } from "src/app/domain/participantAffaireDTO";

import { PenalAffaireDTO } from "src/app/domain/penalAffaireDTO";
import { PenalContestationDto } from "src/app/domain/penalContestationDto";
import { PenalContrainteDTO } from "src/app/domain/penalContrainteDTO";
import { PenaleDetentionInfoDto } from "src/app/domain/penaleDetentionInfoDto";
import { PenalGraceDto } from "src/app/domain/penalGraceDto";
import { PenalJugementDTO } from "src/app/domain/penalJugementDTO";
import { PenalMandatDepotDTO } from "src/app/domain/penalMandatDepotDTO";
import { PenalSyntheseDto } from "src/app/domain/penalSyntheseDto";
import { PenalTransfertDto } from "src/app/domain/penalTransfertDto";
import { PrisonerPenaleDto } from "src/app/domain/prisonerPenaleDto";

@Component({
  selector: "app-show-penale",
  templateUrl: "./show-penale.component.html",
  styleUrls: ["./show-penale.component.scss"],
})
export class ShowPenaleComponent implements OnInit {
  penalGraceDtos: PenalGraceDto[] = [];
  mutationResidenceDtos: MutationResidenceDto[] = [];
  evasionCaptureDTOs: EvasionCaptureDTO[] = [];
  participantsAffaireDTOs: ParticipantAffaireDTO[] = [];
  idEnfant: string;
  source: any;
  tcoddet: string;
  prisonerPenaleDto: PrisonerPenaleDto;
  penalSyntheseDto: PenalSyntheseDto;
  penaleDetentionInfoDtos: PenaleDetentionInfoDto[];
  affairePenaleDtos: AffairePenaleDto[];
  penalMandatDepotDTO: PenalMandatDepotDTO;
  penalTransfertDto: PenalTransfertDto;
  penalContestationDto: PenalContestationDto;
  penalContrainteDto: PenalContrainteDTO;
  arretExecutionPenalDTO: ArretExecutionPenalDTO;
  accusationExtraitJugements: AccusationExtraitJugementDTO[];
  arretProvisoires: ArretProvisoireDTO[];
  penalJugementDTO: PenalJugementDTO;
  lienFamilialDTOs: LienFamilialDTO[] = [];
  acteJudiciaires: ActeJudiciaire[];

  penalAffaireDTOs: PenalAffaireDTO[];
  displayAffaireConsult = false;
  displayAllArrestation = false;
  displayExtraitJugement = "";
  photo = "";
  displayActeJudiciaire = false;

  loading = false;
  totalRecords: number = 0;
  currentUser: any;
  constructor(
    private detentionService: DetentionService,
    private route: ActivatedRoute,
    private routerSec: Router,
    private token: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.routerSec.navigate(["/logoutpage"]);
    }
    // Récupérer les paramètres 'id' et 'source' de l'URL
    this.route.paramMap.subscribe((params) => {
      this.source = params.get("source"); // Récupération du paramètre 'source'
      //this.tcoddet = params.get("tcoddet");
      this.idEnfant = params.get("id"); // Récupération du paramètre 'id'
      this.tcoddet = params.get("tcoddet").toString().padStart(3, "0");
      //this.tcoddet = "001";
      console.log(this.tcoddet);
      if (this.idEnfant && this.source == "Penale") {
        this.search(this.idEnfant, this.tcoddet); // Appel de la méthode search avec les deux paramètres
        this.loadGraces(this.idEnfant, this.tcoddet);
        this.loadMutationResidence(this.idEnfant, this.tcoddet);
        this.loadEvasionCapture(this.idEnfant, this.tcoddet);
        this.loadParticipantsAffaire(this.idEnfant, this.tcoddet);
          this.findRelationsFamiliales(this.idEnfant);
          // this.loadData({ first: 0, rows: 10 });

        this.source = params.get("source"); // Récupération du paramètre 'source'
        this.trouverToutDetentionInfosParPrisonerIdDansPrisons(this.idEnfant);
      } else {
        alert("Mineur");
      }
    });
  }
  searchAffaire(prisonerId: any, numArr: any, minPage: any, maxPage: any) {
    this.detentionService
      .rechercherAffaires(prisonerId, numArr, minPage, maxPage)
      .subscribe((data) => {
        //  this.penalSyntheseDto = data.result;
        this.penalAffaireDTOs = data.result;
      });

    this.detentionService
      .findAffairesByNumideAndCoddet(prisonerId, numArr)
      .subscribe((data) => {
        this.affairePenaleDtos = data.result;
      });
  }
  findRelationsFamiliales(id): void {
    this.detentionService.findRelationsFamiliales(id).subscribe((data) => {
     console.log("kkkkkkkkkkkkkkkkkkkkkkkk");
      console.log(data.result);
      this.lienFamilialDTOs = data.result;
    });
  }
  /*search(id: String) {
    this.detentionService
      .findPrisonerPenalByPrisonerId(id)
      .subscribe((data) => {
        console.log(data.result);
        this.prisonerPenaleDto = data.result;
        this.getPhotoById(this.prisonerPenaleDto.codeImage);
      });
      
  }
  getPhotoById(codeImage: any) {
    this.photo = "";
    this.detentionService.trouverAmenPhoto(codeImage).subscribe((data) => {
      if (data.result == null) {
      } else {
        this.photo = "data:image/jpeg;base64," + data.result.image;
        console.log(this.photo);
      }
    });
  }*/

  trouverToutDetentionInfosParPrisonerIdDansPrisons(id: String) {
    console.log(id + "   ----------    ");
    this.detentionService
      .trouverToutDetentionInfosParPrisonerIdDansPrisons(id)
      .subscribe((data) => {
        console.log(data.result);
        this.penaleDetentionInfoDtos = data.result;
      });
  }

  search(id: string, tcoddet: string) {
    console.log("depart ici ");
    this.detentionService
      .findPrisonerPenalByPrisonerId(id, tcoddet)
      .pipe(
        tap((data) => {
          console.log(data.result);
          this.prisonerPenaleDto = data.result;
          //  this.penalSyntheseDto = this.prisonerPenaleDto.penalSyntheseDto;
        }),
        switchMap((data) =>
          this.detentionService.trouverAmenPhoto(data?.result?.codeImage)
        ),
        tap((photoData) => {
          if (photoData?.result?.image) {
            this.photo = "data:image/jpeg;base64," + photoData?.result?.image;
          } else {
            this.photo = "";
          }
        })
      )
      .subscribe();

    this.detentionService.rechercherPenalSyntheseDetenu(id, tcoddet).subscribe(
      (data) => {
        this.penalSyntheseDto = data.result;
        this.totalRecords = this.penalSyntheseDto.totalCount;
        console.log(" methode ");
        console.log(data.result);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  loadGraces(id, tcoddet): void {
    this.detentionService.getPenalGraces(id, tcoddet).subscribe((data) => {
      this.penalGraceDtos = data.result;
    });
  }

  loadMutationResidence(id, tcoddet): void {
    this.detentionService
      .getMutationResidence(id, tcoddet)
      .subscribe((data) => {
        console.log(data.result);
        this.mutationResidenceDtos = data.result;
      });
  }

  loadEvasionCapture(id, tcoddet): void {
    this.detentionService
      .getEvasionsWithCaptures(id, tcoddet)
      .subscribe((data) => {
        console.log(data.result);
        this.evasionCaptureDTOs = data.result;
      });
  }

  loadParticipantsAffaire(id, tcoddet): void {
    this.detentionService
      .findParticipantsAffaire(id, tcoddet)
      .subscribe((data) => {
        console.log(data.result);
        this.participantsAffaireDTOs = data.result;
      });
  }

  calculateAge(dateOfBirth: string | null | undefined): number | null {
    if (!dateOfBirth) return null;

    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  }
  getDocumentByAffaireConsult(acteJudiciaire: ActeJudiciaire) {
    console.log(acteJudiciaire);

    if (acteJudiciaire.typeActe == "tjugement") {
      this.detentionService
        .getAccusationsParDetenu(
          this.prisonerPenaleDto.detenuId,
          this.prisonerPenaleDto.numOrdinaleArrestation,
          acteJudiciaire.codeDocument,
          acteJudiciaire.numAffairePenal,
          acteJudiciaire.idTribunalPenal
        )
        .subscribe((data) => {
          this.penalJugementDTO = data.result;
          this.accusationExtraitJugements =
            this.penalJugementDTO.accusationExtraitJugementDTOs;
          this.arretProvisoires = this.penalJugementDTO.arretProvisoireDTOs;

          this.displayAffaireConsult = true;
          console.log(this.penalJugementDTO);
        });
      this.displayExtraitJugement = "jugement";
    } else if (acteJudiciaire.typeActe == "tmandatdepot" ) {
      this.detentionService
        .getMandatDepot(
          this.prisonerPenaleDto.detenuId,
          this.prisonerPenaleDto.numOrdinaleArrestation,
          acteJudiciaire.tnumseqaff,
          acteJudiciaire.codeDocument,
          acteJudiciaire.numAffairePenal,
          acteJudiciaire.idTribunalPenal
        )
        .subscribe((data) => {
          console.log(data.result);
          this.penalMandatDepotDTO = data.result;
          this.displayAffaireConsult = true;
        });
      this.displayExtraitJugement = "depot";
    } 
     else if ( 
      acteJudiciaire.typeActe ==  "tmandatamener"
    ) {
       this.detentionService
         .getMandatAmener(
           this.prisonerPenaleDto.detenuId,
           this.prisonerPenaleDto.numOrdinaleArrestation,
           acteJudiciaire.tnumseqaff,
           acteJudiciaire.codeDocument,
           acteJudiciaire.numAffairePenal,
           acteJudiciaire.idTribunalPenal
         )
         .subscribe((data) => {
           console.log(data.result);
           this.penalMandatDepotDTO = data.result;
           this.displayAffaireConsult = true;
         });
       this.displayExtraitJugement = "amener";
    }
    
    else if (acteJudiciaire.typeActe == "ttransfert") {
      this.detentionService
        .getTransfert(
          this.prisonerPenaleDto.detenuId,
          this.prisonerPenaleDto.numOrdinaleArrestation,
          acteJudiciaire.tnumseqaff,
          acteJudiciaire.codeDocument,
          acteJudiciaire.numAffairePenal,
          acteJudiciaire.idTribunalPenal
        )
        .subscribe((data) => {
          this.penalTransfertDto = data.result;
          this.displayAffaireConsult = true;
        });
      this.displayExtraitJugement = "transfert";
    } else if (acteJudiciaire.typeActe == "tcontestation") {
      this.detentionService
        .getContestation(
          this.prisonerPenaleDto.detenuId,
          this.prisonerPenaleDto.numOrdinaleArrestation,
          acteJudiciaire.tnumseqaff,
          acteJudiciaire.codeDocument,
          acteJudiciaire.codeDocumentSecondaire,
          acteJudiciaire.numAffairePenal,
          acteJudiciaire.idTribunalPenal
        )
        .subscribe((data) => {
          this.penalContestationDto = data.result;
          this.displayAffaireConsult = true;
        });
      this.displayExtraitJugement = "contestation";
    } else if (acteJudiciaire.typeActe == "tcontrainte") {
      this.detentionService
        .getContrainte(
          this.prisonerPenaleDto.detenuId,
          this.prisonerPenaleDto.numOrdinaleArrestation,
          acteJudiciaire.codeDocument,
          acteJudiciaire.numAffairePenal,
          acteJudiciaire.idTribunalPenal
        )
        .subscribe((data) => {
          this.penalContrainteDto = data.result;
          this.arretProvisoires = this.penalContrainteDto.arretProvisoireDTOs;
          this.displayAffaireConsult = true;
        });
      this.displayExtraitJugement = "tcontrainte";
    } else {
      this.detentionService
        .getArretExecutionParTypeActe(
          this.prisonerPenaleDto.detenuId,
          this.prisonerPenaleDto.numOrdinaleArrestation,
          acteJudiciaire.tnumseqaff,
          acteJudiciaire.typeActe,
          acteJudiciaire.numAffairePenal,
          acteJudiciaire.idTribunalPenal
        )
        .subscribe((data) => {
          this.arretExecutionPenalDTO = data.result;
          this.displayAffaireConsult = true;
        });
      this.displayExtraitJugement = "arretExecution";
    }
  }
  swipe() {
    var image = new Image();
    image.src = this.photo;

    var w = window.open("", "_blank");
    w.document.write(image.outerHTML);
  }

  historique(tnumseqaff: any) {
    this.detentionService
      .getActesJudiciaires(
        this.prisonerPenaleDto.detenuId,
        this.prisonerPenaleDto.numOrdinaleArrestation,
        tnumseqaff
      )
      .subscribe((data) => {
        this.acteJudiciaires = data.result;
console.log(this.acteJudiciaires);
        this.displayActeJudiciaire = true;
      });
  }

  showArrestation(penaleDetentionInfoDto: PenaleDetentionInfoDto) {
    this.idEnfant = penaleDetentionInfoDto?.prisonerId; // Récupération du paramètre 'id'
    this.tcoddet = penaleDetentionInfoDto?.numroDetention;
    this.search(this.idEnfant, this.tcoddet);
    this.loadGraces(this.idEnfant, this.tcoddet);
    this.loadMutationResidence(this.idEnfant, this.tcoddet);
    this.loadEvasionCapture(this.idEnfant, this.tcoddet);
    this.loadParticipantsAffaire(this.idEnfant, this.tcoddet);
    this.loadData({ first: 0, rows: 5 });
    this.findRelationsFamiliales(this.idEnfant);
    this.displayAllArrestation = false;
  }

  loadData(event: any) {
    const first = event?.first ?? 0; // Défaut = 0
    const rows = event?.rows ?? 5; // Défaut = 10

    const page = first / rows; // Index de la page
    const pageSize = rows;

    const min_page = first + 1;
    const max_page = first + rows;

    console.log("page:", page);
    console.log("pageSize:", pageSize);
    console.log("min_page:", min_page);
    console.log("max_page:", max_page);

    this.loading = true;

    // this.backendService.getPaginatedAffaires(page, size).subscribe({
    //   next: (data) => {
    //     this.penalAffaireDTOs = data.content;
    //     this.totalRecords = data.totalElements; // ← ICI !
    //     this.loading = false;
    //   },
    //   error: () => (this.loading = false),
    // });

    this.detentionService
      .rechercherAffaires(this.idEnfant, this.tcoddet, min_page, max_page)
      .subscribe((data) => {
        //  this.penalSyntheseDto = data.result;
        this.penalAffaireDTOs = data.result;
        // this.totalRecords = this.penalSyntheseDto?.penalAffaireDTOs.length; // ← ICI !

        //  this.penalSyntheseDto?.penalAffaireDTOs[0]?.totalCount || 0;

        console.log("totalRecords " + this.totalRecords);
        console.log("penalAffaireDTOs " + this.penalAffaireDTOs.length);
        this.loading = false;
      });
  }
}
