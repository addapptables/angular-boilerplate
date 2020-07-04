import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationUnitToolbarComponent } from './organization-unit-toolbar.component';

describe('OrganizationUnitToolbarComponent', () => {
  let component: OrganizationUnitToolbarComponent;
  let fixture: ComponentFixture<OrganizationUnitToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationUnitToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationUnitToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
