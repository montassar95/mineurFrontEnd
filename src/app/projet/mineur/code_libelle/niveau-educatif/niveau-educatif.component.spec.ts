import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NiveauEducatifComponent } from './niveau-educatif.component';

describe('NiveauEducatifComponent', () => {
  let component: NiveauEducatifComponent;
  let fixture: ComponentFixture<NiveauEducatifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NiveauEducatifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NiveauEducatifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
