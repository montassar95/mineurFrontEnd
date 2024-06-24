import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPropagationComponent } from './add-propagation.component';

describe('AddPropagationComponent', () => {
  let component: AddPropagationComponent;
  let fixture: ComponentFixture<AddPropagationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPropagationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPropagationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
