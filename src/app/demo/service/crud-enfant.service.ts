import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../domain/api.response";

@Injectable({
  providedIn: "root",
})
export class CrudEnfantService {
  baseUrl = "http://192.168.160.61:8080/api/";
  //baseUrl = "http://192.168.100.39:8085/mineur/api/";

  EXbaseUrl =
    "http://192.168.100.122:8080/api/cgpr/visit/ParloirBoxSiege/IdentiteAmenByAliasParloir/10P2";

  constructor(private httpClient: HttpClient) {}

  getPhotoById(idOjet1: any, idOjet2: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl + "photos/getone/" + idOjet1 + "/" + idOjet2
    );
  }

  getEx(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.EXbaseUrl);
  }

  createLigne(ojetUrl: any, ojet: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      this.baseUrl + ojetUrl + "/add",
      ojet
    );
  }
  addEnfant(idEta, ojet: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      this.baseUrl + "enfant/addEnfant/" + idEta,
      ojet
    );
  }

  addEnfantDTO(ojet: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      this.baseUrl + "enfant/addEnfantDTO",
      ojet
    );
  }

  updateEnfantDTO(ojet: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      this.baseUrl + "enfant/updateEnfantDTO",
      ojet
    );
  }

  deleteLiberation(ojet: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      this.baseUrl + "arrestation/deleteLiberation/",
      ojet
    );
  }

  delete(ojetUrl: any, ojet1: any, ojet2: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      this.baseUrl + ojetUrl + "/delete/" + ojet1,
      ojet2
    );
  }
  findByCarteRecup(ojet: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      this.baseUrl + "accusationCarteRecup/findByCarteRecup",
      ojet
    );
  }

  findDocumentById(ojet: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      this.baseUrl + "document/findDocumentById",
      ojet
    );
  }

  findTitreAccusationbyCarteDepot(ojet: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      this.baseUrl + "accusationCarteDepot/findTitreAccusationbyCarteDepot",
      ojet
    );
  }

  findTitreAccusationbyCarteHeber(ojet: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      this.baseUrl + "accusationCarteHeber/findTitreAccusationbyCarteHeber",
      ojet
    );
  }

  findArretProvisoireByCarteRecup(ojet: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      this.baseUrl + "arretProvisoire/findArretProvisoireByCarteRecup",
      ojet
    );
  }

  accepterResidence(ojet: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      this.baseUrl + "residence/accepterResidence",
      ojet
    );
  }

  deleteResidenceStatut2(ojet: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      this.baseUrl + "residence/deleteResidenceStatut2",
      ojet
    );
  }
  deleteResidenceStatut0(ojet: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      this.baseUrl + "residence/deleteResidenceStatut0",
      ojet
    );
  }

  verifierNumOrdinalAffaire(
    ojetUrl: any,
    ojet: any,
    numOrdinaleArrestationActuelle: any
  ): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      this.baseUrl +
        ojetUrl +
        "/verifierNumOrdinalAffaire/" +
        numOrdinaleArrestationActuelle,
      ojet
    );
  }

  getlistEntity(ojetUrl: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrl + ojetUrl + "/all");
  }
  getAllCentre(ojetUrl: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl + ojetUrl + "/allCentre"
    );
  }
  exportPdf(ojet: any): Observable<Blob> {
    return this.httpClient.post(this.baseUrl + "enfant/export/pdf", ojet, {
      responseType: "blob",
    });
  }

  exportEtatPdf(ojet: any): Observable<Blob> {
    return this.httpClient.post(this.baseUrl + "enfant/exportEtat/pdf", ojet, {
      responseType: "blob",
    });
  }
  exportAllEtat(ojet: any): Observable<Blob> {
    return this.httpClient.post(
      this.baseUrl + "enfant/exportAllEtat/pdf",
      ojet,
      {
        responseType: "blob",
      }
    );
  }
  deleteLigne(ojetUrl: any, idOjet: any): Observable<ApiResponse> {
    return this.httpClient.delete<ApiResponse>(
      this.baseUrl + ojetUrl + "/delete/" + idOjet
    );
  }
  getLigneById(ojetUrl: any, idOjet: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl + ojetUrl + "/getone/" + idOjet
    );
  }

  getoneInResidence(idOjet: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl + "enfant/getoneInResidence/" + idOjet
    );
  }
  getResidenceByNum(idOjet: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl + "enfant/getResidenceByNum/" + idOjet
    );
  }
  chercherEnfantAvecVerification(idOjet: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl + "enfant/chercherEnfantAvecVerification/" + idOjet
    );
  }
  updateLigne(ojetUrl: any, ojet: any): Observable<ApiResponse> {
    return this.httpClient.put<ApiResponse>(
      this.baseUrl + ojetUrl + "/update",
      ojet
    );
  }

  findByIdEnfantAndStatutArrestation0(
    ojetUrl: any,
    idOjet: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl + ojetUrl + "/findByIdEnfantAndStatutArrestation0/" + idOjet
    );
  }

  findByIdEnfantAndStatut0(ojetUrl: any, idOjet: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl + ojetUrl + "/findByIdEnfantAndStatut0/" + idOjet
    );
  }

  findResidenceByIdEnfantAndStatut0(
    ojetUrl: any,
    idOjet1: any,
    idOjet2: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        ojetUrl +
        "/findByIdEnfantAndStatut0/" +
        idOjet1 +
        "/" +
        idOjet2
    );
  }

  findByIdEnfantAndMaxResidence(
    ojetUrl: any,
    idOjet1: any,
    idOjet2: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        ojetUrl +
        "/findByIdEnfantAndMaxResidence/" +
        idOjet1 +
        "/" +
        idOjet2
    );
  }

  getStatistcs(idOjet1: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl + "statistcs/getStatistcs/" + idOjet1
    );
  }

  findByIdEnfantAndResidenceTrouverNull(
    ojetUrl: any,
    idOjet: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        ojetUrl +
        "/findByIdEnfantAndResidenceTrouverNull/" +
        idOjet
    );
  }
  findByIdEnfantAndStatutEnCour(
    ojetUrl: any,
    idOjet1: any,
    idOjet2: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        ojetUrl +
        "/findByIdEnfantAndStatutEnCour/" +
        idOjet1 +
        "/" +
        idOjet2
    );
  }

  findByEnfantAndArrestation(
    ojetUrl: any,
    idOjet1: any,
    idOjet2: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        ojetUrl +
        "/findByEnfantAndArrestation/" +
        idOjet1 +
        "/" +
        idOjet2
    );
  }
  findByIdEnfant(ojetUrl: any, idOjet: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl + ojetUrl + "/findByIdEnfant/" + idOjet
    );
  }

  getDelegationByGouv(ojetUrl: any, idOjet: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl + ojetUrl + "/getDelegationByGouv/" + idOjet
    );
  }
  findByGouvernorat(
    ojetUrl: any,
    idOjet1: any,
    idOjet2: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl + ojetUrl + "/findByGouvernorat/" + idOjet1 + "/" + idOjet2
    );
  }

  countByEnfant(ojetUrl: any, idOjet: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl + ojetUrl + "/countByEnfant/" + idOjet
    );
  }

  countByEnfantAndArrestation(
    ojetUrl: any,
    idOjet1: any,
    idOjet2: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        ojetUrl +
        "/countByEnfantAndArrestation/" +
        idOjet1 +
        "/" +
        idOjet2
    );
  }
  countTotaleEchappes(
    ojetUrl: any,
    idOjet1: any,
    idOjet2: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl + ojetUrl + "/countTotaleEchappes/" + idOjet1 + "/" + idOjet2
    );
  }
  countTotaleRecidence(
    ojetUrl: any,
    idOjet1: any,
    idOjet2: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        ojetUrl +
        "/countTotaleRecidence/" +
        idOjet1 +
        "/" +
        idOjet2
    );
  }

  countTotaleRecidenceWithetabChangeManiere(
    ojetUrl: any,
    idOjet1: any,
    idOjet2: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        ojetUrl +
        "/countTotaleRecidenceWithetabChangeManiere/" +
        idOjet1 +
        "/" +
        idOjet2
    );
  }

  getDocumentByArrestation(
    idOjet1: any,
    idOjet2: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        "document/getDocumentByArrestation/" +
        idOjet1 +
        "/" +
        idOjet2
    );
  }
  calcule(idOjet1: any, idOjet2: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl + "accusationCarteRecup/calcule/" + idOjet1 + "/" + idOjet2
    );
  }
  search(ojet: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      this.baseUrl + "enfant/search",
      ojet
    );
  }

  getLigneByAffaireId(
    ojetUrl: any,
    idEnfant: any,
    numAffaire: any,
    idTribunal: any,
    numOrdinaleArrestation: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        ojetUrl +
        "/getAffaireById/" +
        idEnfant +
        "/" +
        numAffaire +
        "/" +
        idTribunal +
        "/" +
        numOrdinaleArrestation
    );
  }

  getLiberationById(
    ojetUrl: any,
    idEnfant: any,
    numOrdinale: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        ojetUrl +
        "/getLiberationById/" +
        idEnfant +
        "/" +
        numOrdinale
    );
  }
  findAffaireByAnyArrestation(
    ojetUrl: any,
    idEnfant: any,
    numAffaire: any,
    idTribunal: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        ojetUrl +
        "/findAffaireByAnyArrestation/" +
        idEnfant +
        "/" +
        numAffaire +
        "/" +
        idTribunal
    );
  }
  getArrestationById(
    ojetUrl: any,
    idEnfant: any,
    numOrdinale: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        ojetUrl +
        "/getArrestationById/" +
        idEnfant +
        "/" +
        numOrdinale
    );
  }

  findByArrestation(
    ojetUrl: any,
    idEnfant: any,
    numOrdinale: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        ojetUrl +
        "/findByArrestation/" +
        idEnfant +
        "/" +
        numOrdinale
    );
  }

  calculerAffaire(
    ojetUrl: any,
    idEnfant: any,
    numOrdinale: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        ojetUrl +
        "/calculerAffaire/" +
        idEnfant +
        "/" +
        numOrdinale
    );
  }

  findByArrestationToTransfert(
    ojetUrl: any,
    idEnfant: any,
    numOrdinale: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        ojetUrl +
        "/findByArrestationToTransfert/" +
        idEnfant +
        "/" +
        numOrdinale
    );
  }

  findByArrestationToArret(
    ojetUrl: any,
    idEnfant: any,
    numOrdinale: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        ojetUrl +
        "/findByArrestationToArret/" +
        idEnfant +
        "/" +
        numOrdinale
    );
  }

  findByArrestationByCJorCR(
    ojetUrl: any,
    idEnfant: any,
    numOrdinale: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        ojetUrl +
        "/findByArrestationByCJorCR/" +
        idEnfant +
        "/" +
        numOrdinale
    );
  }

  findByArrestationToPropaga(
    ojetUrl: any,
    idEnfant: any,
    numOrdinale: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        ojetUrl +
        "/findByArrestationToPropaga/" +
        idEnfant +
        "/" +
        numOrdinale
    );
  }
  findByNumOrdinalAffaire(
    ojetUrl: any,
    idEnfant: any,
    numOrdinale: any,
    numOrdinalAffaire: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        ojetUrl +
        "/findByNumOrdinalAffaire/" +
        idEnfant +
        "/" +
        numOrdinale +
        "/" +
        numOrdinalAffaire
    );
  }

  findAffaireByAffaireLien(
    ojetUrl: any,
    idEnfant: any,
    numAffaire: any,
    idTribunal: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        ojetUrl +
        "/findAffaireByAffaireLien/" +
        idEnfant +
        "/" +
        numAffaire +
        "/" +
        idTribunal
    );
  }
  findEtatJuridique(idEnfant: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl + "document/findEtatJuridique/" + idEnfant
    );
  }

  getDocumentByAffaire(
    ojetUrl: any,
    idEnfant: any,
    numOrdinalArrestation: any,
    numOrdinalAffaire: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        ojetUrl +
        "/getDocumentByAffaire/" +
        idEnfant +
        "/" +
        numOrdinalArrestation +
        "/" +
        numOrdinalAffaire
    );
  }

  getTitreAccusation(
    ojetUrl: any,
    idEnfant: any,
    numOrdinalArrestation: any,
    numOrdinalAffaire: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        ojetUrl +
        "/getTitreAccusation/" +
        idEnfant +
        "/" +
        numOrdinalArrestation +
        "/" +
        numOrdinalAffaire
    );
  }
  getDateDebutPunition(
    ojetUrl: any,
    idEnfant: any,
    numOrdinalArrestation: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        ojetUrl +
        "/getDateDebutPunition/" +
        idEnfant +
        "/" +
        numOrdinalArrestation
    );
  }
  getDateFinPunition(
    ojetUrl: any,
    idEnfant: any,
    numOrdinalArrestation: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        ojetUrl +
        "/getDateFinPunition/" +
        idEnfant +
        "/" +
        numOrdinalArrestation
    );
  }
  countDocumentByAffaire(
    idEnfant: any,
    numOrdinalArrestation: any,
    numOrdinalAffaire: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        "document/countDocumentByAffaire/" +
        idEnfant +
        "/" +
        numOrdinalArrestation +
        "/" +
        numOrdinalAffaire
    );
  }

  findByArrestationAndStatut0(
    idEnfant: any,
    numOrdinaleArrestation: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        "residence/findByArrestationAndStatut0/" +
        idEnfant +
        "/" +
        numOrdinaleArrestation
    );
  }
  getArretProvisoirebyArrestation(
    idEnfant: any,
    numOrdinaleArrestation: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        "arretProvisoire/getArretProvisoirebyArrestation/" +
        idEnfant +
        "/" +
        numOrdinaleArrestation
    );
  }

  findTitreAccusationByIdTypeAffaire(id: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl + "titreAccusation/findTitreAccusationByIdTypeAffaire/" + id
    );
  }

  findEchappesByIdEnfantAndNumOrdinaleArrestation(
    idEnfant: any,
    numOrdinaleArrestation: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        "echappes/findEchappesByIdEnfantAndNumOrdinaleArrestation/" +
        idEnfant +
        "/" +
        numOrdinaleArrestation
    );
  }

  findDocumentByArrestation(
    idEnfant: any,
    numOrdinaleArrestation: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        "document/findDocumentByArrestation/" +
        idEnfant +
        "/" +
        numOrdinaleArrestation
    );
  }
  searchTribunal(idOjet1: any, idOjet2: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl + "tribunal/searchTribunal/" + idOjet1 + "/" + idOjet2
    );
  }

  getEnfants(object: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      this.baseUrl + "enfant/searchEnfant",
      object
    );
  }

  getVisite(
    id: any,
    anneeVisite: any,
    moisVisite: any
  ): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      this.baseUrl +
        "visite/getVisite/" +
        id +
        "/" +
        anneeVisite +
        "/" +
        moisVisite
    );
  }
}
