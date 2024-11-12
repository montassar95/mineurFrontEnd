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
 
import { MotifArreterlexecution } from "./motifArreterlexecution";
import { User } from "./user";
export class Arreterlexecution {
  documentId: DocumentId;
  typeDocument: string;
  typeFile: string;
  dateEmission?: any;
  dateDepotCarte?: any;

  affaire?: Affaire;

  typeAffaire?: TypeAffaire;

  dateInsertion?: any;
  numArrestation?: any;

  etablissement: Etablissement;
  user: User;
  

  motifArreterlexecution: MotifArreterlexecution;
}
