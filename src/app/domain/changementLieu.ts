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
import { EtabChangeManiere } from "./etabChangeManiere";
import { User } from "./user";
export class ChangementLieu {
  documentId: DocumentId;
  typeDocument: string;
  dateEmission?: any;
  dateDepotCarte?: any;

  affaire?: Affaire;

  typeAffaire?: TypeAffaire;

  dateInsertion?: any;
  numArrestation?: any;

  etablissementMutation: Etablissement;

  etabChangeManiere: EtabChangeManiere;

  jour: any;
  mois: any;
  annee: any;

  type: string;

  etablissement: Etablissement;
  // user: User;
  //personelle: Personelle;

  motifArreterlexecution: MotifArreterlexecution;
}
