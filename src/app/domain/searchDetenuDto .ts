export class SearchDetenuDto {
  detenuId: string;
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
}
