import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPenaleComponent } from './show-penale.component';

describe('ShowPenaleComponent', () => {
  let component: ShowPenaleComponent;
  let fixture: ComponentFixture<ShowPenaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPenaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPenaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
