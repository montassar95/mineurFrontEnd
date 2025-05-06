import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiResponse } from "../domain/api.response";

@Injectable({
  providedIn: "root",
})
export class RapportService {
  constructor(private httpClient: HttpClient) {}

  genererFicheDeDetentionPdf(ojet: any): Observable<Blob> {
    return this.httpClient.post(
      environment.baseUrl + "rapportPdf/genererFicheDeDetentionPdf",
      ojet,
      {
        responseType: "blob",
      }
    );
  }

  genererFicheDeLiberationPdf(ojet: any): Observable<Blob> {
    return this.httpClient.post(
      environment.baseUrl + "rapportPdf/genererFicheDeLiberationPdf",
      ojet,
      {
        responseType: "blob",
      }
    );
  }

  genererRapportPdfActuel(ojet: any): Observable<Blob> {
    return this.httpClient.post(
      environment.baseUrl + "rapportPdf/genererRapportPdfActuel",
      ojet,
      {
        responseType: "blob",
      }
    );
  }
  genererRapportPdfMensuel(ojet: any): Observable<Blob> {
    return this.httpClient.post(
      environment.baseUrl + "rapportPdf/genererRapportPdfMensuel",
      ojet,
      {
        responseType: "blob",
      }
    );
  }
  genererStatistiquePdfMensuel(ojet: any): Observable<Blob> {
    return this.httpClient.post(
      environment.baseUrl + "rapportPdf/genererStatistiquePdfMensuel",
      ojet,
      {
        responseType: "blob",
      }
    );
  }

  genererRapportJsonActuel(ojet: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      environment.baseUrl + "rapportPdf/genererRapportJsonActuel",
      ojet
    );
  }
}
