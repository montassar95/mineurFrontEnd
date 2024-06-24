import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAppelEnfantComponent } from './show-appel-enfant.component';

describe('ShowAppelEnfantComponent', () => {
  let component: ShowAppelEnfantComponent;
  let fixture: ComponentFixture<ShowAppelEnfantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAppelEnfantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAppelEnfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
