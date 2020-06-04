import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionLayoutComponent } from './edition-layout.component';

describe('EditionLayoutComponent', () => {
  let component: EditionLayoutComponent;
  let fixture: ComponentFixture<EditionLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditionLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
