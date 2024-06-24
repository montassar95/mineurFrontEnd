import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailleEnfantComponent } from './detaille-enfant.component';

describe('DetailleEnfantComponent', () => {
  let component: DetailleEnfantComponent;
  let fixture: ComponentFixture<DetailleEnfantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailleEnfantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailleEnfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
