export class ArretExecutionPenalDTO {
  // Identifiants
  tnumide: string;
  tcoddet: string;
  tnumseqaff: string;

  // Informations personnelles
  firstname: string; // exemple : "أحمد بن محمد بن علي"
  motherName: string; // exemple : "فاطمة بن زينب"
  birthDate: string; // format YYYY-MM-DD
  adresse: string;

  // Détention
  numeroEcrou: string;
  prision: string;
  codeDocument: string;
  codeDocumentSecondaire: string;
  typeActe: string;

  dateActe: string;
  numAffaire: string;
  libelleTribunal: string;
  typeDocument: string;
  typeMotif: string;
  libelleMotif: string;
}
