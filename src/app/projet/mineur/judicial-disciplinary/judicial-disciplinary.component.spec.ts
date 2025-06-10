import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JudicialDisciplinaryComponent } from './judicial-disciplinary.component';

describe('JudicialDisciplinaryComponent', () => {
  let component: JudicialDisciplinaryComponent;
  let fixture: ComponentFixture<JudicialDisciplinaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JudicialDisciplinaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudicialDisciplinaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
