import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureAppelComponent } from './procedure-appel.component';

describe('ProcedureAppelComponent', () => {
  let component: ProcedureAppelComponent;
  let fixture: ComponentFixture<ProcedureAppelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureAppelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureAppelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
