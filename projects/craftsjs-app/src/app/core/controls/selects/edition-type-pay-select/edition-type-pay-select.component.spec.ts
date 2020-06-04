import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionTypePaySelectComponent } from './edition-type-pay-select.component';

describe('EditionTypePaySelectComponent', () => {
  let component: EditionTypePaySelectComponent;
  let fixture: ComponentFixture<EditionTypePaySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditionTypePaySelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionTypePaySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
