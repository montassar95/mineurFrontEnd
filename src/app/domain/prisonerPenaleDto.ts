import { PenalSyntheseDto } from "./penalSyntheseDto";

export class PrisonerPenaleDto {
  detenuId: string;
  numOrdinaleArrestation: string;
  numOrdinaleResidence: number;
  nom: string;
  prenom: string;
  nomPere: string;
  nomGrandPere: string;
  nomMere: string;
  prenomMere: string;
  dateNaissance: string; // Ou `Date` si vous souhaitez un type `Date` natif
  lieuNaissance: string;
  sexe: string;
  numeroEcrou: string;
  nomEtablissement: string;
  adresse: string;
  etat: string;
  typeClassementPenal: string;
  age: string;
  punition: string;
  arretProvisoire: string;
  condanne: string;

  dateContestation: string;
  typeContestation: string;
  motifLiberation: string;
  dateLiberation: string;

  nomPartenaire: string;

  nombreEnfant: string;
  nationalite: string;
  profession: string;
  niveauCulturel: string;
  codeImage: string;

  phraseDeces: string;
  //penalSyntheseDto : PenalSyntheseDto;
}
