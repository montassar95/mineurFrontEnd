import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatTransfertComponent } from './resultat-transfert.component';

describe('ResultatTransfertComponent', () => {
  let component: ResultatTransfertComponent;
  let fixture: ComponentFixture<ResultatTransfertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultatTransfertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultatTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
