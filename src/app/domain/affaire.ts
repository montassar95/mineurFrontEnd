import { AffaireId } from "./affaireId";
import { Arrestation } from "./arrestation";
import { CarteRecup } from "./carteRecup";
import { TitreAccusation } from "./titreAccusation";
import { Tribunal } from "./tribunal";
import { TypeAffaire } from "./typeAffaire";
import { Document } from "./document";
import { TypeJuge } from "./typeJuge";
export class Affaire {
  affaireId: AffaireId;
  numOrdinalAffaire?;
  arrestation: Arrestation;

  tribunal?: Tribunal;

  affaireLien?: Affaire;
  affaireAffecter?: Affaire;
  documents: Document[];
  typeDocument?;
  typeAffaire?: TypeAffaire;
  titreAccusations: TitreAccusation[];
  jour: any;
  mois: any;
  annee: any;

  jourArret: any;
  moisArret: any;
  anneeArret: any;

  dateEmission: any;
  dateEmissionDocument: any;
  typeJuge: TypeJuge;

  typeFile: any;
  typeDocumentActuelle;
  affairePrincipale: boolean;
}
