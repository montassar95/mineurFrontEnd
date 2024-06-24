import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CauseLiberationComponent } from './cause-liberation.component';

describe('CauseLiberationComponent', () => {
  let component: CauseLiberationComponent;
  let fixture: ComponentFixture<CauseLiberationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CauseLiberationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CauseLiberationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
