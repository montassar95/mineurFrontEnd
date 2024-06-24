import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteHebergementComponent } from './carte-hebergement.component';

describe('CarteHebergementComponent', () => {
  let component: CarteHebergementComponent;
  let fixture: ComponentFixture<CarteHebergementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarteHebergementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteHebergementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
