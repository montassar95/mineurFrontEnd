import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { Transfert } from 'src/app/domain/transfert';

@Component({
  selector: 'app-show-transfert',
  templateUrl: './show-transfert.component.html',
  styleUrls: ['./show-transfert.component.css']
})
export class ShowTransfertComponent implements OnInit {
  @Input() transfert: Transfert;

 
  constructor(private crudservice: CrudEnfantService, public datepipe: DatePipe, ) { }
  ngOnChanges(changes: SimpleChanges): void {
   console.log(this.transfert)
 
    
  }
  ngOnInit(): void {
  }

}
