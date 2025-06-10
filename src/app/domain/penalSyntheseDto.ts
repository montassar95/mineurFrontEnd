import { PenalAffaireDTO } from "./penalAffaireDTO";

export class PenalSyntheseDto {
  numAffaire: string;
  tribunal: string;
  dateJugement: string;

  situationPenal: string;
  contestation: string;

  typeAffaire: string;
  accusation: string;

  totaleJugement: string;
  typeJugement: string;
  dateDebutPunition: string;
  dateFinPunition: string;
  totalCount:number;
  // penalAffaireDTOs: PenalAffaireDTO[];
}
