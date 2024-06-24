import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { Echappes } from 'src/app/domain/echappes';
import { Enfant } from 'src/app/domain/enfant';

@Component({
  selector: 'app-show-echappes',
  templateUrl: './show-echappes.component.html',
  styleUrls: ['./show-echappes.component.css']
})
export class ShowEchappesComponent implements OnInit {
  @Input() echappes: Echappes;
  @Input() enfant:  Enfant;
 
  constructor(private crudservice: CrudEnfantService, public datepipe: DatePipe, ) { }
  ngOnChanges(changes: SimpleChanges): void {
   
 
    
  }
  ngOnInit(): void {
  }

}
