import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { AppelParquet } from 'src/app/domain/appelParquet';

@Component({
  selector: 'app-show-appel-parquet',
  templateUrl: './show-appel-parquet.component.html',
  styleUrls: ['./show-appel-parquet.component.css']
})
export class ShowAppelParquetComponent implements OnInit {
  @Input() appelParquet: AppelParquet;

 
  constructor(private crudservice: CrudEnfantService, public datepipe: DatePipe, ) { }
  ngOnChanges(changes: SimpleChanges): void {
   console.log(this.appelParquet)
 
    
  }
  ngOnInit(): void {
  }
}
