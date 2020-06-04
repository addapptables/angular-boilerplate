import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleOrganizationUnitFormModalComponent } from './role-organization-unit-form-modal.component';

describe('RoleOrganizationUnitFormModalComponent', () => {
  let component: RoleOrganizationUnitFormModalComponent;
  let fixture: ComponentFixture<RoleOrganizationUnitFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleOrganizationUnitFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleOrganizationUnitFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
