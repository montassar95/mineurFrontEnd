import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchappesComponent } from './echappes.component';

describe('EchappesComponent', () => {
  let component: EchappesComponent;
  let fixture: ComponentFixture<EchappesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchappesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchappesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
