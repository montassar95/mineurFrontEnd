import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChangementLieuComponent } from './add-changement-lieu.component';

describe('AddChangementLieuComponent', () => {
  let component: AddChangementLieuComponent;
  let fixture: ComponentFixture<AddChangementLieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChangementLieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChangementLieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
