import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { CarteHeber } from 'src/app/domain/carteHebergement';

@Component({
  selector: 'app-show-carte-hebergement',
  templateUrl: './show-carte-hebergement.component.html',
  styleUrls: ['./show-carte-hebergement.component.css']
})
export class ShowCarteHebergementComponent implements OnInit {

  @Input() carteHeber: CarteHeber;

 
  constructor(private crudservice: CrudEnfantService, public datepipe: DatePipe, ) { }
  ngOnChanges(changes: SimpleChanges): void {
   console.log(this.carteHeber)
 
    
  }

  ngOnInit(): void {
  }

}
