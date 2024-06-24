import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevueComponent } from './revue.component';

describe('RevueComponent', () => {
  let component: RevueComponent;
  let fixture: ComponentFixture<RevueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
