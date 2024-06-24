import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRefuseRevueComponent } from './show-refuse-revue.component';

describe('ShowRefuseRevueComponent', () => {
  let component: ShowRefuseRevueComponent;
  let fixture: ComponentFixture<ShowRefuseRevueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRefuseRevueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRefuseRevueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
