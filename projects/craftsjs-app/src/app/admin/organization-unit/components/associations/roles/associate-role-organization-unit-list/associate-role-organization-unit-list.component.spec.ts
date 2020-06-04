import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateRoleOrganizationUnitListComponent } from './associate-role-organization-unit-list.component';

describe('AssociateRoleOrganizationUnitListComponent', () => {
  let component: AssociateRoleOrganizationUnitListComponent;
  let fixture: ComponentFixture<AssociateRoleOrganizationUnitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateRoleOrganizationUnitListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateRoleOrganizationUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
