import { Arrestation } from "./arrestation";
import { ArretProvisoire } from "./arretProvisoire";

import { Enfant } from "./enfant";

export class PDFPenaleDTO {
  idEnfant: string;
  numOrdinale: number;

  sansDetail: boolean;
  sansImage: boolean;
}
