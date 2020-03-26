import { TestBed } from '@angular/core/testing';
import { InitialConfigurationService } from '../lib/services/initial-configuration.service';
import { timer } from 'rxjs';
import { appInitializerFactory } from '../lib/app-initializer-factory';
import { InjectionToken, Injector } from '@angular/core';
import { map } from 'rxjs/operators';
import { ConfigurationModel } from '../lib/@redux/configuration/models/configuration.model';


describe('AppInitializerFactory', () => {

  let initializerFactory;
  let initialConfigurationService: InitialConfigurationService;

  beforeEach(() => {
    const fakeToken = new InjectionToken<any>('AppInitializerFactory');
    TestBed.configureTestingModule({
      providers: [
        {
          provide: InitialConfigurationService,
          useValue: {
            loadInitialConfiguration: () => {
              return timer(30);
            }
          }
        },
        {
          provide: fakeToken,
          useFactory: appInitializerFactory,
          deps: [Injector],
        }
      ]
    });
    initializerFactory = TestBed.inject(fakeToken);
    initialConfigurationService = TestBed.inject(InitialConfigurationService);
  });

  it('should be created', () => {
    expect(initializerFactory).toBeTruthy();
  });

  it('should load initial configuration', async () => {
    const spy = spyOn(initialConfigurationService, 'loadInitialConfiguration')
      .and.returnValue(timer(30).pipe(map(() => {
        return {} as ConfigurationModel;
      })));
    const result = await initializerFactory();
    expect(result).toBe(true);
    expect(spy).toHaveBeenCalled();
  });

  it('should return an error', async () => {
    const spy = spyOn(initialConfigurationService, 'loadInitialConfiguration')
      .and.returnValue(timer(30).pipe(map(() => {
        throw new Error(`Can't load initial configuration`);
      })));
    try {
      await initializerFactory();
    } catch (error) {
      expect(error.message).toBe(`Can't load initial configuration`);
      expect(spy).toHaveBeenCalled();
    }
  });

});
