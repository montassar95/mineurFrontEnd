import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCarteDepotComponent } from './show-carte-depot.component';

describe('ShowCarteDepotComponent', () => {
  let component: ShowCarteDepotComponent;
  let fixture: ComponentFixture<ShowCarteDepotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCarteDepotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCarteDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
