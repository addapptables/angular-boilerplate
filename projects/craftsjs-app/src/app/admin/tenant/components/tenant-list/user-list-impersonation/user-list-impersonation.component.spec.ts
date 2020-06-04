import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListImpersonationComponent } from './user-list-impersonation.component';

describe('UserListImpersonationComponent', () => {
  let component: UserListImpersonationComponent;
  let fixture: ComponentFixture<UserListImpersonationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListImpersonationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListImpersonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
