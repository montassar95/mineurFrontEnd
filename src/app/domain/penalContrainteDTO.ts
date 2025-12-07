import { ArretProvisoireDTO } from "./arretProvisoireDTO";

export class PenalContrainteDTO {
  tnumide: string;
  tcoddet: string;
  tnumseqaff: string;
  firstname: string;
  motherName: string;
  birthDate: string;
  adresse: string;
  numeroEcrou: string;
  prision: string;
  codeDocument: string;
  dateJugement: string;
  dateDepot: string;
  numAffaire: string;
  libelleTribunal: string;
  libelleFamilleAcc: string;
  montantAmende: string;
  fraisJudiciaires: string;
  versementsPayes: string;
  joursComptabilises: string;
  resteDu: string;
  dureeAffaire: string;
  dateRevisionJbr: string;
  dureeApresRevision: string;
  dateDebutPeine: string;
  dateFinPeine: string;

   arretProvisoireDTOs: ArretProvisoireDTO[];
}
