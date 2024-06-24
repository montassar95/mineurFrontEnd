import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMutationComponent } from './show-mutation.component';

describe('ShowMutationComponent', () => {
  let component: ShowMutationComponent;
  let fixture: ComponentFixture<ShowMutationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMutationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMutationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
