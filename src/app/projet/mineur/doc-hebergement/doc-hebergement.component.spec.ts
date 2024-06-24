import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocHebergementComponent } from './doc-hebergement.component';

describe('DocHebergementComponent', () => {
  let component: DocHebergementComponent;
  let fixture: ComponentFixture<DocHebergementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocHebergementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocHebergementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
