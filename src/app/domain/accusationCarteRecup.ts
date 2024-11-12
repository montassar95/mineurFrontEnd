import { Accusation } from "./accusation";
import { AccusationCarteDepotId } from "./accusationCarteDepotId";
import { AccusationCarteRecupId } from "./accusationCarteRecupId";
import { Affaire } from "./affaire";
import { Arrestation } from "./arrestation";
import { ArretProvisoire } from "./arretProvisoire";
import { CarteDepot } from "./carteDepot";
import { CarteRecup } from "./carteRecup";
import { DocumentId } from "./documentId";
import { Enfant } from "./enfant";
import { TitreAccusation } from "./titreAccusation";
import { Tribunal } from "./tribunal";
import { TypeAffaire } from "./typeAffaire";
import { TypeJuge } from "./typeJuge";

export class AccusationCarteRecup {
     accusationCarteRecupId: AccusationCarteRecupId;
     
     carteRecup: CarteRecup;


     
     titreAccusation: TitreAccusation;
     numOridinel:any;
     numOridinelLiee:any;
          jour:any;
           mois:any;
	      annee:any;
             dateDebut:any;
             dateFin:any;
            textAccusation?;
           
}












