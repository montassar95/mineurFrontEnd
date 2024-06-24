import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecesComponent } from './deces.component';

describe('DecesComponent', () => {
  let component: DecesComponent;
  let fixture: ComponentFixture<DecesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
