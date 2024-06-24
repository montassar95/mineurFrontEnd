import { TitreAccusation } from "./titreAccusation";
import { TypeAffaire } from "./typeAffaire";

export class Accusation {
    id?;
   
    textAccusation?;
    jour:number;
    mois:number;
    annee:number;
    numOridinel:any;
    numOridinelLiee:any;
      dateDebut?: any;
     dateFin?: any;
    titreAccusation: TitreAccusation;

    

}
