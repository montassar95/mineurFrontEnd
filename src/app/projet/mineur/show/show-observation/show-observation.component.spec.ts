import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowObservationComponent } from './show-observation.component';

describe('ShowObservationComponent', () => {
  let component: ShowObservationComponent;
  let fixture: ComponentFixture<ShowObservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowObservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowObservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
