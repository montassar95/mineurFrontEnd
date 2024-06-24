import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotifArreterlexecutionComponent } from './motif-arreterlexecution.component';

describe('MotifArreterlexecutionComponent', () => {
  let component: MotifArreterlexecutionComponent;
  let fixture: ComponentFixture<MotifArreterlexecutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotifArreterlexecutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotifArreterlexecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
