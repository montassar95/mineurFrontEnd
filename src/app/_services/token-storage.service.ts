import { Injectable } from "@angular/core";

const TOKEN_KEY = "auth-token";
const USER_KEY = "auth-user";

@Injectable({
  providedIn: "root",
})
export class TokenStorageService {
  constructor() {}

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUserFromToken(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  // Nouvelle méthode pour extraire le payload du token
  private parseJwt(token: string | null): any {
    if (!token) return null;
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Erreur lors du parsing JWT", e);
      return null;
    }
  }

  // Récupérer les rôles depuis le token JWT
  public getUserFromTokenRoles(): string[] {
    const token = this.getToken();
    const payload = this.parseJwt(token);
    return payload && payload.roles ? payload.roles : [];
  }

  // ✅ Récupérer toutes les infos utilisateur depuis le token JWT
  public getUserFromTokenFromToken(): any {
    const token = this.getToken();
    const payload = this.parseJwt(token);

    if (!payload) return null;

    return {
      id: payload.id,
        username: payload.sub,
      roles: payload.roles || [],
      nom: payload.nom,
      prenom: payload.prenom,
      etablissement: payload.etablissement,
    };
  }
}
