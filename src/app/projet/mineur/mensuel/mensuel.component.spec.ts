import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensuelComponent } from './mensuel.component';

describe('MensuelComponent', () => {
  let component: MensuelComponent;
  let fixture: ComponentFixture<MensuelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensuelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
