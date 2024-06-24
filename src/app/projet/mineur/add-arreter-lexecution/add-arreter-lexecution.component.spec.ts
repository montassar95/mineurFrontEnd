import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArreterLexecutionComponent } from './add-arreter-lexecution.component';

describe('AddArreterLexecutionComponent', () => {
  let component: AddArreterLexecutionComponent;
  let fixture: ComponentFixture<AddArreterLexecutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddArreterLexecutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArreterLexecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
