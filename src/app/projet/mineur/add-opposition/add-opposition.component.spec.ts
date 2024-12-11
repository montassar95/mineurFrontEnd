import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOppositionComponent } from './add-opposition.component';

describe('AddOppositionComponent', () => {
  let component: AddOppositionComponent;
  let fixture: ComponentFixture<AddOppositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOppositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOppositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
