import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials): Observable<any> {
    return this.http.post(
      environment.baseUrl + "auth/signin",
      {
        username: credentials.username,
        password: credentials.password,
      },
      httpOptions
    );
  }

  register(user): Observable<any> {
    return this.http.post(
      environment.baseUrl + "auth/signup",
      {
        username: user.username,
        personelle: user.personelle,
        role: user.role,
        password: user.password,
        nom: user.nom,
        prenom: user.prenom,
        numAdministratif: user.numAdministratif,
        etablissement: user.etablissement,
      },
      httpOptions
    );
  }

  updateUser(user, id): Observable<any> {
    return this.http.post(
      environment.baseUrl + "auth/update/" + id,
      {
        username: user.username,

        role: user.role,
        password: user.password,
        nom: user.nom,
        prenom: user.prenom,
        numAdministratif: user.numAdministratif,
        etablissement: user.etablissement,
      },
      httpOptions
    );
  }
}
