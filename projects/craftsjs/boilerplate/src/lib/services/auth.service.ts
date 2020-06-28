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

  authenticate(input: LoginDto, rememberMe?: boolean) {
    return this.http.post<LoginResultDto>(`${this.baseUrl}/login`, input).pipe(
      tap(result => this.processAuthenticateResult(result, rememberMe)),
      switchMap(() => {
        return this.sessionService.init();
      })
    );
  }

  impersonatedAuthenticate(input: ImpersonateInput) {
    return this.http.post<LoginResultDto>(`${this.baseUrl}/impersonated`, input).pipe(
      tap(result => this.processAuthenticateResult(result, false)),
      switchMap(() => {
        this.setTenantCookie(input.tenantImpersonationId);
        return this.sessionService.init();
      })
    );
  }

  backToImpersonatedAuthenticate() {
    return this.http.get<LoginResultDto>(`${this.baseUrl}/back-to-impersonate`).pipe(
      tap(result => this.processAuthenticateResult(result, false)),
      switchMap(() => {
        this.setTenantCookie(undefined);
        return this.sessionService.init();
      })
    );
  }

  private processAuthenticateResult(authenticateResult: LoginResultDto, rememberMe?: boolean) {
    if (authenticateResult.accessToken) {
      this.login(authenticateResult.accessToken, rememberMe);
    } else {
      console.warn('Unexpected authenticateResult!');
    }
  }

  private login(accessToken: string, rememberMe?: boolean): void {
    const tokenExpireDate = rememberMe ? (new Date(new Date().getTime() + 1000 * 432000)) : undefined;
    this.tokenService.setToken(
      accessToken,
      tokenExpireDate
    );
  }

  setTenantCookie(tenantId: string) {
    if (!_.isEmpty(tenantId)) {
      this._utilsService.set('craftsjs-tenantId', tenantId, new Date(new Date().getTime() + 5 * 365 * 86400000));
    } else {
      this._utilsService.delete('craftsjs-tenantId');
    }
  }

}
