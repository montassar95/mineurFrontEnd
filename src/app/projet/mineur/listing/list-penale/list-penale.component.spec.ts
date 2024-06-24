import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPenaleComponent } from './list-penale.component';

describe('ListPenaleComponent', () => {
  let component: ListPenaleComponent;
  let fixture: ComponentFixture<ListPenaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPenaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPenaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
