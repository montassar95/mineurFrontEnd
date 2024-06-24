import { Arrestation } from "./arrestation";
import { CauseMutation } from "./causeMutation";
import { EtabChangeManiere } from "./etabChangeManiere";
import { Etablissement } from "./etablissement";
import { ResidenceId } from "./residanceId";

export class Residence {
    
    residenceId: ResidenceId;
    numArrestation?;
 
    
	  dateEntree?;
	 dateSortie?;  
	etablissement:Etablissement;
    etablissementEntree:Etablissement; 
    etablissementSortie:Etablissement;
    arrestation: Arrestation;
    statut?:any;
    causeMutation: CauseMutation;
    causeMutationSortie: CauseMutation;
    remarqueMutation?:any;
    nombreEchappes?:any;
    
    etabChangeManiere:EtabChangeManiere;
}
