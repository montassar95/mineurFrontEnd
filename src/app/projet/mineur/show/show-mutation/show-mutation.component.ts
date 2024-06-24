import { DatePipe } from '@angular/common';
import { Input, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
 
import { Enfant } from 'src/app/domain/enfant';
import { Residence } from 'src/app/domain/residence';

@Component({
  selector: 'app-show-mutation',
  templateUrl: './show-mutation.component.html',
  styleUrls: ['./show-mutation.component.css']
})
export class ShowMutationComponent implements OnInit {

  @Input() residence:  Residence;
  @Input() enfant:  Enfant;
 
  constructor(private crudservice: CrudEnfantService, public datepipe: DatePipe, ) { }
  ngOnChanges(changes: SimpleChanges): void {
 
 
    
  }
  ngOnInit(): void {
  }


}
