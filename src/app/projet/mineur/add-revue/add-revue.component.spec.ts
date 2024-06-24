import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRevueComponent } from './add-revue.component';

describe('AddRevueComponent', () => {
  let component: AddRevueComponent;
  let fixture: ComponentFixture<AddRevueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRevueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRevueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
