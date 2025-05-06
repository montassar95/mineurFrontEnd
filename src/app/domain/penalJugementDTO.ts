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

export class PenalJugementDTO {
  tnumide: string;
  tcoddet: string;
  tnumseqaff: string;
  tcodextj: string;
  dateJugement: string;
  dateDepot: string;
  ttexjug: string;
  libelleTjugement: string;
  dateDebutPunition: string;
  dateFinPunition: string;
  accusationExtraitJugementDTOs: AccusationExtraitJugementDTO[];
}
