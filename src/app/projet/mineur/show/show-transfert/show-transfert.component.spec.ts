import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTransfertComponent } from './show-transfert.component';

describe('ShowTransfertComponent', () => {
  let component: ShowTransfertComponent;
  let fixture: ComponentFixture<ShowTransfertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTransfertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
