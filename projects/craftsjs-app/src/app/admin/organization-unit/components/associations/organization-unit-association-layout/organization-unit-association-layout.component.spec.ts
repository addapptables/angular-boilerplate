import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationUnitAssociationLayoutComponent } from './organization-unit-association-layout.component';

describe('OrganizationUnitAssociationLayoutComponent', () => {
  let component: OrganizationUnitAssociationLayoutComponent;
  let fixture: ComponentFixture<OrganizationUnitAssociationLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationUnitAssociationLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationUnitAssociationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
