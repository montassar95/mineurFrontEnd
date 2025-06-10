import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitFamilyComponent } from './visit-family.component';

describe('VisitFamilyComponent', () => {
  let component: VisitFamilyComponent;
  let fixture: ComponentFixture<VisitFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
