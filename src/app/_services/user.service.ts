import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(environment.baseUrl + "all", { responseType: "text" });
  }

  getUserFromTokenFromTokenBoard(): Observable<any> {
    return this.http.get(environment.baseUrl + "user", {
      responseType: "text",
    });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(environment.baseUrl + "mod", { responseType: "text" });
  }
  getDirecteurBoard(): Observable<any> {
    return this.http.get(environment.baseUrl + "dir", { responseType: "text" });
  }
  getAdminBoard(): Observable<any> {
    return this.http.get(environment.baseUrl + "admin", {
      responseType: "text",
    });
  }
}
