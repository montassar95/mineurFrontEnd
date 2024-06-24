import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarteRecupComponent } from './edit-carte-recup.component';

describe('EditCarteRecupComponent', () => {
  let component: EditCarteRecupComponent;
  let fixture: ComponentFixture<EditCarteRecupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCarteRecupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCarteRecupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
