import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JugeComponent } from './juge.component';

describe('JugeComponent', () => {
  let component: JugeComponent;
  let fixture: ComponentFixture<JugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
