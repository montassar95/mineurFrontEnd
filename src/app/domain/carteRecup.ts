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
 
import { AccusationCarteRecup } from "./accusationCarteRecup";
import { User } from "./user";
export class CarteRecup {
  documentId: DocumentId;
  typeDocument: string;
  dateEmission?: any;
  dateDepotCarte?: any;

  textJugement?: any;

  typeAffaire?: TypeAffaire;
  typeJuge?: TypeJuge;
  affaire?: Affaire;

  //   arretProvisoires: ArretProvisoire[] ;
  daysDiffJuge: any;
  jour: any;
  mois: any;
  annee: any;

  daysDiffArretProvisoire: any;
  jourArretProvisoire: any;
  moisArretProvisoire: any;
  anneeArretProvisoire: any;

  //	accusations: Accusation[];

  numArrestation?: any;

  dateDebutPunition?: any;

  dateFinPunition?: any;

  etablissement: Etablissement;
  user: User;
  // personelle: Personelle;

  dateInsertion?: any;

  entitiesAccusation: Accusation[] = [];

  // entitiesArretProvisoire: ArretProvisoire[] = [];
  arretProvisoires: ArretProvisoire[] = [];
  accusationCarteRecups: AccusationCarteRecup[] = [];
}
