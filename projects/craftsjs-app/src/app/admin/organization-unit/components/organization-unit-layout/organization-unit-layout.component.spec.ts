import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationUnitLayoutComponent } from './organization-unit-layout.component';

describe('OrganizationUnitLayoutComponent', () => {
  let component: OrganizationUnitLayoutComponent;
  let fixture: ComponentFixture<OrganizationUnitLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationUnitLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationUnitLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
