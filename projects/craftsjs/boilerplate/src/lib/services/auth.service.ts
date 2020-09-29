import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { tap, switchMap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { LoginDto } from '../dtos/login.dto';
import { CONFIGURATION_BOILERPLATE } from '../tokens';
import { ConfigurationModel } from '../models/configuration.model';
import { LoginResultDto } from '../dtos/login-result.dto';
import { SessionService } from './session.service';
import { ImpersonateInput } from '../dtos/login-impersonate-input';
import * as _ from 'lodash';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {

  private baseUrl: string;
  private refreshTokenTimeout: any;

  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenService,
    private readonly sessionService: SessionService,
    private _utilsService: CookieService,
    @Inject(CONFIGURATION_BOILERPLATE)
    configuration: ConfigurationModel,
  ) {
    this.baseUrl = `${configuration.remoteServiceBaseUrl}/api/auth`;
  }

  authenticate(input: LoginDto) {
    return this.http.post<LoginResultDto>(`${this.baseUrl}/login`, input).pipe(
      tap(result => this.processAuthenticateResult(result)),
      switchMap(() => {
        return this.sessionService.init();
      })
    );
  }

  logout() {
    this.stopRefreshTokenTimer();
  }

  impersonatedAuthenticate(input: ImpersonateInput) {
    return this.http.post<LoginResultDto>(`${this.baseUrl}/impersonated`, input).pipe(
      tap(result => this.processAuthenticateResult(result)),
      switchMap(() => {
        this.setTenantCookie(input.tenantImpersonationId);
        return this.sessionService.init();
      })
    );
  }

  backToImpersonatedAuthenticate() {
    return this.http.get<LoginResultDto>(`${this.baseUrl}/back-to-impersonate`).pipe(
      tap(result => this.processAuthenticateResult(result)),
      switchMap(() => {
        this.setTenantCookie(undefined);
        return this.sessionService.init();
      })
    );
  }

  private processAuthenticateResult(authenticateResult: LoginResultDto) {
    if (authenticateResult.accessToken) {
      // this.startRefreshTokenTimer(authenticateResult.accessToken, authenticateResult.refreshToken);
      this.login(authenticateResult.accessToken, authenticateResult.expiresIn);
    } else {
      console.warn('Unexpected authenticateResult!');
    }
  }

  private login(accessToken: string, expiresIn?: number): void {
    this.tokenService.setToken(
      accessToken,
      expiresIn
    );
  }

  startRefreshTokenTimer(token: string, refreshToken: string) {
      // parse json object from base64 encoded jwt token
      const jwtToken = JSON.parse(atob(token.split('.')[1]));

      // set a timeout to refresh the token a minute before it expires
      const expires = new Date(jwtToken.exp * 1000);
      const timeout = expires.getTime() - Date.now() - (60 * 1000);
      this.refreshTokenTimeout = setTimeout(() => this.refreshToken(refreshToken), timeout);
  }

  private stopRefreshTokenTimer() {
      clearTimeout(this.refreshTokenTimeout);
  }

  private refreshToken(refreshToken: string) {
    console.log(refreshToken);
  }

  setTenantCookie(tenantId: string) {
    if (!_.isEmpty(tenantId)) {
      this._utilsService.set('craftsjs-tenantId', tenantId, new Date(new Date().getTime() + 5 * 365 * 86400000), '/', undefined, false, 'Lax');
    } else {
      this._utilsService.delete('craftsjs-tenantId', '/', undefined, false, 'Lax');
    }
  }

}
