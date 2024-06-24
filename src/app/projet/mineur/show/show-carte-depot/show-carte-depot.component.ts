import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { CarteDepot } from 'src/app/domain/carteDepot';

@Component({
  selector: 'app-show-carte-depot',
  templateUrl: './show-carte-depot.component.html',
  styleUrls: ['./show-carte-depot.component.css']
})
export class ShowCarteDepotComponent implements OnInit {
  @Input() carteDepot: CarteDepot;

 
  constructor(private crudservice: CrudEnfantService, public datepipe: DatePipe, ) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("this.carteDepot");
   console.log(this.carteDepot)
 
    
  }

  ngOnInit(): void {
   
  }

}
