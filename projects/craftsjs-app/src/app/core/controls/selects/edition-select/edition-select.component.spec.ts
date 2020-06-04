import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionSelectComponent } from './edition-select.component';

describe('EditionSelectComponent', () => {
  let component: EditionSelectComponent;
  let fixture: ComponentFixture<EditionSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditionSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
