import { OnDestroy, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { Affaire } from 'src/app/domain/affaire';
import { AppelEnfant } from 'src/app/domain/appelEnfant';
import { AppelParquet } from 'src/app/domain/appelParquet';
import { CarteDepot } from 'src/app/domain/carteDepot';
import { CarteRecup } from 'src/app/domain/carteRecup';
import { Revue } from 'src/app/domain/revue';
import { Document } from 'src/app/domain/document';
import { Transfert } from 'src/app/domain/transfert';
import { BreadcrumbService } from 'src/app/shared/breadcrumb/breadcrumb.service';
import { Arreterlexecution } from 'src/app/domain/arreterlexecution';
import { DocumentId } from 'src/app/domain/documentId';
import { Arrestation } from 'src/app/domain/arrestation';
import { EditDocumentComponent } from '../edit-document/edit-document.component';
import { CarteRecupComponent } from '../carte-recup/carte-recup.component';

@Component({
  selector: 'app-doc-recup',
  templateUrl: './doc-recup.component.html',
  styleUrls: ['./doc-recup.component.scss']
})
export class DocRecupComponent implements  OnInit, OnDestroy {
 
  @ViewChild(EditDocumentComponent) private editDocumentComponent: EditDocumentComponent;
  @ViewChild(CarteRecupComponent) private carteRecupComponent: CarteRecupComponent;
   
  idValide:string;
  
  constructor(  private crudservice: CrudEnfantService, private breadcrumbService: BreadcrumbService,private router: Router) { 
    this.breadcrumbService.setItems([
      {label: 'الإستقبال', routerLink: ['/']},
  
      {label: 'القضايا ' , routerLink: ['/Affaire']},
      {label: 'مضمون حكم' },
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
      
      this.carteRecupComponent.refresh();
    }
    else
    { console.log("aaaaaaa")
        this.editDocumentComponent.refresh(); //Or whatever name the method is called
    }
  }
  
}


 