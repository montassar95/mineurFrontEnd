import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangementComponent } from './changement.component';

describe('ChangementComponent', () => {
  let component: ChangementComponent;
  let fixture: ComponentFixture<ChangementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
