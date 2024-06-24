import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentEchapperComponent } from './comment-echapper.component';

describe('CommentEchapperComponent', () => {
  let component: CommentEchapperComponent;
  let fixture: ComponentFixture<CommentEchapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentEchapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentEchapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
