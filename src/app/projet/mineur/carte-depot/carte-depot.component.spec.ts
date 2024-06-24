import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteDepotComponent } from './carte-depot.component';

describe('CarteDepotComponent', () => {
  let component: CarteDepotComponent;
  let fixture: ComponentFixture<CarteDepotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarteDepotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
