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
import { CarteDepotComponent } from '../carte-depot/carte-depot.component';

@Component({
  selector: 'app-doc-depot',
  templateUrl: './doc-depot.component.html',
  styleUrls: ['./doc-depot.component.css']
})
export class DocDepotComponent implements OnInit, OnDestroy {
 
  @ViewChild(EditDocumentComponent) private editDocumentComponent: EditDocumentComponent;
  @ViewChild(CarteDepotComponent) private carteDepotComponent: CarteDepotComponent;
   
  idValide:string;
  
  constructor(  private crudservice: CrudEnfantService, private breadcrumbService: BreadcrumbService,private router: Router) { 
    this.breadcrumbService.setItems([
      {label: 'الإستقبال', routerLink: ['/']},
  
      {label: 'القضايا ' , routerLink: ['/Affaire']},
      {label: 'بطاقات إيداع ' },
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
      
      this.carteDepotComponent.refresh();
    }
    else
    { console.log("aaaaaaa")
        this.editDocumentComponent.refresh(); //Or whatever name the method is called
    }
  }
  
}


 