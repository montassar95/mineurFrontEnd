import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../_services/token-storage.service';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end
// const TOKEN_HEADER_KEY = 'x-access-token';   // for Node.js Express back-end
import { Router } from "@angular/router";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    // debut code ajouter pour audit
    const currentUrl = this.router.url;
    const isPublicPage =
      currentUrl.includes("/login") || currentUrl.includes("/logoutpage");

    if (!token && !isPublicPage) {
      this.router.navigate(["/logoutpage"]);
      return throwError(() => new Error("No token found"));
    }
    // fin code ajouter pour audit
    if (token != null) {
      // for Spring Boot back-end
      authReq = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, "Bearer " + token),
      });

      // for Node.js Express back-end
      // authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
function throwError(arg0: () => Error): Observable<HttpEvent<any>> {
  throw new Error('Function not implemented.');
}

