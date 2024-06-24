import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { BreadcrumbService } from 'src/app/shared/breadcrumb/breadcrumb.service';
import { AddTransfertComponent } from '../add-transfert/add-transfert.component';
import { EditDocumentComponent } from '../edit-document/edit-document.component';

@Component({
  selector: 'app-transfert',
  templateUrl: './transfert.component.html',
  styleUrls: ['./transfert.component.css']
})
export class TransfertComponent implements OnInit {

   
  @ViewChild(EditDocumentComponent) private editDocumentComponent: EditDocumentComponent;
  @ViewChild(AddTransfertComponent) private addTransfertComponent: AddTransfertComponent;
   
  idValide:string;
  
  constructor(  private crudservice: CrudEnfantService, private breadcrumbService: BreadcrumbService,private router: Router) { 
    this.breadcrumbService.setItems([
      {label: 'الإستقبال', routerLink: ['/']},
  
      {label: 'القضايا ' , routerLink: ['/Affaire']},
      {label: ' إحالة ' },
  ]);}

  ngOnDestroy() {
		window.localStorage.removeItem("idValide");
	}
	ngOnInit() {

		let idValide = window.localStorage.getItem("idValide");
    this.idValide = idValide;
		console.log(idValide)
 
  }
   

  onTabChanged(event) 
  {
    if(event.index == 0)
    {
      this.addTransfertComponent.refresh();
    }
    else
    { console.log("aaaaaaa")
        this.editDocumentComponent.refresh(); //Or whatever name the method is called
    }
  }
  
}
