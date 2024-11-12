import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEnfantComponent } from './details-enfant.component';

describe('DetailsEnfantComponent', () => {
  let component: DetailsEnfantComponent;
  let fixture: ComponentFixture<DetailsEnfantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsEnfantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsEnfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
