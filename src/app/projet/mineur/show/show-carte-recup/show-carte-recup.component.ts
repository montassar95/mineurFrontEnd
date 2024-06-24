import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { CarteRecup } from 'src/app/domain/carteRecup';

@Component({
  selector: 'app-show-carte-recup',
  templateUrl: './show-carte-recup.component.html',
  styleUrls: ['./show-carte-recup.component.css']
})
export class ShowCarteRecupComponent implements OnInit ,OnChanges {
  @Input() carteRecup: CarteRecup;

 
  constructor(private crudservice: CrudEnfantService, public datepipe: DatePipe, ) { }
  ngOnChanges(changes: SimpleChanges): void {
   console.log(this.carteRecup)
 
    
  }

  ngOnInit(): void {
   
  }
 
}
