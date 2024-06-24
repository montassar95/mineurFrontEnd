 
import { Affaire } from "./affaire";
 
import { DocumentId } from "./documentId";
import { Etablissement } from "./etablissement";
import { Personelle } from "./personelle";
import { TypeAffaire } from "./typeAffaire";
 
export class Revue {
    
   
    documentId :DocumentId;
    typeDocument :string;
    dateEmission?:any;
    dateDepotCarte?:any;
     
    affaire?:Affaire;
    textJugement?:any;
    
    typeAffaire?:TypeAffaire;

    dateInsertion?:any;
    numArrestation?:any;
    
	 

 
    etablissement :Etablissement;
   
    personelle:Personelle;
}
 
 

 
 
 
 
 
 


 
   