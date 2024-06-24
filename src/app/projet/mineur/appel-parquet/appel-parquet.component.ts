import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { BreadcrumbService } from 'src/app/shared/breadcrumb/breadcrumb.service';
import { AddAppelParquetComponent } from '../add-appel-parquet/add-appel-parquet.component';
import { EditDocumentComponent } from '../edit-document/edit-document.component';

@Component({
  selector: 'app-appel-parquet',
  templateUrl: './appel-parquet.component.html',
  styleUrls: ['./appel-parquet.component.css']
})
export class AppelParquetComponent implements OnInit {
  @ViewChild(EditDocumentComponent) private editDocumentComponent: EditDocumentComponent;
  @ViewChild(AddAppelParquetComponent) private addAppelParquetComponent: AddAppelParquetComponent;
  
   
  idValide:string;
  
  constructor(  private crudservice: CrudEnfantService, private breadcrumbService: BreadcrumbService,private router: Router) { 
    this.breadcrumbService.setItems([
      {label: 'الإستقبال', routerLink: ['/']},
  
      {label: 'القضايا ' , routerLink: ['/Affaire']},
      {label: 'طعن النيابة بالاستئناف ' },
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
      this.addAppelParquetComponent.refresh();
    }
    else
    { console.log("aaaaaaa")
        this.editDocumentComponent.refresh(); //Or whatever name the method is called
    }
  }
  

}
