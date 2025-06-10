import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../domain/api.response";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DetentionService {
  constructor(private httpClient: HttpClient) {}

  trouverPhotoByIdDetenuEtNumDetention(
    idOjet1: any,
    idOjet2: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "photos/trouverPhotoByIdDetenuEtNumDetention/" +
        idOjet1 +
        "/" +
        idOjet2
    );
  }

  trouverAmenPhoto(idOjet1: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl + "photos/trouverAmenPhoto/" + idOjet1
    );
  }

  creerAdmissionDetenu(ojet: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      environment.baseUrl + "enfant/creerAdmissionDetenu",
      ojet
    );
  }

  mettreAJourAdmissionDetenu(ojet: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      environment.baseUrl + "enfant/mettreAJourAdmissionDetenu",
      ojet
    );
  }

  supprimerLiberation(ojet: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      environment.baseUrl + "arrestation/supprimerLiberation/",
      ojet
    );
  }

  accepterDemandeMutation(ojet: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      environment.baseUrl + "residence/accepterDemandeMutation",
      ojet
    );
  }

  supprimerDemandeMutation(ojet: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      environment.baseUrl + "residence/supprimerDemandeMutation",
      ojet
    );
  }
  supprimerAcceptationMutation(ojet: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      environment.baseUrl + "residence/supprimerAcceptationMutation ",
      ojet
    );
  }

  trouverDerniereResidenceParIdDetenu(idOjet: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "enfant/trouverDerniereResidenceParIdDetenu/" +
        idOjet
    );
  }
  trouverResidencesParNumeroEcrou(idOjet: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl + "enfant/trouverResidencesParNumeroEcrou/" + idOjet
    );
  }

  trouverDetenusParNumeroEcrouDansPrisons(
    idOjet: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "enfant/trouverDetenusParNumeroEcrouDansPrisons/" +
        idOjet
    );
  }

  trouverDetenuAvecSonStatutActuel(
    idOjet1: String,
    idOjet2: String
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "enfant/trouverDetenuAvecSonStatutActuel/" +
        idOjet1 +
        "/" +
        idOjet2
    );
  }

  trouverResidencesDetentionActiveParIdDetenu(
    ojetUrl: any,
    idOjet: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        ojetUrl +
        "/trouverResidencesDetentionActiveParIdDetenu/" +
        idOjet
    );
  }

  trouverDerniereDetentionParIdDetenu(
    ojetUrl: any,
    idOjet: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        ojetUrl +
        "/trouverDerniereDetentionParIdDetenu/" +
        idOjet
    );
  }

  trouverDerniereResidenceParNumDetentionEtIdDetenu(
    ojetUrl: any,
    idOjet1: any,
    idOjet2: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        ojetUrl +
        "/trouverDerniereResidenceParNumDetentionEtIdDetenu/" +
        idOjet1 +
        "/" +
        idOjet2
    );
  }
  trouverToutDetentionInfosParPrisonerIdDansPrisons(
    prisonerId: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "enfant/trouverToutDetentionInfosParPrisonerIdDansPrisons/" +
        prisonerId
    );
  }
  calculerNombreDetentionsParIdDetenu(
    ojetUrl: any,
    idOjet: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        ojetUrl +
        "/calculerNombreDetentionsParIdDetenu/" +
        idOjet
    );
  }

  trouverEchappesParIdDetenuEtNumDetention(
    idEnfant: any,
    numOrdinaleArrestation: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "echappes/trouverEchappesParIdDetenuEtNumDetention /" +
        idEnfant +
        "/" +
        numOrdinaleArrestation
    );
  }

  findPrisonerPenalByPrisonerId(
    idEnfant: any,
    tcoddet: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "enfant/findPrisonerPenalByPrisonerId/" +
        idEnfant +
        "/" +
        tcoddet
    );
  }

  rechercherAffaires(
    prisonerId: any,
    numArr: any,
    minPage: any,
    maxPAge: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "enfant/rechercherAffaires/" +
        prisonerId +
        "/" +
        numArr +
        "/" +
        minPage +
        "/" +
        maxPAge
    );
  }

  rechercherPenalSyntheseDetenu(
    prisonerId: any,
    numArr: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "enfant/rechercherPenalSyntheseDetenu/" +
        prisonerId +
        "/" +
        numArr
    );
  }

  findAffairesByNumideAndCoddet(
    prisonerId: any,
    numArr: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "enfant/findAffairesByNumideAndCoddet/" +
        prisonerId +
        "/" +
        numArr
    );
  }

  getMandatDepot(
    tnumide: any,
    tcoddet: any,
    tnumseqaff: any,
    tcodma: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "enfant/getMandatDepot/" +
        tnumide +
        "/" +
        tcoddet +
        "/" +
        tnumseqaff +
        "/" +
        tcodma
    );
  }

  getTransfert(
    tnumide: any,
    tcoddet: any,
    tnumseqaff: any,
    tcodma: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "enfant/getTransfert/" +
        tnumide +
        "/" +
        tcoddet +
        "/" +
        tnumseqaff +
        "/" +
        tcodma
    );
  }

  getContestation(
    tnumide: any,
    tcoddet: any,
    tnumseqaff: any,
    tcodma: any,
    codeDocumentSecondaire: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "enfant/getContestation/" +
        tnumide +
        "/" +
        tcoddet +
        "/" +
        tnumseqaff +
        "/" +
        tcodma +
        "/" +
        codeDocumentSecondaire
    );
  }

  getContrainte(
    tnumide: any,
    tcoddet: any,
    tnumseqaff: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "enfant/getContrainte/" +
        tnumide +
        "/" +
        tcoddet +
        "/" +
        tnumseqaff
    );
  }

  getPenalGraces(tnumide: any, tcoddet: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl + "enfant/getPenalGraces/" + tnumide + "/" + tcoddet
    );
  }

  getMutationResidence(tnumide: any, tcoddet: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "enfant/getMutationResidence/" +
        tnumide +
        "/" +
        tcoddet
    );
  }

  getEvasionsWithCaptures(tnumide: any, tcoddet: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "enfant/getEvasionsWithCaptures/" +
        tnumide +
        "/" +
        tcoddet
    );
  }

  findParticipantsAffaire(tnumide: any, tcoddet: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "enfant/findParticipantsAffaire/" +
        tnumide +
        "/" +
        tcoddet
    );
  }

  getAccusationsParDetenu(
    tnumide: any,
    tcoddet: any,

    codExtj: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "enfant/getAccusationsParDetenu/" +
        tnumide +
        "/" +
        tcoddet +
        "/" +
        codExtj
    );
  }
  getActesJudiciaires(
    tnumide: any,
    tcoddet: any,

    tnumseqaff: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "enfant/getActesJudiciaires/" +
        tnumide +
        "/" +
        tcoddet +
        "/" +
        tnumseqaff
    );
  }
  getArretExecutionParTypeActe(
    tnumide: any,
    tcoddet: any,

    tnumseqaff: any,
    typeActe: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "enfant/getArretExecutionParTypeActe/" +
        tnumide +
        "/" +
        tcoddet +
        "/" +
        tnumseqaff +
        "/" +
        typeActe
    );
  }

  trouverDetenusParPrisonerIdDansPrisons(
    prisonerId: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "enfant/trouverDetenusParPrisonerIdDansPrisons/" +
        prisonerId
    );
  }

  trouverDetenusParDetenuIdMineurDansPrisons(
    prisonerIdMineur: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "enfant/trouverDetenusParDetenuIdMineurDansPrisons/" +
        prisonerIdMineur
    );
  }

  trouverDetenusParDetenuIdMajeurDansCentres(
    prisonerIdMajeur: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "enfant/trouverDetenusParDetenuIdMajeurDansCentres/" +
        prisonerIdMajeur
    );
  }

  trouverResidencesParCriteresDetenu(object: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      environment.baseUrl + "enfant/trouverResidencesParCriteresDetenu",
      object
    );
  }

  trouverDetenusParCriteresDansPrisons(object: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      environment.baseUrl + "enfant/trouverDetenusParCriteresDansPrisons",
      object
    );
  }

  trouverVisitesParIdDetenuEtMoisEtAnnee(
    id: any,
    anneeVisite: any,
    moisVisite: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "visite/trouverVisitesParIdDetenuEtMoisEtAnnee/" +
        id +
        "/" +
        anneeVisite +
        "/" +
        moisVisite
    );
  }

  validerNumeroEcrou(
    numeroEcrou: any,
    etablissementId: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "residence/validerNumeroEcrou/" +
        numeroEcrou +
        "/" +
        etablissementId
    );
  }

  changerMotDePasse(
    userId: number,
    oldPassword: string,
    newPassword: string
  ): Observable<ApiResponse> {
    const body = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    return this.httpClient.post<ApiResponse>(
      environment.baseUrl + "user/changePassword/" + userId,
      body
    );
  }
}
