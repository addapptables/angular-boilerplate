import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleOrganizationUnitFormComponent } from './role-organization-unit-form.component';

describe('RoleOrganizationUnitFormComponent', () => {
  let component: RoleOrganizationUnitFormComponent;
  let fixture: ComponentFixture<RoleOrganizationUnitFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleOrganizationUnitFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleOrganizationUnitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
