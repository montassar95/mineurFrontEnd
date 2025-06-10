import { Arrestation } from "./arrestation";
import { CarteRecup } from "./carteRecup";
import { Tribunal } from "./tribunal";

export class MutationResidenceDto {
  numeroLigne: string; // Numéro de ligne
  prisonerId: string; // Identifiant du détenu
  numroDetention: string; // Numéro de détention
  numeroSequentielle: string; // Numéro séquentiel de mutation
  numeroEcrou: string; // Numéro d’écrou
  prision: string; // Libellé de la prison
  dateDebut: string; // Date de début
  dateFin: string; // Date de fin
  dateMutation: string; // Date de mutation
  motifMutation: string; // Motif de mutation
}
