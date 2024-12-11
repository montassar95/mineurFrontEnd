import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOppositionComponent } from './show-opposition.component';

describe('ShowOppositionComponent', () => {
  let component: ShowOppositionComponent;
  let fixture: ComponentFixture<ShowOppositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOppositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOppositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
