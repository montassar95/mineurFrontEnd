import { ArrestationId } from "./arrestationId";

import { Enfant } from "./enfant";
import { Liberation } from "./liberation";
import { Tribunal } from "./tribunal";
import { TypeAffaire } from "./typeAffaire";

export class Arrestation {
  arrestationId: ArrestationId;
  enfant: Enfant;
  date?: any;

  statut: number;
  etatJuridique?: any;
  liberation: Liberation;
  numOrdinalAffairePricipale?: String;
  numAffairePricipale?: any;
  tribunalPricipale: Tribunal;
  typeAffairePricipale: TypeAffaire;
   
}
