import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppelParquetComponent } from './appel-parquet.component';

describe('AppelParquetComponent', () => {
  let component: AppelParquetComponent;
  let fixture: ComponentFixture<AppelParquetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppelParquetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppelParquetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
