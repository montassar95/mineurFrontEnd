import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialGlobalComponent } from './social-global.component';

describe('SocialGlobalComponent', () => {
  let component: SocialGlobalComponent;
  let fixture: ComponentFixture<SocialGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
