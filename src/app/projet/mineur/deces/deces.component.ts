import { Component, OnInit } from '@angular/core';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { Residence } from 'src/app/domain/residence';
import { BreadcrumbService } from 'src/app/shared/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-deces',
  templateUrl: './deces.component.html',
  styleUrls: ['./deces.component.css']
})
export class DecesComponent implements OnInit {
 
 

  idValide:number;
    
  residencs:Residence[]=[];
  documents:Document[]=[];
 

  constructor(  private breadcrumbService: BreadcrumbService,private crudservice: CrudEnfantService,) { 
     this.breadcrumbService.setItems([
      {label: 'الإستقبال', routerLink: ['/']},
      {label: 'التغيرات الطارئة  ', routerLink: ['/mineur/Changement'] },
      {label: 'الوفاة' },
       
  ]);}
 
  
  
  

  ngOnDestroy() {
		window.localStorage.removeItem("idValide");
	}
	ngOnInit() {

		let idValide = window.localStorage.getItem("idValide");
		console.log(idValide)
		if (idValide) {
        this.idValide=+idValide;
		 
		}
  }
  
}