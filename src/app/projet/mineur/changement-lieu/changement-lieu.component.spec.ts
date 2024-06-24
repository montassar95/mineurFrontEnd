import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangementLieuComponent } from './changement-lieu.component';

describe('ChangementLieuComponent', () => {
  let component: ChangementLieuComponent;
  let fixture: ComponentFixture<ChangementLieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangementLieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangementLieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
