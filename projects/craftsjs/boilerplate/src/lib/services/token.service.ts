import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenService {

  readonly tokenCookieName = 'XSRF-TOKEN-ADMIN-CRAFTSJS';

  constructor(
    private cookieService: CookieService,
  ) { }

  getToken(): string {
    return this.cookieService.get(this.tokenCookieName);
  }

  getTokenCookieName(): string {
    return this.tokenCookieName;
  }

  clearToken(): void {
    this.cookieService.delete(this.tokenCookieName);
  }

  setToken(authToken: string, expireDate?: Date): void {
    this.cookieService.set(this.tokenCookieName, authToken, expireDate);
  }

}
