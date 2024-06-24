import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem, MessageService } from 'primeng';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { EtabChangeManiere } from 'src/app/domain/etabChangeManiere';
 
import { Gouvernorat } from 'src/app/domain/gouvernorat';
import { BreadcrumbService } from 'src/app/shared/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-etab-change-maniere',
  templateUrl: './etab-change-maniere.component.html',
  styleUrls: ['./etab-change-maniere.component.css']
  ,providers: [MessageService]
})
export class EtabChangeManiereComponent implements OnInit {
  display=false;
  etablissements : EtabChangeManiere[]= [];
  gouvernorats : SelectItem[];
  gouvernoratSwich : SelectItem[];
  gouvernoratLocal: Gouvernorat;
  etablissement : EtabChangeManiere
  id;
  nom;

  
  constructor(  private crudservice: CrudEnfantService,  private service: MessageService,
    private breadcrumbService: BreadcrumbService,private router: Router) { 
    this.breadcrumbService.setItems([
      {label: 'الإستقبال', routerLink: ['/']},
  
      {label: 'رموز التغيرات' },
      {label: 'قائمة  المؤسسات' },
  ]);}
  ngOnInit(): void {
    this.showAllEtablissement();
    this.showAllGouvernorat(); 
  }
 

  showAllEtablissement() {
      
        
    this.crudservice.getlistEntity("etabChangeManiere")
    .subscribe( data => {
      if(data.result){
     
        this.etablissements= data.result;
        
     console.log(this.etablissements)
       
      }
      else{
        
        this.etablissements= [];
        
     
      }
    
    });
  
  
}

onChangGouv( event) {
  this.gouvernoratLocal=event.value;
 }


showAllGouvernorat() {
      
        
  this.crudservice.getlistEntity("gouvernorat")
  .subscribe( data => {
    if(data.result){
   
      console.log(data.result)
      this.gouvernorats= [];
      this. gouvernoratSwich= [];
      data.result.forEach((gouvernorat: Gouvernorat, value: any) => {
        this.gouvernoratSwich.push({ label: gouvernorat.libelle_gouvernorat, value: gouvernorat.libelle_gouvernorat });
    
        this.gouvernorats.push({ label: gouvernorat.libelle_gouvernorat, value: gouvernorat });
      });
     
    }
    else{
      
      this.gouvernorats= [];
      
   
    }
  
  });


}
 

addEtab(){
  
  this.etablissement= new EtabChangeManiere();
  this.etablissement.id=this.id;
  this.etablissement.libelle_etabChangeManiere=this.nom;
 
  this.etablissement.gouvernorat=this.gouvernoratLocal;

  this.crudservice.createLigne("etabChangeManiere",   this.etablissement)
  .subscribe(data => {
    if(data.result){
      console.log( data.result );
      this. showAllEtablissement();
    
     
    }
  
    
  });
  this.display=false;
}

delete(etablissement: EtabChangeManiere){
 
  this.crudservice.deleteLigne("etabChangeManiere", etablissement.id) .subscribe(data => {
    if(data.status == 417){
      this.service.add({ key: 'tst', severity: 'error', summary: '.   خطأ    ', detail: ' عليك تثبت     '  });
    }
    else{
      this.showAllEtablissement();
    }
   
  });
 

}

add(){
  this.id="";
  this.nom="";
  this.display=true;
}
update(){
  this.display=true;
}
}
