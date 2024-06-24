import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeTribunalComponent } from './type-tribunal.component';

describe('TypeTribunalComponent', () => {
  let component: TypeTribunalComponent;
  let fixture: ComponentFixture<TypeTribunalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeTribunalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeTribunalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
