import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { Arreterlexecution } from 'src/app/domain/arreterlexecution';

@Component({
  selector: 'app-show-arreter-lexecution',
  templateUrl: './show-arreter-lexecution.component.html',
  styleUrls: ['./show-arreter-lexecution.component.css']
})
export class ShowArreterLexecutionComponent implements OnInit {
  
  @Input() 
  arreterlexecution: Arreterlexecution;

 
  constructor(private crudservice: CrudEnfantService, public datepipe: DatePipe, ) { }
  ngOnChanges(changes: SimpleChanges): void {
   
 console.log(this.arreterlexecution);
    
  }
  ngOnInit(): void {
  }

}
