import { Component, OnInit } from '@angular/core';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { BreadcrumbService } from 'src/app/shared/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-doc-hebergement',
  templateUrl: './doc-hebergement.component.html',
  styleUrls: ['./doc-hebergement.component.css']
})
export class DocHebergementComponent implements OnInit {

  idValide:number;
    
  documents:Document[]=[];
  constructor(  private crudservice: CrudEnfantService, private breadcrumbService: BreadcrumbService) { 
    this.breadcrumbService.setItems([
      {label: 'الإستقبال', routerLink: ['/']},
      { label: 'القضايا ', routerLink: ['/mineur/Affaire'] },
      { label: '   بطاقات إيواء' },
      
  ]);}

  ngOnDestroy() {
		window.localStorage.removeItem("idValide");
	}
	ngOnInit() {

		let idValide = window.localStorage.getItem("idValide");
		console.log(idValide)
		if (idValide) {
this.idValide=+idValide;
			this.onTabChanged(event );
		}
  }
  
  onTabChanged(event ){
    if(event.index == 1){
      this.crudservice.findByIdEnfantAndStatut0("arrestation", this.idValide)
    .subscribe(data => {
      if (data.result == null) {
         

        
      } else { 
        this.crudservice.findDocumentByArrestation(this.idValide,data.result.arrestationId.numOrdinale)
        .subscribe(data => {
          if (data.result == null) {
           
        
          } else {
           
            this.documents = data.result;
  
          }
  
        });
      }



    });
    
    }
  }

}
