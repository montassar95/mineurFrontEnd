import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { Enfant } from 'src/app/domain/enfant';
import { Liberation } from 'src/app/domain/liberation';
import { Residence } from 'src/app/domain/residence';

@Component({
  selector: 'app-show-liberation',
  templateUrl: './show-liberation.component.html',
  styleUrls: ['./show-liberation.component.css']
})
export class ShowLiberationComponent implements OnInit {
  @Input() liberation:  Liberation;
  @Input() enfant:  Enfant;
 
  constructor(private crudservice: CrudEnfantService, public datepipe: DatePipe, ) { }
  ngOnChanges(changes: SimpleChanges): void {
 
 
    
  }
  ngOnInit(): void {
  }


}
