import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDecesComponent } from './add-deces.component';

describe('AddDecesComponent', () => {
  let component: AddDecesComponent;
  let fixture: ComponentFixture<AddDecesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDecesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
