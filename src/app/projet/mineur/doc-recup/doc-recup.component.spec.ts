import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocRecupComponent } from './doc-recup.component';

describe('DocRecupComponent', () => {
  let component: DocRecupComponent;
  let fixture: ComponentFixture<DocRecupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocRecupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocRecupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
