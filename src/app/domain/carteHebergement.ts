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
import { Personelle } from "./personelle";
import { TitreAccusation } from "./titreAccusation";
export class CarteHeber {
    
   
   
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
 
 

 
 
 
 
 
 


 
   