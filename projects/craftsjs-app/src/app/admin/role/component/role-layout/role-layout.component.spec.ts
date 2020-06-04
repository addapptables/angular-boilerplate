import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleLayoutComponent } from './role-layout.component';

describe('RoleLayoutComponent', () => {
  let component: RoleLayoutComponent;
  let fixture: ComponentFixture<RoleLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
