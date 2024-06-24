import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEchappesComponent } from './show-echappes.component';

describe('ShowEchappesComponent', () => {
  let component: ShowEchappesComponent;
  let fixture: ComponentFixture<ShowEchappesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowEchappesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEchappesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
