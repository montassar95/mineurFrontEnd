import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArreterLexecutionComponent } from './arreter-lexecution.component';

describe('ArreterLexecutionComponent', () => {
  let component: ArreterLexecutionComponent;
  let fixture: ComponentFixture<ArreterLexecutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArreterLexecutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArreterLexecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
