import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleOrganizationUnitListComponent } from './role-organization-unit-list.component';

describe('RoleOrganizationUnitListComponent', () => {
  let component: RoleOrganizationUnitListComponent;
  let fixture: ComponentFixture<RoleOrganizationUnitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleOrganizationUnitListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleOrganizationUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
