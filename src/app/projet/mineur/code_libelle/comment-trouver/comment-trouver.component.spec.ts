import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentTrouverComponent } from './comment-trouver.component';

describe('CommentTrouverComponent', () => {
  let component: CommentTrouverComponent;
  let fixture: ComponentFixture<CommentTrouverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentTrouverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentTrouverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
