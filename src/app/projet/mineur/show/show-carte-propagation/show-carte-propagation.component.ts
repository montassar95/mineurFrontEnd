import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { CartePropagation } from 'src/app/domain/cartePropagation';

@Component({
  selector: 'app-show-carte-propagation',
  templateUrl: './show-carte-propagation.component.html',
  styleUrls: ['./show-carte-propagation.component.css']
})
export class ShowCartePropagationComponent implements OnInit {

  @Input() cartePropagation: CartePropagation;

 
  constructor(private crudservice: CrudEnfantService, public datepipe: DatePipe, ) { }
  ngOnChanges(changes: SimpleChanges): void {
   console.log(this.cartePropagation)
 
    
  }
  ngOnInit(): void {
  }

}
