import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLiberationComponent } from './show-liberation.component';

describe('ShowLiberationComponent', () => {
  let component: ShowLiberationComponent;
  let fixture: ComponentFixture<ShowLiberationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowLiberationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowLiberationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
