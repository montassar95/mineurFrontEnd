import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAppelParquetComponent } from './show-appel-parquet.component';

describe('ShowAppelParquetComponent', () => {
  let component: ShowAppelParquetComponent;
  let fixture: ComponentFixture<ShowAppelParquetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAppelParquetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAppelParquetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
