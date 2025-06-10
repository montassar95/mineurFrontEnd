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

export class PenalMandatDepotDTO {
  // Identifiants
  tnumide: string;
  tcoddet: string;
  tnumseqaff: string;

  // Informations personnelles
  firstname: string; // exemple : "أحمد بن محمد بن علي"
  motherName: string; // exemple : "فاطمة بن زينب"
  birthDate: string; // format YYYY-MM-DD
  adresse: string;

  // Détention
  numeroEcrou: string;
  prision: string;

  // Mandat
  codeDocument: string;
  numAffaire: string;
  libelleTribunal: string;
  dateEmissionMandat: string; // format YYYY-MM-DD
  dateDepotMandat: string; // format YYYY-MM-DD
  texteMandat: string;
}
