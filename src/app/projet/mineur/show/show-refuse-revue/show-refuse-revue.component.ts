import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { RefuseRevue } from 'src/app/domain/refuseRevue';

@Component({
  selector: 'app-show-refuse-revue',
  templateUrl: './show-refuse-revue.component.html',
  styleUrls: ['./show-refuse-revue.component.css']
})
export class ShowRefuseRevueComponent implements OnInit {

  @Input() refuseRevue: RefuseRevue;

 
  constructor(private crudservice: CrudEnfantService, public datepipe: DatePipe, ) { }
  ngOnChanges(changes: SimpleChanges): void {
   console.log(this.refuseRevue)
 
    
  }
  ngOnInit(): void {
  }

}
