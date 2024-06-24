import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LieuDecesComponent } from './lieu-deces.component';

describe('LieuDecesComponent', () => {
  let component: LieuDecesComponent;
  let fixture: ComponentFixture<LieuDecesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LieuDecesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LieuDecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
