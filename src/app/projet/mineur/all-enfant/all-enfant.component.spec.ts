import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEnfantComponent } from './all-enfant.component';

describe('AllEnfantComponent', () => {
  let component: AllEnfantComponent;
  let fixture: ComponentFixture<AllEnfantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllEnfantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEnfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
