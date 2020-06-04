import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlatformLocation, DOCUMENT } from '@angular/common';
import { map } from 'rxjs/operators';
import { ConfigurationModel } from '../models/configuration.model';
import { IS_PRODUCTION } from '../tokens';
import { SubdomainTenancyNameFinder } from '../helpers/subdomain-tenancy-name-finder.helper';

@Injectable()
export class InitialConfigurationService {

  private configurationModel: ConfigurationModel;

  constructor(
    private readonly http: HttpClient,
    @Inject(IS_PRODUCTION)
    private readonly isProduction: boolean,
    @Inject(DOCUMENT)
    private readonly document: Document,
  ) { }

  get configuration() {
    return this.configurationModel;
  }

  loadInitialConfiguration(platformLocation: PlatformLocation) {
    const baseHrefFromDOM = platformLocation.getBaseHrefFromDOM();
    const appBaseUrl = this.document.location.origin + baseHrefFromDOM;
    return this.http.get<ConfigurationModel>(appBaseUrl + '/assets/' + this._getNameConfiguration()).pipe(
      map((result) => {
        const currentRootAddress = this.document.location.href;
        const tenancyName = SubdomainTenancyNameFinder.getCurrentTenancyNameOrNull(
          result.appBaseUrl,
          result.tenancyNamePlaceHolderInUrl,
          currentRootAddress
        );
        if (!tenancyName || !result.enabledTenancy) {
          const baseUrl = result.appBaseUrl.replace(`${result.tenancyNamePlaceHolderInUrl}.`, '');
          const remoteServiceBaseUrl = result.remoteServiceBaseUrl.replace(`${result.tenancyNamePlaceHolderInUrl}.`, '');
          this.configurationModel = {
            ...result,
            appBaseUrl: baseUrl,
            remoteServiceBaseUrl,
          };
          return this.configurationModel;
        } else {
          const baseUrl = result.appBaseUrl.replace(result.tenancyNamePlaceHolderInUrl, tenancyName);
          const remoteServiceBaseUrl = result.remoteServiceBaseUrl.replace(result.tenancyNamePlaceHolderInUrl, tenancyName);
          this.configurationModel = {
            ...result,
            appBaseUrl: baseUrl,
            remoteServiceBaseUrl,
            tenant: tenancyName,
          };
          return this.configurationModel;
        }
      })
    );
  }

  private _getNameConfiguration() {
    if (this.isProduction) {
      return 'app-production-configuration.json';
    } else {
      return 'app-configuration.json';
    }
  }

}
