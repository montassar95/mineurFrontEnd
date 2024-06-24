import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCarteHebergementComponent } from './show-carte-hebergement.component';

describe('ShowCarteHebergementComponent', () => {
  let component: ShowCarteHebergementComponent;
  let fixture: ComponentFixture<ShowCarteHebergementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCarteHebergementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCarteHebergementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
