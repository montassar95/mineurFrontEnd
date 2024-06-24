import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { Revue } from 'src/app/domain/revue';

@Component({
  selector: 'app-show-revue',
  templateUrl: './show-revue.component.html',
  styleUrls: ['./show-revue.component.css']
})
export class ShowRevueComponent implements OnInit {
  @Input() revue: Revue;

 
  constructor(private crudservice: CrudEnfantService, public datepipe: DatePipe, ) { }
  ngOnChanges(changes: SimpleChanges): void {
   console.log(this.revue)
 
    
  }
  ngOnInit(): void {
  }
}
