import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../domain/api.response";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CrudEnfantService {
  constructor(private httpClient: HttpClient) {}

  createLigne(ojetUrl: any, ojet: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      environment.baseUrl + ojetUrl + "/add",
      ojet
    );
  }
  updateLigne(ojetUrl: any, ojet: any): Observable<ApiResponse> {
    return this.httpClient.put<ApiResponse>(
      environment.baseUrl + ojetUrl + "/update",
      ojet
    );
  }
  deleteLigne(ojetUrl: any, idOjet: any): Observable<ApiResponse> {
    return this.httpClient.delete<ApiResponse>(
      environment.baseUrl + ojetUrl + "/delete/" + idOjet
    );
  }
  getLigneById(ojetUrl: any, idOjet: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl + ojetUrl + "/getone/" + idOjet
    );
  }
  getlistEntity(ojetUrl: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl + ojetUrl + "/all"
    );
  }
  delete(ojetUrl: any, ojet1: any, ojet2: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      environment.baseUrl + ojetUrl + "/delete/" + ojet1,
      ojet2
    );
  }

  trouverEtablissementsActifs(ojetUrl: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl + ojetUrl + "/trouverEtablissementsActifs"
    );
  }

  calculerStatistiques(idOjet1: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl + "statistcs/calculerStatistiques/" + idOjet1
    );
  }

  statistiquesParDate(idOjet1: any, idOjet2: any): Observable<any> {
    return this.httpClient.get<any>(
      environment.baseUrl +
        "statistcs/statistiquesParDate/" +
        idOjet1 +
        "/" +
        idOjet2
    );
  }

  statistiquesMouvementsParDate(idOjet1: any, idOjet2: any): Observable<any> {
    return this.httpClient.get<any>(
      environment.baseUrl +
        "statistcs/statistiquesMouvementsParDate/" +
        idOjet1 +
        "/" +
        idOjet2
    );
  }

  trouverDelegationsParGouvernorat(
    ojetUrl: any,
    idOjet: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        ojetUrl +
        "/trouverDelegationsParGouvernorat/" +
        idOjet
    );
  }
  trouverDelegationParIdDelegationEtIdGouvernorat(
    ojetUrl: any,
    idOjet1: any,
    idOjet2: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        ojetUrl +
        "/trouverDelegationParIdDelegationEtIdGouvernorat/" +
        idOjet1 +
        "/" +
        idOjet2
    );
  }

  trouverTitresAccusationsParIdTypeAffaire(id: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "titreAccusation/trouverTitresAccusationsParIdTypeAffaire/" +
        id
    );
  }

  chercherTribunalParGouvernoratEtTypeTribunal(
    idOjet1: any,
    idOjet2: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      environment.baseUrl +
        "tribunal/chercherTribunalParGouvernoratEtTypeTribunal/" +
        idOjet1 +
        "/" +
        idOjet2
    );
  }

  askPrisonerById(id: string): Observable<string> {
    const url = `${environment.baseUrl}ai/${id}`; // GET /api/ai/{id}

    return this.httpClient.get(url, {
      responseType: "text", // important pour recevoir la rédaction texte
    });
  }
}
