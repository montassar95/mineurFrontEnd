import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatiqueComponent } from './statique.component';

describe('StatiqueComponent', () => {
  let component: StatiqueComponent;
  let fixture: ComponentFixture<StatiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
