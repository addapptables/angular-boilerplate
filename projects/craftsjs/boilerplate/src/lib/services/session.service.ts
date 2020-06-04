import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginInformationDto } from '../dtos/session/login-information-dto.model';
import { tap } from 'rxjs/operators';
import { CONFIGURATION_BOILERPLATE } from '../tokens';
import { ConfigurationModel } from '../models/configuration.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDto } from '../dtos/session/user-dto.model';
import { TenantDto } from '../dtos/session/tenant-dto.model';
import { TokenService } from './token.service';

@Injectable()
export class SessionService {

  private baseUrl: string;
  private _user = new BehaviorSubject<UserDto>({} as UserDto);
  private _tenant = new BehaviorSubject<TenantDto>({} as TenantDto);
  private _loginInformation = new BehaviorSubject<LoginInformationDto>({} as LoginInformationDto);

  constructor(
    private readonly http: HttpClient,
    @Inject(CONFIGURATION_BOILERPLATE)
    configuration: ConfigurationModel,
    private readonly tokenService: TokenService,
  ) {
    this.baseUrl = `${configuration.remoteServiceBaseUrl}/api/auth/login-information`;
  }

  get loginInformation(): LoginInformationDto {
    return this._loginInformation.getValue();
  }

  get loginInformationObservable(): Observable<LoginInformationDto> {
    return this._loginInformation.asObservable();
  }

  get user(): UserDto {
    return this._user.getValue();
  }

  get userObservable(): Observable<UserDto> {
    return this._user.asObservable();
  }

  get userId(): string {
    return this.user ? this.user.id : null;
  }

  get tenant(): TenantDto {
    return this._tenant.getValue();
  }

  get tenantObservable(): Observable<TenantDto> {
    return this._tenant.asObservable();
  }

  get tenantId(): string {
    return this.tenant ? this.tenant.id : null;
  }

  logout() {
    this.tokenService.clearToken();
    this._user.next(undefined);
  }

  init() {
    return this.getLoginInformation().pipe(
      tap((result) => {
        this._loginInformation.next(result);
        this._user.next(result.user);
        this._tenant.next(result.tenant);
      })
    );
  }

  private getLoginInformation() {
    return this.http.get<LoginInformationDto>(this.baseUrl);
  }

}
