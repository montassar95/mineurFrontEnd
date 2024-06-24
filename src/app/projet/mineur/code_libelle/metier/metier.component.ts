import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { Metier } from 'src/app/domain/metier';
import { BreadcrumbService } from 'src/app/shared/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-metier',
  templateUrl: './metier.component.html',
  styleUrls: ['./metier.component.css']
  ,providers: [MessageService]
})
export class MetierComponent implements OnInit {
  display=false;

  id;
  nom;
  metier:Metier;
  constructor(  private crudservice: CrudEnfantService,  private service: MessageService,
    private breadcrumbService: BreadcrumbService,private router: Router) { 
    this.breadcrumbService.setItems([
      {label: 'الإستقبال', routerLink: ['/']},
  
      {label: 'رموز الهوية ' },
      {label: '    المهن   ' },
  ]);}

  ngOnInit(): void {
    this.showAllMetier();
  }




  metiers : Metier[]= [];

  showAllMetier() {
      
        
    this.crudservice.getlistEntity("metier")
    .subscribe( data => {
      if(data.result){
     
        this.metiers= data.result;
        
     
       
      }
      else{
        
        this.metiers= [];
        
     
      }
    
    });
  
  
}



addGouv(){
  
  this.metier= new Metier();
  this.metier.id=this.id;
  this.metier.libelle_metier=this.nom;
 
  

  this.crudservice.createLigne("metier",   this.metier)
  .subscribe(data => {
    if(data.result){
      console.log( data.result );
      this.  showAllMetier() ;
    
     
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



delete(metier: Metier){
 
  this.crudservice.deleteLigne("metier", metier.id) .subscribe(data => {
    if(data.status == 417){
      this.service.add({ key: 'tst', severity: 'error', summary: '.   خطأ    ', detail: ' عليك تثبت     '  });
    }
    else{
      this.showAllMetier();
    }
   
  });
 

}


}
