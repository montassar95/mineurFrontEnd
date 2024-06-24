
  
import { CauseDeces } from "./causeDeces";
import { CommentEchapper } from "./commentEchapper";
import { CommentTrouver } from "./commentTrouver";
import { EchappesId } from "./echappesId";
import { Enfant } from "./enfant";
import { LieuDeces } from "./lieuDeces";
import { Residence } from "./residence";
  
export class Deces {
     
	enfantIdDeces?:any;

      dateDeces?:any;

	  causeDeces:CauseDeces;
	  lieuDeces:LieuDeces;
	 
	  remarqueDeces?:any;
	
	  residenceDeces:Residence;
	
	
	 enfant:Enfant;
	  
	
     
 }