import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDecesComponent } from './show-deces.component';

describe('ShowDecesComponent', () => {
  let component: ShowDecesComponent;
  let fixture: ComponentFixture<ShowDecesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDecesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
