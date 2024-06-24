import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeJugeComponent } from './type-juge.component';

describe('TypeJugeComponent', () => {
  let component: TypeJugeComponent;
  let fixture: ComponentFixture<TypeJugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeJugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeJugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
