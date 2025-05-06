import { Tribunal } from "./tribunal";
import { Affaire } from "./affaire";
import { Arrestation } from "./arrestation";
export class AffairePenaleDto {
  idEnfant: string;
  tnumseqaff: string;
  libelleTribunal: string;
  tnumjafFormatte: string;
  etatAffaire: string;
  libelleNature: string;
  numeroEcrou: string;
  typeMandat: string;
  tntypema: string;
}
