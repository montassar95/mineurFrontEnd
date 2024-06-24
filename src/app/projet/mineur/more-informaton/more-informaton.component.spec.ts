import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreInformatonComponent } from './more-informaton.component';

describe('MoreInformatonComponent', () => {
  let component: MoreInformatonComponent;
  let fixture: ComponentFixture<MoreInformatonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreInformatonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreInformatonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
