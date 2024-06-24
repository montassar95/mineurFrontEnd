import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitreAccusationComponent } from './titre-accusation.component';

describe('TitreAccusationComponent', () => {
  let component: TitreAccusationComponent;
  let fixture: ComponentFixture<TitreAccusationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitreAccusationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitreAccusationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
