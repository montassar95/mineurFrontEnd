import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { switchMap, tap } from "rxjs/operators";
import { DetentionService } from "src/app/demo/service/detention.service";
import { AccusationExtraitJugementDTO } from "src/app/domain/accusationExtraitJugementDTO";
import { ActeJudiciaire } from "src/app/domain/acteJudiciaire";
import { AffairePenaleDto } from "src/app/domain/affairePenaleDto";
import { ArretExecutionPenalDTO } from "src/app/domain/arretExecutionPenalDTO";
import { PenalContestationDto } from "src/app/domain/penalContestationDto";
import { PenaleDetentionInfoDto } from "src/app/domain/penaleDetentionInfoDto";
import { PenalJugementDTO } from "src/app/domain/penalJugementDTO";
import { PenalTransfertDto } from "src/app/domain/penalTransfertDto";
import { PrisonerPenaleDto } from "src/app/domain/prisonerPenaleDto";

@Component({
  selector: "app-show-penale",
  templateUrl: "./show-penale.component.html",
  styleUrls: ["./show-penale.component.scss"],
})
export class ShowPenaleComponent implements OnInit {
  idEnfant: string;
  source: any;
  prisonerPenaleDto: PrisonerPenaleDto;

  penaleDetentionInfoDtos: PenaleDetentionInfoDto[];
  penalMandatDepotDTO: PenalJugementDTO;
  penalTransfertDto: PenalTransfertDto;
  penalContestationDto: PenalContestationDto;
  arretExecutionPenalDTO: ArretExecutionPenalDTO;
  accusationExtraitJugements: AccusationExtraitJugementDTO[];
  penalJugementDTO: PenalJugementDTO;

  acteJudiciaires: ActeJudiciaire[];

  affairePenaleDtos: AffairePenaleDto[];
  displayAffaireConsult = false;
  displayExtraitJugement = "";
  photo = "";
  displayActeJudiciaire = false;
  constructor(
    private detentionService: DetentionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Récupérer les paramètres 'id' et 'source' de l'URL
    this.route.paramMap.subscribe((params) => {
      this.idEnfant = params.get("id"); // Récupération du paramètre 'id'
      this.source = params.get("source"); // Récupération du paramètre 'source'

      if (this.idEnfant && this.source == "Penale") {
        this.search(this.idEnfant); // Appel de la méthode search avec les deux paramètres
        this.source = params.get("source"); // Récupération du paramètre 'source'
        this.trouverToutDetentionInfosParPrisonerIdDansPrisons(this.idEnfant);
      } else {
        alert("Mineur");
      }
    });
    
  }
  searchAffaire(prisonerId: any, numArr: any) {
    this.detentionService
      .findAffairesByNumideAndCoddet(prisonerId, numArr)
      .subscribe((data) => {
        console.log(data.result);
        this.affairePenaleDtos = data.result;
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
    console.log(id+"   ----------    ");
    this.detentionService
      .trouverToutDetentionInfosParPrisonerIdDansPrisons(id)
      .subscribe((data) => {
        console.log(data.result);
        this.penaleDetentionInfoDtos = data.result;
      });
  }

  search(id: string) {
    this.detentionService
      .findPrisonerPenalByPrisonerId(id)
      .pipe(
        tap((data) => {
          this.prisonerPenaleDto = data.result;
          this.searchAffaire(
            this.prisonerPenaleDto?.detenuId,
            this.prisonerPenaleDto?.numOrdinaleArrestation
          );
        }),
        switchMap((data) =>
          this.detentionService.trouverAmenPhoto(data.result.codeImage)
        ),
        tap((photoData) => {
          if (photoData?.result?.image) {
            this.photo = "data:image/jpeg;base64," + photoData.result.image;
          } else {
            this.photo = "";
          }
        })
      )
      .subscribe();
      
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
          acteJudiciaire.codeDocument
        )
        .subscribe((data) => {
          this.penalJugementDTO = data.result;
          this.accusationExtraitJugements =
            this.penalJugementDTO.accusationExtraitJugementDTOs;

          this.displayAffaireConsult = true;
          console.log(this.penalJugementDTO);
        });
      this.displayExtraitJugement = "jugement";
    } else if (acteJudiciaire.typeActe == "tmandatdepot") {
      this.detentionService
        .getMandatDepot(
          this.prisonerPenaleDto.detenuId,
          this.prisonerPenaleDto.numOrdinaleArrestation,
          acteJudiciaire.tnumseqaff,
          acteJudiciaire.codeDocument
        )
        .subscribe((data) => {
          this.penalMandatDepotDTO = data.result;
          this.displayAffaireConsult = true;
        });
      this.displayExtraitJugement = "depot";
    } else if (acteJudiciaire.typeActe == "ttransfert") {
      this.detentionService
        .getTransfert(
          this.prisonerPenaleDto.detenuId,
          this.prisonerPenaleDto.numOrdinaleArrestation,
          acteJudiciaire.tnumseqaff,
          acteJudiciaire.codeDocument
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
          acteJudiciaire.codeDocumentSecondaire
        )
        .subscribe((data) => {
          this.penalContestationDto = data.result;
          this.displayAffaireConsult = true;
        });
      this.displayExtraitJugement = "contestation";
    } else {
      this.detentionService
        .getArretExecutionParTypeActe(
          this.prisonerPenaleDto.detenuId,
          this.prisonerPenaleDto.numOrdinaleArrestation,
          acteJudiciaire.tnumseqaff,
          acteJudiciaire.typeActe
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

        this.displayActeJudiciaire = true;
      });
  }
}
