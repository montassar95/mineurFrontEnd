import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowArreterLexecutionComponent } from './show-arreter-lexecution.component';

describe('ShowArreterLexecutionComponent', () => {
  let component: ShowArreterLexecutionComponent;
  let fixture: ComponentFixture<ShowArreterLexecutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowArreterLexecutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowArreterLexecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
