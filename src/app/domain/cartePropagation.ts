 
import { Affaire } from "./affaire";
 
import { DocumentId } from "./documentId";
 
import { TypeAffaire } from "./typeAffaire";
 
import { TitreAccusation } from "./titreAccusation";
 
import { Etablissement } from "./etablissement";
 
import { User } from "./user";
export class CartePropagation {
  documentId: DocumentId;
  typeDocument: string;
  dateEmission?: any;
  dateDepotCarte?: any;

  typeAffaire?: TypeAffaire;

  affaire?: Affaire;

  numArrestation?: any;

  etablissement: Etablissement;
  //user: User;
  // personelle: Personelle;

  dateInsertion?: any;

  jour: any;
  mois: any;
  annee: any;
}
 
 

 
 
 
 
 
 


 
   