import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCartePropagationComponent } from './show-carte-propagation.component';

describe('ShowCartePropagationComponent', () => {
  let component: ShowCartePropagationComponent;
  let fixture: ComponentFixture<ShowCartePropagationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCartePropagationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCartePropagationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
