import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRevueComponent } from './show-revue.component';

describe('ShowRevueComponent', () => {
  let component: ShowRevueComponent;
  let fixture: ComponentFixture<ShowRevueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRevueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRevueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
