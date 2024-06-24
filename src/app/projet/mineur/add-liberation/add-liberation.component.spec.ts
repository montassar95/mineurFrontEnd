import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLiberationComponent } from './add-liberation.component';

describe('AddLiberationComponent', () => {
  let component: AddLiberationComponent;
  let fixture: ComponentFixture<AddLiberationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLiberationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLiberationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
