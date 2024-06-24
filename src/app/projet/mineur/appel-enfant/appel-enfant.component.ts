import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { BreadcrumbService } from 'src/app/shared/breadcrumb/breadcrumb.service';
import { AddAppelEnfantComponent } from '../add-appel-enfant/add-appel-enfant.component';
import { EditDocumentComponent } from '../edit-document/edit-document.component';

@Component({
  selector: 'app-appel-enfant',
  templateUrl: './appel-enfant.component.html',
  styleUrls: ['./appel-enfant.component.css']
})
export class AppelEnfantComponent implements OnInit {

  
  @ViewChild(EditDocumentComponent) private editDocumentComponent: EditDocumentComponent;
  @ViewChild(AddAppelEnfantComponent) private addAppelEnfantComponent: AddAppelEnfantComponent;
   
  idValide:string;
  
  constructor(  private crudservice: CrudEnfantService, private breadcrumbService: BreadcrumbService,private router: Router) { 
    this.breadcrumbService.setItems([
      {label: 'الإستقبال', routerLink: ['/']},
  
      {label: 'القضايا ' , routerLink: ['/Affaire']},
      {label: 'طعن الطفل بالاستئناف ' },
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
      this.addAppelEnfantComponent.refresh();
    }
    else
    { console.log("aaaaaaa")
        this.editDocumentComponent.refresh(); //Or whatever name the method is called
    }
  }
  
}
