import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAffaireComponent } from './type-affaire.component';

describe('TypeAffaireComponent', () => {
  let component: TypeAffaireComponent;
  let fixture: ComponentFixture<TypeAffaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeAffaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeAffaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
