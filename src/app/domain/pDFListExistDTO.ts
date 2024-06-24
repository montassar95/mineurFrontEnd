import { CauseLiberation } from "./causeLiberation";
import { ClassePenale } from "./classePenale";
import { Delegation } from "./delegation";
import { Etablissement } from "./etablissement";
import { Gouvernorat } from "./gouvernorat";
import { Metier } from "./metier";
import { Nationalite } from "./nationalite";
import { NiveauEducatif } from "./niveauEducatif";
import { SituationFamiliale } from "./situationFamiliale";
import { SituationSocial } from "./situationSocial";
import { TypeAffaire } from "./typeAffaire";
import { TypeJuge } from "./typeJuge";
import { TypeTribunal } from "./typeTribunal";

export class PDFListExistDTO {
  etablissement: Etablissement;
  etablissements: Etablissement[];
  etatJuridiue: String;

  classePenale: ClassePenale;

  niveauEducatif: NiveauEducatif;

  gouvernorat: Gouvernorat;

  situationFamiliale: SituationFamiliale;

  situationSocial: SituationSocial;

  metier: Metier;

  delegation: Delegation;

  gouvernoratTribunal: Gouvernorat;
  typeTribunal: TypeTribunal;

  typeAffaire: TypeAffaire;
  typeJuge: TypeJuge;
  causeLiberation: CauseLiberation;

  nationalite: Nationalite;

  age1: number;
  age2: number;
  dateDebutGlobale: any;
  dateFinGlobale: any;

  checkEtranger: any;
  checkUniqueAff: any;

  datePrintAllCentre: any;
}
