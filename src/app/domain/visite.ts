import { Enfant } from "./enfant";
import { Residence } from "./residence";

export class Visite {
  
  enfantIdVisite?;

  anneeVisite: number;
  moisVisite: number;
  nbrVisite: number;

  residenceVisite: Residence;

  enfant: Enfant;
}
