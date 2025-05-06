import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../domain/api.response";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AffaireService {
  constructor(private httpClient: HttpClient) {}

  mettreAJourNumeroOrdinal(ojet: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      environment.baseUrl + "affaire/mettreAJourNumeroOrdinal",
      ojet
    );
  }
  validerAffaire(ojet: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      environment.baseUrl + "affaire/validerAffaire",
      ojet
    );
  }

  calculerDateFin(idOjet1: any, idOjet2: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl + "affaire/calculerDateFin/" + idOjet1 + "/" + idOjet2
    );
  }

  obtenirInformationsDeDetentionParIdDetention(
    idEnfant: any,
    numOrdinale: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "affaire/obtenirInformationsDeDetentionParIdDetention/" +
        idEnfant +
        "/" +
        numOrdinale
    );
  }

  // trouverDetenusParNumAffaireEtTribunalId(
  //   numAffaire: any,
  //   tribunalId: any
  // ): Observable<ApiResponse> {
  //   return this.httpClient.get<ApiResponse>(
  //     environment.baseUrl +
  //       "affaire/trouverDetenusParNumAffaireEtTribunalId/" +
  //       numAffaire +
  //       "/" +
  //       tribunalId
  //   );
  // }

  trouverAffairesParAction(
    action: string,
    idEnfant: any,
    numOrdinale: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "affaire/trouverAffairesParAction/" +
        action +
        "/" +
        idEnfant +
        "/" +
        numOrdinale
    );
  }
}
