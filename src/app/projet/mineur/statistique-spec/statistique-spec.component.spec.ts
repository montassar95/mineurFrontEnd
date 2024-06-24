import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiqueSpecComponent } from './statistique-spec.component';

describe('StatistiqueSpecComponent', () => {
  let component: StatistiqueSpecComponent;
  let fixture: ComponentFixture<StatistiqueSpecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatistiqueSpecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatistiqueSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
