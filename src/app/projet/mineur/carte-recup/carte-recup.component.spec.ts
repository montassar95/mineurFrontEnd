import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteRecupComponent } from './carte-recup.component';

describe('CarteRecupComponent', () => {
  let component: CarteRecupComponent;
  let fixture: ComponentFixture<CarteRecupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarteRecupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteRecupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
