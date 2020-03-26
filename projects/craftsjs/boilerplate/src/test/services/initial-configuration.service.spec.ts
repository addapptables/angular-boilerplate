import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockPlatformLocation } from '@angular/common/testing';
import { InitialConfigurationService } from '../../lib/services/initial-configuration.service';
import { IS_PRODUCTION } from '../../lib/tokens';
import { DOCUMENT } from '@angular/common';
import { Store } from '@ngrx/store';

describe('InitialConfigurationService', () => {
  let service: InitialConfigurationService;
  let httpMock: HttpTestingController;
  let platformLocation: MockPlatformLocation;
  let document: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        MockPlatformLocation,
        {
          provide: IS_PRODUCTION,
          useValue: true
        },
        {
          provide: Store,
          useValue: {
            dispatch: () => true
          }
        },
        {
          provide: DOCUMENT,
          useValue: {
            location: {
              origin: 'http://localhost:4200',
              href: 'http://localhost:4200',
            }
          }
        },
        InitialConfigurationService
      ]
    });
    service = TestBed.inject(InitialConfigurationService);
    httpMock = TestBed.inject(HttpTestingController);
    platformLocation = TestBed.inject(MockPlatformLocation);
    document = TestBed.inject(DOCUMENT);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return initial configuration', (done) => {
    document.location.href = 'http://localhost:4200';
    (document.location as any).origin = 'http://localhost:4200';
    service.loadInitialConfiguration(platformLocation)
      .subscribe(result => {
        expect(result.appBaseUrl).toBe('http://localhost:4200');
        expect(result.remoteServiceBaseUrl).toBe('http://localhost:21021');
        expect(result.tenancyNamePlaceHolderInUrl).toBe('{TENANCY_NAME}');
        done();
      });
    const configurationRequest = httpMock.expectOne('http://localhost:4200/assets/app-production-configuration.json');
    configurationRequest.flush({
      remoteServiceBaseUrl: 'http://localhost:21021',
      appBaseUrl: 'http://localhost:4200',
      tenancyNamePlaceHolderInUrl: '{TENANCY_NAME}',
      enabledTenancy: true
    });

    httpMock.verify();
  });

  it('should return tenancy name in url', (done) => {
    document.location.href = 'http://example.example.com';
    (document.location as any).origin = 'http://example.example.com';
    document = { location: { origin: 'http://example.example.com', href: 'http://example.example.com' } } as any;
    service.loadInitialConfiguration(platformLocation)
      .subscribe(result => {
        expect(result.appBaseUrl).toBe('http://example.example.com');
        expect(result.remoteServiceBaseUrl).toBe('http://example.example.com');
        expect(result.tenancyNamePlaceHolderInUrl).toBe('{TENANCY_NAME}');
        done();
      });
    const configurationRequest = httpMock.expectOne('http://example.example.com/assets/app-production-configuration.json');
    configurationRequest.flush({
      remoteServiceBaseUrl: 'http://{TENANCY_NAME}.example.com',
      appBaseUrl: 'http://{TENANCY_NAME}.example.com',
      tenancyNamePlaceHolderInUrl: '{TENANCY_NAME}',
      enabledTenancy: true
    });
    httpMock.verify();
  });
});
