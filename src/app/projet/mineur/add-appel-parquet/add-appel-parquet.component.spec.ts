import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppelParquetComponent } from './add-appel-parquet.component';

describe('AddAppelParquetComponent', () => {
  let component: AddAppelParquetComponent;
  let fixture: ComponentFixture<AddAppelParquetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAppelParquetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppelParquetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
