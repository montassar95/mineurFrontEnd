import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { BreadcrumbService } from 'src/app/shared/breadcrumb/breadcrumb.service';
import { AddArreterLexecutionComponent } from '../add-arreter-lexecution/add-arreter-lexecution.component';
import { EditDocumentComponent } from '../edit-document/edit-document.component';

@Component({
  selector: 'app-arreter-lexecution',
  templateUrl: './arreter-lexecution.component.html',
  styleUrls: ['./arreter-lexecution.component.css']
})
export class ArreterLexecutionComponent implements OnInit {

  
  @ViewChild(EditDocumentComponent) private editDocumentComponent: EditDocumentComponent;
  @ViewChild(AddArreterLexecutionComponent) private addArreterLexecutionComponent: AddArreterLexecutionComponent;
   
  idValide:string;
  
  constructor(  private crudservice: CrudEnfantService, private breadcrumbService: BreadcrumbService,private router: Router) { 
    this.breadcrumbService.setItems([
      {label: 'الإستقبال', routerLink: ['/']},
  
      {label: 'القضايا ' , routerLink: ['/Affaire']},
      {label: ' إيقاف تنفيذ  ' },
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
      this.addArreterLexecutionComponent.refresh();
    }
    else
    { console.log("aaaaaaa")
        this.editDocumentComponent.refresh(); //Or whatever name the method is called
    }
  }
  
}
