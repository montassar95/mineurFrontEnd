import { TitreAccusation } from "./titreAccusation";
import { TypeAffaire } from "./typeAffaire";

export class StatistiqueMouvementsDTO {
  libelleEtablissement: string;
  nombrePremiereEntree: number;
  nombreLiberation: number;
  nombreMutationEntrant: number;
  nombreMutationSortant: number;
  nombreChangementEtablissement: number;
}
