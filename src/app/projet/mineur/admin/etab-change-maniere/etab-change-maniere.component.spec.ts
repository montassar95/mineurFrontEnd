import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtabChangeManiereComponent } from './etab-change-maniere.component';

describe('EtabChangeManiereComponent', () => {
  let component: EtabChangeManiereComponent;
  let fixture: ComponentFixture<EtabChangeManiereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtabChangeManiereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtabChangeManiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
