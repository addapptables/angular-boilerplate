import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantFormModalComponent } from './tenant-form-modal.component';

describe('TenantFormModalComponent', () => {
  let component: TenantFormModalComponent;
  let fixture: ComponentFixture<TenantFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
