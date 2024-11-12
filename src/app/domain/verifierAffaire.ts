import { Affaire } from "./affaire";
export class VerifierAffaire {
  nextBoolean: boolean;
  displayAlertAffaireOrigineLier: boolean;
  displayAlertLienAutre: boolean;
  displayAlertLienMeme: boolean;
  displayAlertOrigineExistAvecLien: boolean;
  displayAlertOrigineExistSansLien: boolean;
  displayAlertAffaireLienLier: boolean;
  displayAlertLienAutreArrestation: boolean;
  displayNext: boolean;
  affaire: Affaire;
}
