import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../domain/api.response";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DocumentService {
  constructor(private httpClient: HttpClient) {}

  trouverDocumentJudiciaireParId(ojet: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      environment.baseUrl + "document/trouverDocumentJudiciaireParId",
      ojet
    );
  }

  calculerNombreDocumentsJudiciairesParDetention(
    idOjet1: any,
    idOjet2: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "document/calculerNombreDocumentsJudiciairesParDetention/" +
        idOjet1 +
        "/" +
        idOjet2
    );
  }

  trouverDocumentsJudiciairesParDetentionEtAffaire(
    ojetUrl: any,
    idEnfant: any,
    numOrdinalArrestation: any,
    numOrdinalAffaire: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        ojetUrl +
        "/trouverDocumentsJudiciairesParDetentionEtAffaire/" +
        idEnfant +
        "/" +
        numOrdinalArrestation +
        "/" +
        numOrdinalAffaire
    );
  }

  calculerNombreDocumentsJudiciairesParAffaire(
    idEnfant: any,
    numOrdinalArrestation: any,
    numOrdinalAffaire: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "document/calculerNombreDocumentsJudiciairesParAffaire/" +
        idEnfant +
        "/" +
        numOrdinalArrestation +
        "/" +
        numOrdinalAffaire
    );
  }
}
