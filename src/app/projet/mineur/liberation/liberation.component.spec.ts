import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiberationComponent } from './liberation.component';

describe('LiberationComponent', () => {
  let component: LiberationComponent;
  let fixture: ComponentFixture<LiberationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiberationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiberationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
