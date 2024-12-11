import { TitreAccusation } from "./titreAccusation";
import { TypeAffaire } from "./typeAffaire";

export class StatistiqueEtablissementDTO {
  id: number;
  libelle_etablissement: string;
  nbrStatutPenalJuge: number;
  nbrStatutPenalArrete: number;
  nbrStatutPenalLibre: number;
   nbrNationaliteDifferentDeJuge1M: number;
  nbrTypeAffaireId5M: number;
  nbrNationaliteDifferentDeJuge1F: number;
  nbrTypeAffaireId5F: number;

 
  }
