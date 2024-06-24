import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { AppelEnfant } from 'src/app/domain/appelEnfant';

@Component({
  selector: 'app-show-appel-enfant',
  templateUrl: './show-appel-enfant.component.html',
  styleUrls: ['./show-appel-enfant.component.css']
})
export class ShowAppelEnfantComponent implements OnInit {
  @Input() appelEnfant: AppelEnfant;

 
  constructor(private crudservice: CrudEnfantService, public datepipe: DatePipe, ) { }
  ngOnChanges(changes: SimpleChanges): void {
   console.log(this.appelEnfant)
 
    
  }
  ngOnInit(): void {
  }
}
