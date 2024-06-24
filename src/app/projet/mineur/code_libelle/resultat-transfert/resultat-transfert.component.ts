import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { ResultatTransfert } from 'src/app/domain/resultatTransfert';
import { BreadcrumbService } from 'src/app/shared/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-resultat-transfert',
  templateUrl: './resultat-transfert.component.html',
  styleUrls: ['./resultat-transfert.component.css']
  ,providers: [MessageService]
})
export class ResultatTransfertComponent implements OnInit {

  display=false;

  id;
  nom;
  resultatTransfert:ResultatTransfert;
  constructor(  private crudservice: CrudEnfantService,  private service: MessageService,
     private breadcrumbService: BreadcrumbService,private router: Router) { 
    this.breadcrumbService.setItems([
      {label: 'الإستقبال', routerLink: ['/']},
  
      {label: 'رموز القضايا ' },
      {label: ' نتائج الإحالة    ' },
  ]);}

  ngOnInit(): void {
    this.showAllResultatTransfert();
  }




  resultatTransferts : ResultatTransfert[]= [];

  showAllResultatTransfert() {
      
        
    this.crudservice.getlistEntity("resultatTransfert")
    .subscribe( data => {
      if(data.result){
     
        this.resultatTransferts= data.result;
        
     
       
      }
      else{
        
        this.resultatTransferts= [];
        
     
      }
    
    });
  
  
}



addRes(){
  
  this.resultatTransfert= new ResultatTransfert();
  this.resultatTransfert.id=this.id;
  this.resultatTransfert.libelle_resultat=this.nom;
 
  

  this.crudservice.createLigne("resultatTransfert",   this.resultatTransfert)
  .subscribe(data => {
    if(data.result){
      console.log( data.result );
      this.showAllResultatTransfert() ;
    
     
    }
  
    
  });
  this.display=false;
}

add(){
  this.id="";
  this.nom="";
  this.display=true;
}

update(){
  this.display=true;
}


delete(resultatTransfert: ResultatTransfert){
 
  this.crudservice.deleteLigne("resultatTransfert", resultatTransfert.id) .subscribe(data => {
    if(data.status == 417){
      this.service.add({ key: 'tst', severity: 'error', summary: '.   خطأ    ', detail: ' عليك تثبت     '  });
    }
    else{
      this.showAllResultatTransfert();
    }
    
  });
 

}


}
