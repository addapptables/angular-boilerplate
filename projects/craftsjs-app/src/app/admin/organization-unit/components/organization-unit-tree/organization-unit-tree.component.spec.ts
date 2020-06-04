import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationUnitTreeComponent } from './organization-unit-tree.component';

describe('OrganizationUnitTreeComponent', () => {
  let component: OrganizationUnitTreeComponent;
  let fixture: ComponentFixture<OrganizationUnitTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationUnitTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationUnitTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
