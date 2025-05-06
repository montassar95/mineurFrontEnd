import { Accusation } from "./accusation";
import { AccusationCarteDepotId } from "./accusationCarteDepotId";
import { AccusationExtraitJugementDTO } from "./accusationExtraitJugementDTO";
import { Affaire } from "./affaire";
import { Arrestation } from "./arrestation";
import { ArretProvisoire } from "./arretProvisoire";
import { CarteDepot } from "./carteDepot";
import { DocumentId } from "./documentId";
import { Enfant } from "./enfant";
import { TitreAccusation } from "./titreAccusation";
import { Tribunal } from "./tribunal";
import { TypeAffaire } from "./typeAffaire";
import { TypeJuge } from "./typeJuge";

export class PenalTransfertDto {
  tnumide: string;
  tcoddet: string;
  tnumseqaff: string;
  tcodtraf: string;
  tdattran: string;
  tnumjaf: string;
  libelleTribunalDepart: string;
  tnumjafn: string;
  libelleTribunalArrivee: string;
}
