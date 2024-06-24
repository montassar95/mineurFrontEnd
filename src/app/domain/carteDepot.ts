 
import { Affaire } from "./affaire";
 
import { DocumentId } from "./documentId";
 
import { TypeAffaire } from "./typeAffaire";
 
import { TitreAccusation } from "./titreAccusation";
 
import { Etablissement } from "./etablissement";
import { Personelle } from "./personelle";
export class CarteDepot {
    
   
    documentId :DocumentId;
    typeDocument :string;
    dateEmission?:any;
    dateDepotCarte?:any;
     
    textJugement?:any;
  

    typeAffaire?:TypeAffaire;
   
    affaire?:Affaire;
  
  numArrestation?:any;
 
 etablissement :Etablissement;

 personelle:Personelle;
 
 dateInsertion?:any;
  
 entitiesTitreAccusation: TitreAccusation[] = [];
 
    
    
}
 
 

 
 
 
 
 
 


 
   