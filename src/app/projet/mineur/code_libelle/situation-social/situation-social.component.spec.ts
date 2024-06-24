import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SituationSocialComponent } from './situation-social.component';

describe('SituationSocialComponent', () => {
  let component: SituationSocialComponent;
  let fixture: ComponentFixture<SituationSocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SituationSocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SituationSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
