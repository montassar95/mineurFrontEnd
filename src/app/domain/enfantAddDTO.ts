import { Arrestation } from "./arrestation";

import { Enfant } from "./enfant";
import { Etablissement } from "./etablissement";

import { Residence } from "./residence";

export class EnfantAddDTO {
  enfant = new Enfant();
  arrestation = new Arrestation();
  residence = new Residence();
  etablissement = new Etablissement();
  img: string | ArrayBuffer;
}
