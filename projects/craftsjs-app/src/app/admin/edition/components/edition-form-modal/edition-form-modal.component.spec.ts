import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionFormModalComponent } from './edition-form-modal.component';

describe('EditionFormModalComponent', () => {
  let component: EditionFormModalComponent;
  let fixture: ComponentFixture<EditionFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditionFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
