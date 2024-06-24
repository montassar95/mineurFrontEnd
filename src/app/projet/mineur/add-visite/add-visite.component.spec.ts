import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVisiteComponent } from './add-visite.component';

describe('AddVisiteComponent', () => {
  let component: AddVisiteComponent;
  let fixture: ComponentFixture<AddVisiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVisiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
