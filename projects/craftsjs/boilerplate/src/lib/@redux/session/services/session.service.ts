import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginInformationDto } from '../models/login-information-dto.model';
import { Store, select } from '@ngrx/store';
import { selectConfiguration } from '../../configuration/selectors/configuration.selector';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private baseUrl: string;

  constructor(
    store: Store,
    private readonly http: HttpClient,
  ) {
    store.pipe(
      select(selectConfiguration),
      tap(result => {
        this.baseUrl = `${result.remoteServiceBaseUrl}/api/auth/login-information`;
      })
    ).subscribe();
  }

  getLoginInformation() {
    return this.http.get<LoginInformationDto>(this.baseUrl);
  }

}
