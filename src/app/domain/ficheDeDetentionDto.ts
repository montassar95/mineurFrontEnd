import { Affaire } from "./affaire";
import { ArretProvisoire } from "./arretProvisoire";
import { Liberation } from "./liberation";
import { Residence } from "./residence";
import { Tribunal } from "./tribunal";
import { TypeAffaire } from "./typeAffaire";

export class FicheDeDetentionDto {
  jourPenal: number;
  moisPenal: number;
  anneePenal: number;
  jourArret: number;
  moisArret: number;
  anneeArret: number;
  dateJugementPrincipale: string;
  dateAppelParquet: string;
  dateAppelEnfant: string;
  isAppelParquet: boolean;
  isAppelEnfant: boolean;
  isDateJuge: boolean;
  sansAffaire: boolean;
  nbrAffaires: number;
  displayArrestation: boolean;

  isChangementLieuMu: boolean;
  isChangementLieuCh: boolean;
  isAgeAdulte: boolean;
  etatJuridique: string;
 
  affaires: Affaire[] = [];
  liberation: Liberation;

  totaleRecidenceWithetabChangeManiere: number;

  totaleRecidence: number;

  totaleEchappe: number;

  arretProvisoires: ArretProvisoire[] = [];

  residences: Residence[] = [];
  dateDebut: string;
  dateFin: string;
}
