import { Accusation } from "./accusation";
import { Affaire } from "./affaire";
import { Arrestation } from "./arrestation";
import { ArretProvisoire } from "./arretProvisoire";
import { DocumentId } from "./documentId";
import { Enfant } from "./enfant";
import { Tribunal } from "./tribunal";
import { TypeAffaire } from "./typeAffaire";
import { TypeJuge } from "./typeJuge";
import { Document } from "./document";
import { Etablissement } from "./etablissement";
 
import { TitreAccusation } from "./titreAccusation";
import { User } from "./user";
export class CarteHeber {
  documentId: DocumentId;
  typeDocument: string;
  dateEmission?: any;
  dateDepotCarte?: any;

  textJugement?: any;

  typeAffaire?: TypeAffaire;

  affaire?: Affaire;

  numArrestation?: any;

  etablissement: Etablissement;
  user: User;
  // personelle: Personelle;

  dateInsertion?: any;

  entitiesTitreAccusation: TitreAccusation[] = [];

  titreAccusations: TitreAccusation[] = [];
}
