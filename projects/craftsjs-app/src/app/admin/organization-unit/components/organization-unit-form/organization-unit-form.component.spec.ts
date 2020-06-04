import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationUnitFormComponent } from './organization-unit-form.component';

describe('OrganizationUnitFormComponent', () => {
  let component: OrganizationUnitFormComponent;
  let fixture: ComponentFixture<OrganizationUnitFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationUnitFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationUnitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
