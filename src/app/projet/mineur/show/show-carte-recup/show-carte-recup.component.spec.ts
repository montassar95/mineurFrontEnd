import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCarteRecupComponent } from './show-carte-recup.component';

describe('ShowCarteRecupComponent', () => {
  let component: ShowCarteRecupComponent;
  let fixture: ComponentFixture<ShowCarteRecupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCarteRecupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCarteRecupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
