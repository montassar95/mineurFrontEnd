import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechEnfantComponent } from './rech-enfant.component';

describe('RechEnfantComponent', () => {
  let component: RechEnfantComponent;
  let fixture: ComponentFixture<RechEnfantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechEnfantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechEnfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
