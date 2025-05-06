import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailleAffaireComponent } from './detaille-affaire.component';

describe('DetailleAffaireComponent', () => {
  let component: DetailleAffaireComponent;
  let fixture: ComponentFixture<DetailleAffaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailleAffaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailleAffaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
