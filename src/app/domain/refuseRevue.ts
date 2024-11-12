 
import { Affaire } from "./affaire";
 
import { DocumentId } from "./documentId";
import { Etablissement } from "./etablissement";
 
import { TypeAffaire } from "./typeAffaire";
import { User } from "./user";
 
export class RefuseRevue {
  documentId: DocumentId;
  typeDocument: string;
  dateEmission?: any;
  dateDepotCarte?: any;

  affaire?: Affaire;
  textJugement?: any;

  typeAffaire?: TypeAffaire;

  dateInsertion?: any;
  numArrestation?: any;

  etablissement: Etablissement;
  user: User;
//   personelle: Personelle;
}
 
 

 
 
 
 
 
 


 
   