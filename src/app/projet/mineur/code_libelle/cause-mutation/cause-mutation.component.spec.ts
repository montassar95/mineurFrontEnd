import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CauseMutationComponent } from './cause-mutation.component';

describe('CauseMutationComponent', () => {
  let component: CauseMutationComponent;
  let fixture: ComponentFixture<CauseMutationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CauseMutationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CauseMutationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
