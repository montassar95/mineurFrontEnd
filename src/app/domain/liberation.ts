import { Arrestation } from "./arrestation";
import { CauseLiberation } from "./causeLiberation";
import { EtabChangeManiere } from "./etabChangeManiere";
import { LiberationId } from "./liberationId";
import { Residence } from "./residence";

export class Liberation {
    
    liberationId: LiberationId;
   
    
	date?; 
	
	  
	
//   arrestation :Arrestation;
	
	  causeLiberation:CauseLiberation;
      remarqueLiberation:any;

      etabChangeManiere:EtabChangeManiere;
}    
