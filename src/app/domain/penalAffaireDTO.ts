export class PenalAffaireDTO {
  tnumseqaff: string;
  libelleNature: string;
  libelleTribunal: string;
  tnumjafFormatte: string;
  accusationsConcatenees: string;
  etatAffaire: string;
  typeMandat: string;
  tdatdep: string;
  totalAnnees: number;
  totalMois: number;
  totalJours: number;

  libelleJugement: string;
  numeroEcrou: string;
  dateDebutMin: string; // format 'YYYY-MM-DD'
  dateFinMax: string; // format 'YYYY-MM-DD'

  typeDocument: string;
  tcodsit: string;
  typeJugement: string;
  natureJugement: string;
  natureTribunal: string;
  typeAffaire: string;

  textJugement: string;
  totalCount: number;
}
