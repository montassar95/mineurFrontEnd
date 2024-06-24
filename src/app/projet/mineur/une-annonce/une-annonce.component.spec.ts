import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UneAnnonceComponent } from './une-annonce.component';

describe('UneAnnonceComponent', () => {
  let component: UneAnnonceComponent;
  let fixture: ComponentFixture<UneAnnonceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UneAnnonceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UneAnnonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
