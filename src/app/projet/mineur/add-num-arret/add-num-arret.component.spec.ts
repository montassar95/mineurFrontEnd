import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNumArretComponent } from './add-num-arret.component';

describe('AddNumArretComponent', () => {
  let component: AddNumArretComponent;
  let fixture: ComponentFixture<AddNumArretComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNumArretComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNumArretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
