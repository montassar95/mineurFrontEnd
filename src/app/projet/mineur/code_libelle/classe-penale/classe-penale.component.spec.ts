import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassePenaleComponent } from './classe-penale.component';

describe('ClassePenaleComponent', () => {
  let component: ClassePenaleComponent;
  let fixture: ComponentFixture<ClassePenaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassePenaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassePenaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
