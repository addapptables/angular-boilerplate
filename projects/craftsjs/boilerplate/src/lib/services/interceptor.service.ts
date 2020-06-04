import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponseService } from './http-error-response.service';

@Injectable()
export class CraftsjsHttpInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private cookieService: CookieService,
    private httpErrorResponseService: HttpErrorResponseService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const modifiedRequest = this.normalizeRequestHeaders(request);
    return next.handle(modifiedRequest).pipe(
      catchError((error) => {
        this.handleErrorResponse(error);
        throw error;
      })
    );
  }

  private normalizeRequestHeaders(request: HttpRequest<any>): HttpRequest<any> {
    let modifiedHeaders = new HttpHeaders();
    modifiedHeaders = request.headers.set('Localization.CultureName', 'es');
    modifiedHeaders = this.addAuthorizationHeaders(modifiedHeaders);
    modifiedHeaders = this.addTenantIdHeader(modifiedHeaders);
    return request.clone({
      headers: modifiedHeaders
    });
  }

  private addAuthorizationHeaders(headers: HttpHeaders): HttpHeaders {
    if (!headers.has('Authorization')) {
      const token = this.tokenService.getToken();
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return headers;
  }

  private addTenantIdHeader(headers: HttpHeaders): HttpHeaders {
    const tenantHeader = 'craftsjs-tenantId';
    const cookieTenantIdValue = this.cookieService.get(tenantHeader);
    if (cookieTenantIdValue && !headers.has(tenantHeader)) {
      headers = headers.set(tenantHeader, cookieTenantIdValue);
    }
    return headers;
  }

  protected handleErrorResponse(response: any) {
    if (response.error != null) {
      this.httpErrorResponseService.showError(response.error);
    } else {
      const errorResponse = new HttpResponse({
        headers: response.headers,
        status: response.status,
        body: response.error
      });
      this.httpErrorResponseService.handleNonErrorResponse(errorResponse);
    }
  }

}
