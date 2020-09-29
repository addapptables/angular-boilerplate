import { Injector } from '@angular/core';
import { InitialConfigurationService } from './services/initial-configuration.service';
import { finalize, catchError, switchMap } from 'rxjs/operators';
import { PlatformLocation } from '@angular/common';
import { SessionService } from './services/session.service';

export function appInitializerFactory(injector: Injector) {
  return () => {
    return new Promise<boolean>((resolve, reject) => {
      const initialConfigurationService = injector.get<InitialConfigurationService>(InitialConfigurationService);
      const platformLocation: PlatformLocation = injector.get<PlatformLocation>(PlatformLocation);
      initialConfigurationService.loadInitialConfiguration(platformLocation).pipe(
        switchMap(() => {
          const appSessionService: SessionService = injector.get(SessionService);
          return appSessionService.init();
        }),
        finalize(() => resolve(true)),
        catchError((err) => {
          reject(err);
          throw new Error('Can\'t load initial configuration');
        })
      ).subscribe();
    });
  };
}
