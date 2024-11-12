import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextDocumentComponent } from './next-document.component';

describe('NextDocumentComponent', () => {
  let component: NextDocumentComponent;
  let fixture: ComponentFixture<NextDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
