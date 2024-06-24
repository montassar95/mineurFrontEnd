import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMutationComponent } from './add-mutation.component';

describe('AddMutationComponent', () => {
  let component: AddMutationComponent;
  let fixture: ComponentFixture<AddMutationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMutationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMutationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
