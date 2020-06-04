import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationUnitFormModalComponent } from './organization-unit-form-modal.component';

describe('OrganizationUnitFormModalComponent', () => {
  let component: OrganizationUnitFormModalComponent;
  let fixture: ComponentFixture<OrganizationUnitFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationUnitFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationUnitFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
