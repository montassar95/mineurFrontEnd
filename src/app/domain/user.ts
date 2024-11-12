import { Etablissement } from "./etablissement";

export class User {
  id?;
  username: string;
  //   personelle: Personelle;
  role: string[];
  password: string;
  nom: string;
  prenom: string;
  numAdministratif: string;
  etablissement: Etablissement;
  block;
}
