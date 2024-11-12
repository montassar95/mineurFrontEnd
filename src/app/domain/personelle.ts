import { Etablissement } from "./etablissement";
import { Situation } from "./situation";

export class Personelle {
  //     id?;
  //     matricule?;
  //     nom	: string;
  //     prenom: string;
  //     phone	: string;
  //     adress: string;
  //     mail: string;
  //     situation:Situation;
  block?;
  //     com:any;
  //     etablissement:Etablissement;
  //    // img?:any;

  id;
  matricule;
  cnrps;
  nom;
  prenom;
  nom_pere;

  grade;

  etablissement: Etablissement;

  fonction;

  situation;

  img;
}
