import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowChangementLieuComponent } from './show-changement-lieu.component';

describe('ShowChangementLieuComponent', () => {
  let component: ShowChangementLieuComponent;
  let fixture: ComponentFixture<ShowChangementLieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowChangementLieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowChangementLieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
