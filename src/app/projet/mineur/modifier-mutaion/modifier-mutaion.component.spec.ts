import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierMutaionComponent } from './modifier-mutaion.component';

describe('ModifierMutaionComponent', () => {
  let component: ModifierMutaionComponent;
  let fixture: ComponentFixture<ModifierMutaionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierMutaionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierMutaionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
