import { Injector } from '@angular/core';
import { InitialConfigurationService } from './services/initial-configuration.service';
import { finalize, catchError } from 'rxjs/operators';
import { PlatformLocation } from '@angular/common';

export function appInitializerFactory(injector: Injector) {
  return () => {
    return new Promise<boolean>((resolve, reject) => {
      const initialConfigurationService = injector.get<InitialConfigurationService>(InitialConfigurationService);
      const platformLocation: PlatformLocation = injector.get<PlatformLocation>(PlatformLocation);
      initialConfigurationService.loadInitialConfiguration(platformLocation).pipe(
        finalize(() => resolve(true)),
        catchError((err) => {
          reject(err);
          throw new Error(`Can't load initial configuration`);
        })
      ).subscribe();
    });
  };
}
