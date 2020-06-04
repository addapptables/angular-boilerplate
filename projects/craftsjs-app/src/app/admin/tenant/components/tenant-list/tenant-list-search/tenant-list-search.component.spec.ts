import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantListSearchComponent } from './tenant-list-search.component';

describe('TenantListSearchComponent', () => {
  let component: TenantListSearchComponent;
  let fixture: ComponentFixture<TenantListSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantListSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
