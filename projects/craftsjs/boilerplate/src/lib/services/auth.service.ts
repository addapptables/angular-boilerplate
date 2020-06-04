import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { tap, switchMap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { LoginDto } from '../dtos/login.dto';
import { CONFIGURATION_BOILERPLATE } from '../tokens';
import { ConfigurationModel } from '../models/configuration.model';
import { LoginResultDto } from '../dtos/login-result.dto';
import { SessionService } from './session.service';

@Injectable()
export class AuthService {

  private baseUrl: string;

  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenService,
    private readonly sessionService: SessionService,
    @Inject(CONFIGURATION_BOILERPLATE)
    configuration: ConfigurationModel,
  ) {
    this.baseUrl = `${configuration.remoteServiceBaseUrl}/api/auth/login`;
  }

  authenticate(input: LoginDto, rememberMe?: boolean) {
    return this.http.post<LoginResultDto>(this.baseUrl, input).pipe(
      tap(result => this.processAuthenticateResult(result, rememberMe)),
      switchMap(() => {
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

}
