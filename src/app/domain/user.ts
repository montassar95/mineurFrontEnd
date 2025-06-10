import { Etablissement } from "./etablissement";

export class User {
  id?;
  username: string;
 
  role: string[];
  password: string;
  nom: string;
  prenom: string;
  telephone: string;
  numAdministratif: string;
  etablissement: Etablissement;
  block;
}
