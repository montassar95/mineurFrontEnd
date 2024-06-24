
  
import { CommentEchapper } from "./commentEchapper";
import { CommentTrouver } from "./commentTrouver";
import { EchappesId } from "./echappesId";
import { Enfant } from "./enfant";
import { Residence } from "./residence";
  
export class Echappes {
     
      echappesId:EchappesId;

      dateEchappes?:any;

	  dateTrouver?:any;

	
	  commentEchapper:CommentEchapper;

	  commentTrouver:CommentTrouver;
	
	
	  remarqueEchappes?:any;
	
	  remarqueTrouver?:any;


	  residenceEchapper:Residence;
	
	
	  residenceTrouver:Residence;
	
	
	
     
 }