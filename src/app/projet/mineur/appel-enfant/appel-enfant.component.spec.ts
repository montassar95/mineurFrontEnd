import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppelEnfantComponent } from './appel-enfant.component';

describe('AppelEnfantComponent', () => {
  let component: AppelEnfantComponent;
  let fixture: ComponentFixture<AppelEnfantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppelEnfantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppelEnfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
