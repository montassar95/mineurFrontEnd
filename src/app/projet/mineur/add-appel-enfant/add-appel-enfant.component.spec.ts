import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppelEnfantComponent } from './add-appel-enfant.component';

describe('AddAppelEnfantComponent', () => {
  let component: AddAppelEnfantComponent;
  let fixture: ComponentFixture<AddAppelEnfantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAppelEnfantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppelEnfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
