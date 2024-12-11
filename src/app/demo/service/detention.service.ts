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
