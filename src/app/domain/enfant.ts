import { ClassePenale } from "./classePenale";
import { Deces } from "./deces";
import { Delegation } from "./delegation";
import { Gouvernorat } from "./gouvernorat";
import { Metier } from "./metier";
import { Nationalite } from "./nationalite";
import { NiveauEducatif } from "./niveauEducatif";
import { SituationFamiliale } from "./situationFamiliale";
import { SituationSocial } from "./situationSocial";

export class Enfant {
  id?: any;
  nom?: any;
  prenom?: any;
  nomPere?: any;
  nomGrandPere?: any;
  nomMere?: any;
  prenomMere?: any;

  dateNaissance?: any;
  lieuNaissance?: any;
  sexe?: any;
  img?: any;

  nationalite = new Nationalite();
  niveauEducatif = new NiveauEducatif();
  situationFamiliale = new SituationFamiliale();
  nombreFreres: number;
  gouvernorat = new Gouvernorat();
  delegation = new Delegation();
  adresse?: any;

  surnom?: any;
  alias?: any;

  classePenale = new ClassePenale();

  situationSocial = new SituationSocial();

  metier = new Metier();

  nbrEnfant?: number;
}
