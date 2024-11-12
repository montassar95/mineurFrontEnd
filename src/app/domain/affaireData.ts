import { Tribunal } from "./tribunal";
import { Affaire } from "./affaire";
import { Arrestation } from "./arrestation";
export class AffaireData {
  idEnfant: string;
  arrestation: Arrestation;
  numAffaire1: number;
  tribunal1: Tribunal;
  numAffaire2: number;
  tribunal2: Tribunal;
  affaireOrigine: Affaire;
}
