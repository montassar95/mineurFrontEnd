import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocDepotComponent } from './doc-depot.component';

describe('DocDepotComponent', () => {
  let component: DocDepotComponent;
  let fixture: ComponentFixture<DocDepotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocDepotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
