import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
 
import { ChangementLieu } from 'src/app/domain/changementLieu';

@Component({
  selector: 'app-show-changement-lieu',
  templateUrl: './show-changement-lieu.component.html',
  styleUrls: ['./show-changement-lieu.component.css']
})
export class ShowChangementLieuComponent implements OnInit {

   
  @Input() 
  changementLieu: ChangementLieu;

 
  constructor(private crudservice: CrudEnfantService, public datepipe: DatePipe, ) { }
  ngOnChanges(changes: SimpleChanges): void {
   
 console.log(this.changementLieu);
    
  }
  ngOnInit(): void {
  }


}
